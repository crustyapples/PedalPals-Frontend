import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View, Text } from "react-native";

const DropdownEditDetails = ({ visibleState }) => {
  const [teleHandle, setTeleHandle] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [email, setEmail] = useState("");

  const saveButtonPress = () => {
    // Implementation of save functionality
  };

  const cancelButtonPress = () => {
    visibleState.setVisible(!visibleState.visible);
  };

  return (
    <View style={{ display: visibleState.visible ? "flex" : "none" }}>
      <View className="flex-col p-5">
        <View className="flex-row items-center mb-4">
          <Image
            className="w-8 h-8 mr-3"
            source={require("@/src/assets/images/tele-icon.png")}
          />
          <TextInput
            value={teleHandle}
            onChangeText={setTeleHandle}
            placeholder="Telegram Handle"
            placeholderTextColor="gray"
            className="flex-1 border-b border-gray-300 p-2"
          />
        </View>

        <View className="flex-row items-center mb-4">
          <Image
            className="w-8 h-8 mr-3"
            source={require("@/src/assets/images/insta-icon.png")}
          />
          <TextInput
            value={instaHandle}
            onChangeText={setInstaHandle}
            placeholder="Instagram Handle"
            placeholderTextColor="gray"
            className="flex-1 border-b border-gray-300 p-2"
          />
        </View>

        <View className="flex-row items-center mb-4">
          <Image
            className="w-8 h-8 mr-3"
            source={require("@/src/assets/images/edit-icon.png")}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="gray"
            className="flex-1 border-b border-gray-300 p-2"
          />
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity onPress={saveButtonPress} className="bg-blue-500 rounded-lg p-2">
            <Text className="text-white text-center font-bold">Save</Text>
          </TouchableOpacity>

          

          <TouchableOpacity onPress={cancelButtonPress} className="bg-red-500 rounded-lg p-2">
            <Text className="text-white text-center font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DropdownEditDetails;
