import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import TopNavBar from "../components/TopNavBar";
import Leaderboard from "../components/Leaderboard";




const Challenges = () => {

    return(
        <View className = "pl-5 pr-5">
            {/* <TopNavBar /> */}
            <View className = "mt-3  pt-2">
                <Leaderboard />
            </View>
        </View>
    );
  };

  export default Challenges;
  

