import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";

const BackButton = () => {

    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log('Button pressed!');
    };
  
    return(
      <View className = "absolute left-0 ">
        <Pressable onPress={onPressFunction}>
          <Image className = "h-12 w-12  bottom-0" source = {require("../assets/Icon_back_button.png")} />
        </Pressable>
        
      </View>
  
    );
  };
  
const SettingsPageTopNavBar = () => {
  return (
    <View className = "mt-10 flex-row  items-center justify-center ">  
          
        <BackButton />
        <Text className = " text-center flex-1 text-[3D5151] font-Poppins_SemiBold text-xl text-black">Settings</Text>

        
    </View> 
  );
};

export default SettingsPageTopNavBar;
