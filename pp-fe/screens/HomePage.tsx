import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import SocialPost from "../components/SocialPost";
import TopNavBar from "../components/TopNavBar";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 


const HomePage = () => {

  const SOCIAL_POST_DATA = [
    {
      id: 1,
      username: "the_man",
      distance: "22.34 km",
      time: "20m 14s",
      speed: "66.23 km/h",
      comment: "First cycle of the week! 🔥"
    },
    {
      id: 2,
      username: "the_myth",
      distance: "30 km",
      time: "10m 14s",
      speed: "100 km/h",
      comment: "Best cycle EVER! "
    },

    {
      id: 3,
      username: "the_legend",
      distance: "200 km",
      time: "59m 59s",
      speed: "70 km/h",
      comment: "Loved it"
    }
  ]
  

  const renderItem = ({ item }) => (
    <SocialPost username = {item.username} distance={item.distance} time={item.time} speed={item.speed} comment={item.comment}></SocialPost>
  );

  // FlatListItemSeparator = () =>{
  //   return (
  //     <View className = "h-1 w-screen bg-black"></View>
  //   );
  // };

  return(

    <View className = "bg-white">
                  
      <View className = "pl-5 pr-5">
      
       {/* 1.First row of content- User's Profile Photo and Welcome Header */}
        {/* <TopNavBar navigation = {navigation} /> */}

       <FlatList
        data = {SOCIAL_POST_DATA}
        renderItem = { renderItem}
        keyExtractor={item => item.id}
        // ItemSeparatorComponent = {this.FlatListItemSeparator}
        />

      </View>

    {/* <NavigationBar /> */}

    </View>
  )
}
export default HomePage;






