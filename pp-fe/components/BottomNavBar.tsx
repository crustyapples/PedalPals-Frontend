import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";

const TopNavBar = () => {
  return (

    <View className = "flex-row justify-around fixed -inset-x-0 botton-0 bg-[#cbd5e1] p-4">
      <Image source={require("../assets/Icon_Home.png")}/>
      <Image source={require("../assets/Icon_User_Location.png")}/>
      <Image source={require("../assets/Icon_Bicycle.png")}/>
      <Image source={require("../assets/Icon_Journey.png")}/>
      <Image source={require("../assets/Icon_Leaderboard.png")}/>

    </View>

    );
};

export default TopNavBar;
