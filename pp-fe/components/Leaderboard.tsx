import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import TopNavBar from "../components/TopNavBar";



const Leaderboard = () => {

    const LeaderboardEntry = ({row_id, username, points}) => {
        return(
        <View className = "flex-row justify-between items-center pt-4 pb-4 pl-5 pr-5 ">
            <View className = "flex-row ">
                <Text className = "text-black font-Poppins_Bold text-base">{row_id}</Text>
                <Text className = " ml-4 text-black font-Poppins_Regular text-base">{username}</Text>
            </View>
                
            <Text className = "text-black font-Poppins_Medium text-base">{points}</Text>
        </View>
        );
    };

    const LEADERBOARD_DATA = [
        {
          id: 1,
          row_id: 1,
          username: "the_man",
          points: "2000",
          
        },
        {
          id: 2,
          row_id: 2,
          username: "the_myth",
          points: "1500",
        },
    
        {
          id: 3,
          row_id: 3,
          username: "the_legend",
          points: "1200",
        },
        {
          id: 4,
          row_id: 4,
          username: "me",
          points: "1100",
        },
        {
          id: 5,
          row_id: 5,
          username: "myself",
          points: "1000",
        },
        {
          id: 6,
          row_id: 6,
          username: "I",
          points: "900",
        },
        {
          id: 7,
          row_id: 7,
          username: "random1",
          points: "800",
        },
        {
          id: 8,
          row_id: 8,
          username: "random2",
          points: "700",
        },
        {
          id: 9,
          row_id: 9,
          username: "random3",
          points: "600",
        }
      ]
      
    
      const renderItem = ({ item }) => (
        <LeaderboardEntry row_id = {item.row_id} username={item.username} points={item.points} ></LeaderboardEntry>
      );

    FlatListItemSeparator = () =>{
    return (
        <View className = "h-0.5 ml-5 mr-5 bg-black"></View>
    );
    };
    
    return(
        <View>
            <View>
                <Text className = "text-black font-Poppins_Bold text-2xl">Leaderboard</Text>
            

                <View className = "h-64 bg-[#C8E5E5] rounded-b-lg rounded-t-2xl border">
                    <FlatList
                        data = {LEADERBOARD_DATA}
                        renderItem = { renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        />
                </View>
            </View>
            
            <View className = "mt-5">
                <Text className = "text-black font-Poppins_Bold text-2xl">Weekly Challenge Routes</Text>

            </View>

            

        </View>
        

    );
};

export default Leaderboard;