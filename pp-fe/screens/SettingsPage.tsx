import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import SettingsPageTopNavBar from "../components/SettingsPageTopNavBar";




const SettingsPage = () => {

    return(
        <View className = "pl-5 pr-5">
            {/* <SettingsPageTopNavBar /> */}

            <View className = "mt-10 flex-col">
                <View className = "mt-3">
                    <Text className = "font-Poppins_Bold text-2xl text-black">Units</Text>
                    
                </View>
                
            </View>
        </View>
    );
  };

  export default SettingsPage;