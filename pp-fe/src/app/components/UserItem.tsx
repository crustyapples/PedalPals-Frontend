import { View, Text, Image, Button } from "react-native";
import { useAuthDetails } from "../contexts/AuthContext";
import { useState } from "react";

type UserItemProps = {
  id: number;
  username: string;
  distance?: any;
  avatar?: any;
  isFriend?: boolean;
  token?: any;
  userId?: any;
  updateFriend?: any;
};

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const UserItem: React.FC<UserItemProps> = ({
  id,
  username,
  distance,
  avatar,
  isFriend,
  token,
  userId,
  updateFriend
}) => {
  const [added, setAdded] = useState(isFriend);

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
        updateFriend(friendId,username)
      } else {
        setAdded(false);
        updateFriend(friendId,username)
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
          <View className="w-20 h-20 rounded-full bg-gray-300" />
        )}
      </View>
      <Text className="font-semibold text-lg mb-1">{username}</Text>

      {distance && (
        <Text className="text-sm text-gray-600 mb-3">{`${distance} km`}</Text>
      )}

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
    </View>
  );
};

export default UserItem;
