import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useAuthDetails, useAuthToken } from '../contexts/AuthContext';
import * as Location from 'expo-location';
import axios, {AxiosRequestConfig} from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

// async functoin to request for location using the location service from expo location
async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission not granted', 'Allow the app to use location service.');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
}

const NearbyPage: React.FC = () => {
  const [distance, setDistance] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const { getToken,getUserId, getEmail} = useAuthDetails();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const findNearbyCyclist = async () => {
    try {
      const response = await fetch(BASE_URL + '/find-nearby-cyclists', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "radius": Math.round(distance) })
      });
  
      if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log(data);

      if (data.message == "User has not shared location") {
        // get location and call findnearbycyclist again
        console.log("User has not shared location");
        const location = await getUserLocation();
        console.log("User location:", location);
        if(location){
          // make an UPDATE call to /user/user_id to update location
          const requestData = {
            location: {
              coordinates: `${location.coords.latitude},${location.coords.longitude}`,
              gps_persmission: "Granted"
            }
          }
          const response = await axios.put(BASE_URL + `/users/${userId}`, requestData, {
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          })
        }
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  useEffect(() => {
    const fetchDetails = async () => {
      const token = await getToken();
      const user_id = await getUserId();
      const email = await getEmail();

      console.log('Token:', token);
      console.log('User ID:', user_id);
      console.log('Email:', email);

      setToken(token);
      setUserId(user_id);
      setEmail(email);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   findNearbyCyclist();
    // }, 1000); // 1 second

    // return () => clearInterval(intervalId);
    if (token) {
      findNearbyCyclist();
    }
    
  }, [Math.round(distance)]);



  return (
    <View className="bg-gray-100">
      <View className="p-4">
        <TextInput placeholder="Search" className="my-4 p-2 border rounded text-gray-500" />

        <Text className="mb-2">{`Distance: ${distance} km`}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          value={distance}
          onValueChange={(value) => setDistance(value)}
        />
      </View>

      <View className="px-4 mr-2">
        {Array.from({ length: Math.ceil(nearbyUsers.length / 2) }).map((_, index) => (
          <View key={index} className="flex-row justify-between mb-4">
            <UserItem user={nearbyUsers[index * 2]} />
            {nearbyUsers[index * 2 + 1] && <UserItem user={nearbyUsers[index * 2 + 1]} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default NearbyPage;
