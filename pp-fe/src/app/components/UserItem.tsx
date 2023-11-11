import React from "react";
import { View, Text, Image, Button } from "react-native";

type UserItemProps = {
  user: {
    id: number;
    username: string;
    distance: any;
    avatar: any;
  };
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <View className="flex-col items-center p-4 bg-white shadow-md rounded-lg m-3">
      <View className="mb-3">
        {user.avatar ? (
          <Image source={user.avatar} className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-sm" />
        ) : (
          <View className="w-20 h-20 rounded-full bg-gray-300" />
        )}
      </View>
      <Text className="font-semibold text-lg mb-1">{user.username}</Text>
      <Text className="text-sm text-gray-600 mb-3">{`${user.distance} km`}</Text>
      <View className="bg-blue-500 w-full rounded-md shadow">
        <Button title="Add" color="white" />
      </View>
    </View>
  );
};

export default UserItem;