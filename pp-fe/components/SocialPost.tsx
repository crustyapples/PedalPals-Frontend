import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";

const SocialPost = ({username, distance, time, speed, comment}) => {
  return (
    <View className = "inline-flex flex-col bg-[#e2e8f0] rounded-t-3xl rounded-b-3xl pl-5 pr-5 mt-5">
      
      <View className = " flex-row  items-center pt-3">
        <Image className = "rounded-full h-6 w-6" source={require("../assets/Cyclist_Social_Post_2.png")} />
        <Text className = " pl-3 font-Poppins_Regular text-black">{username}</Text>
      </View>

      <View className = "flex-row  items-center justify-center pt-3">
        <Image className = "h-32 w-64 rounded-t-2xl rounded-b-2xl " source={require("../assets/route_3x.png")}/>
      </View>

      <View className = "flex-row  items-center pt-3">
        
        <View className = "flex-1  flex-col">
          <Text className = "font-Poppins_Light text-xs ">Distance</Text>
          <Text className = "text-lg font-Poppins_Medium text-black">{distance}</Text>
        </View>

        <View className = "flex-1  flex-col">
          <Text className = "text-xs font-Poppins_Light">Time taken</Text>
          <Text className = "text-lg font-Poppins_Medium text-black">{time}</Text>
        </View>
        
        <View className = "flex-1  flex-col">
          <Text className = "text-xs font-Poppins_Light">Average Speed</Text>
          <Text className = "font-Poppins_Medium text-lg text-black">{speed}</Text>
        </View>

      </View>


      <View className = "flex-row  items-center pt-3 pb-3">
        <Text className = "font-Poppins_Regular text-lg text-black">{comment}</Text>


        {/* <View className = "flex-1  flex-row-reverse">
          <Image className = "h-8 w-8 ml-2" source={require("../assets/comment3_3x.png")}/>
          <Image className = "h-8 w-8 ml-2" source={require("../assets/like3_3x.png")}/>

        </View> */}
      </View>

      <View className = "flex-row justify-around">
          <Image className = "h-8 w-8 ml-2" source={require("../assets/like3_3x.png")}/>
          <Image className = "h-8 w-8 ml-2" source={require("../assets/comment3_3x.png")}/>
 

      </View>

    </View>
  );
};


export default SocialPost;