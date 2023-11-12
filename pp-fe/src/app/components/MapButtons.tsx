import React from "react";
import { View, Text, Image, Button, FlatList, TextInput, Pressable } from "react-native";

type MapButtonsProps = {
  onBackClick: any,
  onBicycleRackClick: any,
  onWaterPointClick:any

};


const MapButtons: React.FC<MapButtonsProps>= ({onBackClick, onBicycleRackClick, onWaterPointClick}) => {

    const backOnPressFunction = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      onBackClick();
    };

    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log('Button pressed!');
    };

    const bicycleRackonPressFunction = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      onBicycleRackClick();
    };

    const waterPointonPressFunction = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      onWaterPointClick();
    };
  
    return(
      <View className = "flex-col h-48 w-16 justify-around items-center ">
        <Pressable onPress={backOnPressFunction}>
          <Image className = "h-8 w-8" source = {require("@/src/assets/images/back-button.png")} />
        </Pressable>
  
        <Pressable onPress={waterPointonPressFunction}>
          <Image className = "h-8 w-8" source = {require("@/src/assets/images/bottle-of-water.png")} />
        </Pressable>
        
        <Pressable onPress={bicycleRackonPressFunction}>
        <Image className = "h-8 w-8" source = {require("@/src/assets/images/bicycle-parking.png")} />
        </Pressable>
        
      </View>
  
    );
  };
  
  
  export default MapButtons;
  