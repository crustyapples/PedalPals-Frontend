import { View, Text, Image, Button, Pressable } from "react-native";
import { useAuthDetails } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useDistanceUnit } from "../contexts/DistanceUnitContext";

type UserItemProps = {
  id: number;
  username: string;
  distance?: number;
  avatar?: any;
  isFriend?: boolean;
  token?: any;
  userId?: any;
  updateFriend?: any;
};

type User = {
  _id: string;
  name: string;
  email: string;
  telegram: string;
  instagram: string;
  friends_list: any;
  posts: any;
  analytics: any;
  gamification: any;
};


const colors = ['#b4cce9', '#b4e9bc', '#d9f892', '#f1b0c6'];


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const UserItem: React.FC<UserItemProps> = ({
  id,
  username,
  distance,
  avatar,
  isFriend,
  token,
  userId,
  updateFriend,
}) => {
  const [added, setAdded] = useState(isFriend);
  const { distanceUnit, toggleDistanceUnit } = useDistanceUnit();
  console.log("User specified unit", distanceUnit);

  const convertToMiles = (distanceInKm) => {
    // Conversion factor: 1 kilometer = 0.621371 miles
    return (distanceInKm * 0.621371).toFixed(2);
  };

  let displayDistance = "0 km";
  displayDistance = distance ? `${distance} km` : displayDistance;
  displayDistance = distanceUnit === "miles" ? `${convertToMiles(distance)} mi` : displayDistance;

  const addRemoveFriend = async (friendId, toAdd) => {
    let url = `${BASE_URL}/add-friend/${friendId}`;
    if (!toAdd) {
      url = `${BASE_URL}/remove-friend/${friendId}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friend_id: id }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);

      if (toAdd) {
        setAdded(true);
        updateFriend(friendId);
      } else {
        setAdded(false);
        updateFriend(friendId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View className="flex-col items-center p-4 bg-white shadow-md rounded-lg m-3">
      <View className="mb-3">
        {avatar ? (
          <Image
            source={avatar}
            className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-sm"
          />
        ) : (
          <View className={`w-20 h-20 rounded-full bg-[${colors[randomInteger(0,3)]}]`} />
        )}
      </View>
      <Text className="font-semibold text-lg mb-1">{username}</Text>

      <Text className="text-sm text-gray-600 mb-3">{displayDistance}</Text>

      {added ? (
        <View className="bg-gray-500 w-full rounded-md shadow">
          <Button
            title="Remove"
            color="white"
            onPress={() => addRemoveFriend(id, false)}
          />
        </View>
      ) : (
        <View className="bg-blue-500 w-full rounded-md shadow">
          <Button
            title="Add"
            color="white"
            onPress={() => addRemoveFriend(id, true)}
          />
        </View>
      )}
      <Pressable className="mt-2">
        <Link
          href={{
            pathname: "/screens/FriendScreen",
            params: {
              userId: id,
              token: token,
            },
          }}
        >
          <FontAwesome name="info-circle" size={25} color="black" />
        </Link>
      </Pressable>
    </View>
  );
};

export default UserItem;
