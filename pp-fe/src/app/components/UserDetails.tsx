import { StyleSheet } from "react-native";
import React, { useState } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Leaderboard from "../components/LeaderBoard";
import WeeklyChallengeRoute from "../components/WeeklyChallengeRoute";
import DropdownEditDetails from "./DropdownEditDetails";
import { FontAwesome } from "@expo/vector-icons";

const colors = ["orange", "red", "blue", "green"];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function stringToIndex(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
  }
  return sum % 4;
}


type UserDetailsProps = {
  profilePic?: any;
  name?: string;
  username: string;
  numOfPals: number;
  teleHandle: string;
  instaHandle: string;
  numOfReward1: number;
  numOfReward2: number;
  numOfReward3: number;
  token?: string;
  userId?: string;
  friendView?: boolean;
};

const UserDetails: React.FC<UserDetailsProps> = ({
  profilePic,
  name,
  username,
  numOfPals,
  teleHandle,
  instaHandle,
  numOfReward1,
  numOfReward2,
  numOfReward3,
  token,
  userId,
  friendView
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const AddFriendButton = () => {
    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log("Button pressed!");
    };

    return (
      <Pressable className="p-1" onPress={onPressFunction}>
        <View className="flex-row p-2 rounded-lg bg-[#2dd4bf] justify-center items-center">
          <FontAwesome name="user-plus" size={25} color="black" />
          <Text className="ml-2 justify-center">Follow</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-6 my-4 mx-2">
      <View className="flex-row justify-center mb-4">
        <View className="mb-3">
          {profilePic ? (
            <Image
              source={profilePic}
              className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <View className={`w-20 h-20 rounded-full bg-${colors[stringToIndex(username)]}-300`} />
          )}
        </View>
      </View>



      <Text className="font-Poppins_Bold text-4xl text-black text-center mb-2">
        {name}
      </Text>
      <Text className="font-Poppins_Bold text-2xl text-black text-center mb-2">
        @{username}
      </Text>

      <View className="flex-row justify-center items-center mb-4">
        <FontAwesome name="user-plus" size={20} color="#4B5563" />
        <Text className="ml-2 font-semibold text-lg">{numOfPals} Pals</Text>
      </View>

      <View className="flex-row justify-around mb-4">
        <View className="items-center">
          <FontAwesome name="telegram" size={25} color="#1DA1F2" />
          <Text className="font-Poppins_Regular">{teleHandle}</Text>
        </View>

        <View className="items-center">
          <FontAwesome name="instagram" size={25} color="#E1306C" />
          <Text className="font-Poppins_Regular">{instaHandle}</Text>
        </View>
      </View>

      {!friendView ? (      <TouchableOpacity onPress={toggleDropdown} className="mb-4">
        <View className="flex-row justify-center items-center bg-[#2dd4bf] rounded-md p-2">
          <FontAwesome name="edit" size={20} color="white" />
          <Text className="ml-2 text-white">Edit Details</Text>
        </View>
      </TouchableOpacity>): null}



      {/* DropdownEditDetails visibility is controlled by isDropdownVisible */}
      {isDropdownVisible && (
        <DropdownEditDetails
          visibleState={{
            visible: isDropdownVisible,
            setVisible: setIsDropdownVisible,
          }}
          token={token}
          userId={userId}
        />
      )}

      <View className="flex-row justify-around mt-4">
        <View className="items-center">
          <FontAwesome name="certificate" size={30} color="#B89130" />
          <Text className="font-semibold text-lg">{numOfReward1}</Text>
        </View>

        <View className="items-center">
          <FontAwesome name="star" size={30} color="#163760" />
          <Text className="font-semibold text-lg">{numOfReward2}</Text>
        </View>

        <View className="items-center">
          <FontAwesome name="fire" size={30} color="#F0870F" />
          <Text className="font-semibold text-lg">{numOfReward3}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;
