import React from "react";
import { View, Text, Image, Button, FlatList, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useState } from "react";

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
  
        <View className="px-4 mr-2">
          {Array.from({ length: Math.ceil(usersData.length / 2) }).map((_, index) => (
            <View key={index} className="flex-row justify-between mb-4">
              <UserItem user={usersData[index * 2]} />
              {usersData[index * 2 + 1] && <UserItem user={usersData[index * 2 + 1]} />}
            </View>
          ))}
        </View>
      </View>
    );
  };
  
  export default NearbyPage;
  
