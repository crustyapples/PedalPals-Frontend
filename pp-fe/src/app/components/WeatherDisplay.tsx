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
    // <View className="bg-gray-200 w-8 h-16 mt-2 rounded-lg mb-2">
    //     <Text>{routeData.weather.PM25} </Text>
    // </View>

    <View>
        
    </View>
);
};




export default WeatherDisplay;