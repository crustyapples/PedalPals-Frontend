import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import TopNavBar from "../components/TopNavBar";

const MapButtons = () => {

  const onPressFunction = () => {
    // Define the action when the button is pressed
    console.log('Button pressed!');
  };

  return(
    <View className = "flex-col h-48 w-16 justify-around items-center ">
      <Pressable onPress={onPressFunction}>
        <Image className = "h-8 w-8" source = {require("../assets/Icon_back_button.png")} />
      </Pressable>

      <Pressable onPress={onPressFunction}>
        <Image className = "h-8 w-8" source = {require("../assets/Icon_Bottle_of_water.png")} />
      </Pressable>
      
      <Pressable onPress={onPressFunction}>
      <Image className = "h-8 w-8" source = {require("../assets/Icon_Bicycle_Parking.png")} />
      </Pressable>
      
    </View>

  );
};


export default MapButtons;
