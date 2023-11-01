import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
// import { useAuth } from "../contexts/AuthContext";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';

// const { logout } = useAuth();




const LogOutButton = () => {
  
    return (
        <TouchableOpacity onPress={logOutButtonPress}>
          <View className = "bg-[#a1a1aa] rounded-t-lg rounded-b-lg justify-center h-8">
            <Text className = "text-[#303535] text-center font-Poppins_Bold ">LOG OUT</Text>
          </View>
      </TouchableOpacity>

    );
  };

const logOutButtonPress = () => {

// Define the action when the button is pressed
// console.log('Button pressed!');



    // navigation.navigate("Home");

};





const SettingsAccount: React.FC= () => {


    return(
        <View>
            
            <LogOutButton />
        </View>

            
                

                

    )

}


export default SettingsAccount;