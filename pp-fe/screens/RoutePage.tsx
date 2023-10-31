import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import TopNavBar from "../components/TopNavBar";
import RouteCard from "../components/RouteCard"

const RoutePage = () => {

    
  const ROUTE_PAGE_DATA = [
    {
      id: 1,
      nameOfRoute: "Ring of Fire",
      distance: "22.34 km",
    },
    {
      id: 2,
      nameOfRoute: "Ring of Fire",
      distance: "22.34 km",
    },

    {
      id: 3,
      nameOfRoute: "Ring of Fire",
      distance: "22.34 km",
    },

    {
        id: 4,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 5,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 6,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 7,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 8,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 9,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 10,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 11,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 12,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

      {
        id: 13,
        nameOfRoute: "Ring of Fire",
        distance: "22.34 km",
      },

  ]
  

  const renderItem = ({ item }) => (
    <RouteCard nameOfRoute = {item.nameOfRoute} distance={item.distance}></RouteCard>
  );

    return(

        <View className = "bg-white">                        
            <View className = "pl-5 pr-5">
                {/* <TopNavBar /> */}
                <View className = "flex items-center mt-5">
                    <FlatList
                        data = {ROUTE_PAGE_DATA}
                        numColumns={2}
                        renderItem = { renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        // ItemSeparatorComponent = {this.FlatListItemSeparator}
                    />
                </View>
                

            </View>
        </View>

    );
};


export default RoutePage;
