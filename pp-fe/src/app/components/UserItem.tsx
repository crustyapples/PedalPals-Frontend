import React from "react";
import { View, Text, Image, Button } from "react-native";

type UserItemProps = {
  user: {
    id: number;
    username: string;
    distance: number;
    avatar: any;
  };
};

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <View className="flex-col p-4 bg-white shadow-md rounded-lg w-1/2 mr-2">
      {user.avatar ? (
        <Image source={user.avatar} className="w-10 h-10 rounded-full" />
      ) : (
        <View className="w-10 h-10 rounded-full bg-gray-300" />
      )}
      <Text className="font-medium">{user.username}</Text>
      <Text className="text-sm">{`${user.distance} km`}</Text>
      <Button title="Add" />
    </View>
  );
};

export default UserItem;
