import React from "react";
import { View, Text, Image, Button, FlatList, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";





const RouteInfoPlanning: React.FC = () => {

    const PlanPathButton = ({ onPress, title }) => {
        return (
          <TouchableOpacity onPress={onPress}>
            <View className = "bg-[#ccfbf1] rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-left h-12 justify-center">
              <Text className = "text-[#334155] text-center text-lg font-Poppins_Bold">{title}</Text>
            </View>
          </TouchableOpacity>
        );
      };
    
      const handleButtonPress = () => {
        // Define the action when the button is pressed
        console.log('Button pressed!');
      };
    
      const [start_Text, onChangeStartText] = useState('');
      const [end_Text, onChangeEndText] = useState('');

    return(

<View className = "bg-[#2dd4bf] h-64 rounded-t-xl rounded-b-xl flex-col justify-around pl-4 pr-4">
  
        <View className = " flex-col">
          <Text className = " text-sm font-Poppins_Bold">Start</Text>
          <TextInput className = " bg-white rounded-t-lg rounded-b-lg  text-left font-Poppins_Light" placeholder = "Starting Address" value = {start_Text} onChangeText={onChangeStartText}/>
        </View>
        
        <View className = " flex-col">
          <Text className = " text-sm font-Poppins_Bold">End</Text>
          <TextInput  className = " bg-white rounded-t-lg rounded-b-lg text-left font-Poppins_Light" placeholder = "Ending Address" value = {end_Text} onChangeText={onChangeEndText}/>
        </View>
  
        <PlanPathButton onPress={handleButtonPress} title = "PLAN PATH"/>
          
  
      </View>
    );







};

export default RouteInfoPlanning;