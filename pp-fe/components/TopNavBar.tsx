import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 


const TopNavBar = () => {

  const ProfileIconButton = () => {

    const onPressFunction = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      
    };
  
    return(

        <Pressable onPress={onPressFunction}>
          <Image className = "rounded-full h-12 w-12" source = {require("../assets/Serene_Lee_profile.png")} />
        </Pressable>
        
  
    );
  };
  
  
  
  const NotificationButton = () => {

    const onPressFunction = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      navigation.navigate("Notification")
    };
  
    return(

        <Pressable onPress={onPressFunction}>
          <Image className = "h-8 w-8" source = {require("../assets/Icon_Notification.png")} />
        </Pressable>
        
  
    );
  };



  return (
    <View className = "pt-10 flex-row  items-center ">  
          
          <ProfileIconButton />

          <Text className = "mr-4  flex-1 text-center text-[3D5151] font-Poppins_SemiBold text-xl">Challenges</Text>

          <NotificationButton />


        
    </View> 
  );
};

export default TopNavBar;
