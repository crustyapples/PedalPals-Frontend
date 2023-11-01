import React from "react";
import { View, Text, Image, Button, FlatList, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useAuthToken } from '../contexts/AuthContext';
import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

console.log('BASE_URL', BASE_URL);
// const BASE_URL = 'http://localhost:3000';

const usersData = [
  { id: 1, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 2, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 3, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 4, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 5, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 6, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 7, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 8, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 9, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 10, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 11, username: "thelegend27", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  { id: 12, username: "gorizide", distance: 2, avatar: require("@/src/assets/images/favicon.png") },
  // Add more users if needed
];

const NearbyPage: React.FC = () => {
    const [distance, setDistance] = useState(5);
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const getToken = useAuthToken();
    const [token, setToken] = useState('');


    

    const findNearbyCyclist = async () => {

      try{
        let response;
        
        const queryParams  = {
          "radius": distance,
        };
    
        // const queryString = new URLSearchParams(queryParams).toString();

        // console.log(queryString)

        // response = await axios.get(BASE_URL + '/find-nearby-cyclists?${queryString}', {
        //   headers: { Authorization: 'Bearer ${token}', 'Content-Type': 'application/json' },
        // });

        response = await axios.get(BASE_URL + `/find-nearby-cyclists`,  { params: queryParams,
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          const users = response.data.nearby_users;
          setNearbyUsers(users); }

        else {
            console.error('Request error:', response.data);
            Alert.alert('Request error', 'Failed to retrieve nearby cyclists.');

        }

      } catch (error){

        console.error('Authentication error', error);
        Alert.alert('Authentication error', 'Something went wrong');

      }
    };

    useEffect(() => {

      findNearbyCyclist();

      const intervalId = setInterval(() => {
        findNearbyCyclist();
      }, 1000); // 1 seconds
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [distance]);


    useEffect(() => {
      const fetchToken = async () => {
        const token = await getToken();
        console.log('Token:', token);
        setToken(token);
        // Now you can use the token for API calls or other purposes
      };
  
      fetchToken();
    }, []);



  
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
            // add other Slider props as needed
          />
        </View>
  
        {/* <View className="px-4 mr-2">
          {Array.from({ length: Math.ceil(usersData.length / 2) }).map((_, index) => (
            <View key={index} className="flex-row justify-between mb-4">
              <UserItem user={usersData[index * 2]} />
              {usersData[index * 2 + 1] && <UserItem user={usersData[index * 2 + 1]} />}
            </View>
          ))}
        </View> */}
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
  
