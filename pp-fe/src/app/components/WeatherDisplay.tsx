import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";


type WeatherDisplayProps = {
    routeData: any;
  };

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({routeData}) => {
 console.log("This is the weather information", routeData.weather.PM25)
return(
    <View className="bg-white w-48 h-32 mt-2 rounded-xl mb-2 flex shadow-md">
        <View className = " flex-row justify-center  ">
            <View className=" flex-1 items-center justify-center">
                <FontAwesome name="leaf" size={25} />
            </View>
            <View className = "flex-col ">
                <Text className = "text-lg font-bold ">1-hr PM 2.5: </Text>
                <Text className = "text-lg  text-right">{routeData.weather.PM25} µ/m3</Text>
            </View>
        </View>
        <View className = "flex mt-2">
            <Text className = "text-base">{routeData.weather.weather.forecast} at </Text>
            <Text className = "text-lg  text-right">{routeData.weather.weather.area} </Text>
        </View>

    </View>


);
};




export default WeatherDisplay;