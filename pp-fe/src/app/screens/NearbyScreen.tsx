import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useAuthToken } from '../contexts/AuthContext';
import axios, {AxiosRequestConfig} from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const NearbyPage: React.FC = () => {
  const [distance, setDistance] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const getToken = useAuthToken();
  const [token, setToken] = useState('');

  

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
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log('Token:', token);
      setToken(token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   findNearbyCyclist();
    // }, 1000); // 1 second

    // return () => clearInterval(intervalId);

    findNearbyCyclist();
  }, [distance]);



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
