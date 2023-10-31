import React from "react";
import { View, Text, Image, Button, FlatList, TextInput, Pressable } from "react-native";

const MapButtons = () => {

    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log('Button pressed!');
    };
  
    return(
      <View className = "flex-col h-48 w-16 justify-around items-center ">
        <Pressable onPress={onPressFunction}>
          <Image className = "h-8 w-8" source = {require("@/src/assets/images/back-button.png")} />
        </Pressable>
  
        <Pressable onPress={onPressFunction}>
          <Image className = "h-8 w-8" source = {require("@/src/assets/images/bottle-of-water.png")} />
        </Pressable>
        
        <Pressable onPress={onPressFunction}>
        <Image className = "h-8 w-8" source = {require("@/src/assets/images/bicycle-parking.png")} />
        </Pressable>
        
      </View>
  
    );
  };
  
  
  export default MapButtons;
  