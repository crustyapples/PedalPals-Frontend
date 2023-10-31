import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import MapButtons from "../components/MapButtons";
import StartPath from "../components/StartPath";


const MapStartPathPage = () => {
    return(

        <View className = "h-screen flex-col mt-10 ml-5 mr-5">
        
        <View className= "left-0 top-0">
          <MapButtons />
        </View>
        

        <View className = "bottom-24 inset-x-0 absolute">
          <StartPath />  
        </View>        
      </View>

    );
};


export default MapStartPathPage;