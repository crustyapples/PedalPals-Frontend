import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import TopNavBar from "../components/TopNavBar";

const CustomButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View className = "bg-[#2dd4bf] rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg  h-8 w-16 flex items-center justify-center">
          <Text className = "text-[#3D5151] text-center font-Poppins_Bold">{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const handleButtonPress = () => {
    // Define the action when the button is pressed
    console.log('Button pressed!');
  };

const NotifUpdate = ({username, update}) => {
    return(
        <View className = "flex-row justify-between items-center pt-4 pb-4">
            <Image className = "rounded-full h-8 w-8" source={require("../assets/Cyclist_Social_Post_2.png")} />
            <Text className = " w-24 font-Poppins_Regular">{username}</Text>
            <Text className = " w-32 font-Poppins_Light">{update}</Text>
            <CustomButton onPress={handleButtonPress} title = "Accept"/>
        </View>
    );
  };

const NotificationPage = () => {
  
  const NOTIFICATION_DATA = [
    {
        id: 1,
        username: "the_man",
        update: "has requested to follow you",
    },
    {
        id: 2,
        username: "the_myth",
        update: "liked your post",
    },
    {
        id: 3,
        username: "the_legend",
        update: "commented 'Nice job!' on your post.",
    },
    {
        id: 4,
        username: "the_man",
        update: " and 3 other liked your post",
    },
    {
        id: 5,
        username: "the_myth",
        update: "has requested to follow you",
    },
    {
        id: 6,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 7,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 8,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 9,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 10,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 11,
        username: "the_legend",
        update: "has requested to follow you",
    },
    {
        id: 12,
        username: "the_legend",
        update: "has requested to follow you",
    }


  ]


  const renderItem = ({ item }) => (
    <NotifUpdate username = {item.username} update={item.update}></NotifUpdate>
  );

  FlatListItemSeparator = () =>{
    return (
      <View className = "h-0.5 w-screen bg-black"></View>
    );
  };

  
  
    
    return (

    <View className = "bg-white">
                  
      <View className = "pl-5 pr-5">

        {/* <TopNavBar navigation = {navigation} /> */}

        <View className = "pt-5 flex-row">
            <Image className = " "source={require("../assets/Icon_Follow_Request.png")} />

            <View className = "flex-col pl-5">
                <Text className = "text-base font-Poppins_Regular">Follow Requests</Text>
                <Text className = "text-xs font-Poppins_Light">Approve or ignore requests</Text>
            </View>
        </View>


        <FlatList
        data = {NOTIFICATION_DATA}
        renderItem = { renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        />






      </View>
    </ View>
  );
};

export default NotificationPage;
