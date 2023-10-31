import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList, Pressable} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import MapButtons from "../components/MapButtons";
import PlanPath from "../components/PlanPath";

const MapChoosingPathPage = () => {
    
    return (

      // TO-DO ----- USE THE MAP VIEW FUNCTION FROM REACT-NATIVE-MAPS

      <View className = "h-screen flex-col mt-10 ml-5 mr-5">
        
        <View className= "left-0 top-0">
          <MapButtons />
        </View>
        

        <View className = "bottom-24 inset-x-0 absolute">
          <PlanPath />  
        </View>
        
        
      </View>
      // <View className = "h-screen ml-5 mr-5">
      //  
      // </View>  



  );
};

export default MapChoosingPathPage;
