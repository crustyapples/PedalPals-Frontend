import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";


const DuringPath = () => {

    const ShareButton = () => {

        const onPressFunction = () => {
          // Define the action when the button is pressed
          console.log('Button pressed!');
        };
      
        return(
            <Pressable onPress={onPressFunction}>
              <Image className  ="h-16 w-16" source={require("../assets/Icon_Share.png")} />
            </Pressable>
        );
      };  
    
    
    const BookmarkButton = () => {

        const onPressFunction = () => {
          // Define the action when the button is pressed
          console.log('Button pressed!');
        };
      
        return(
            <Pressable onPress={onPressFunction}>
              <Image className  ="h-16 w-16" source={require("../assets/Icon_Bookmark.png")} />
            </Pressable>
        );
      };
      

    const StopButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            console.log('Button pressed!');
          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#fca5a5] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155] text-center font-Poppins_Bold ">STOP</Text>
            </View>
            </TouchableOpacity>
        );
    };

    const PauseButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            console.log('Button pressed!');
          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#fde68a] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155]  text-center font-Poppins_Bold ">PAUSE</Text>
            </View>
            </TouchableOpacity>
        );
    };
  

  
  
    
  
    return (
      <View className = "bg-[#2dd4bf] h-64 rounded-t-xl rounded-b-xl flex-col justify-start pl-4 pr-4">

        <View className = " flex-row justify-between bg-[#ccfbf1] rounded-t-xl rounded-b-xl mt-4 ">


            <View className = "flex-col ">

                <View className = "flex-row">
                    <Image className = "object-fill w-6 h-8" source = {require("../assets/Icon_Location.png")} />
                    <View className = "flex-col pl-2">
                        <Text className = " text-sm font-Poppins_Bold">Start</Text>
                        <Text className = " text-sm font-Poppins_Medium" >Tanjong Hall, NTU</Text>
                    </View>
                </View>
                
                <View className = "flex-row mt-10">
                    <Image className = "object-fill w-6 h-8" source = {require("../assets/Icon_Location.png")} />
                    
                    <View className = "flex-col pl-2">
                        <Text className = " text-sm font-Poppins_Bold">End</Text>
                        <Text className = " text-sm font-Poppins_Medium">The Wave, NTU</Text>
                    </View>

                </View>
            </View>    

            <View className = " flex-col justify-around">
                <Text className = "text-3xl text-center font-Poppins_Bold">0.6 KM</Text>
                
                <View className = "flex-row  items-center justify-around w-32">
                    <Image className = "h-8 w-8" source={require("../assets/Icon_Clock.png")} />
                    <Text className = "text-2xl font-Poppins_Regular">00:00</Text>
                </View>
            </View>
            
            
            

        </View>


        <View className = "flex-row  mt-5 items-center justify-between">
            <View className = "flex-row">
                <StopButton />
                
                <View className = "ml-3">
                    <PauseButton />
                </View>
                
            </View>

            <View className = "flex-row">
                <ShareButton />
                <BookmarkButton />

            </View>

        </View>
          
  
      </View>
    );
  };

  export default DuringPath;