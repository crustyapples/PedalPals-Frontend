import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, Alert} from "react-native";
import {Color, Border, FontSize, FontFamily, Padding} from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';


const WelcomeLogin = () => {
  

  const [username_Text, onChangeUsernameText] = useState('');
  const [password_Text, onChangePasswordText] = useState('');

  const navigation = useNavigation();

  const LoginButton = () => {
    
  
    const loginButtonPress = () => {

      // Define the action when the button is pressed
      // console.log('Button pressed!');

        if (username_Text === "arjun" && password_Text === "arjun"){
          navigation.navigate("Home");
        }
    
        else {
          Alert.alert("Error", "Login Info are incorrect");
        }

        // navigation.navigate("Home");
  
    };
  
    return (
        <TouchableOpacity onPress={loginButtonPress}>
          <View className = "bg-[#2dd4bf] rounded-t-lg rounded-b-lg justify-center h-8">
            <Text className = "text-[#303535] text-center font-Poppins_Bold ">LOGIN</Text>
          </View>
      </TouchableOpacity>

    );
  };

  
    
    return (
      
      <ImageBackground
              className = "bg-cover h-screen w-screen"
                source = {require("../assets/mask-group.png")}
            >
            
            <View className = "flex-col mt-10 pl-5 pr-5">
  
              <View className = "flex-row mt-5 items-center ">
                
                <Image 
                    className = "  w-5"
                    source = {require("../assets/icon.png")}
                />
                <Text className = "mr-5 flex-1 text-center text-white font-Poppins_SemiBold text-lg">Welcome</Text>
              
              </View> 
              

            <Text className = " mt-5 px-10 py-10 text-center font-Poppins_ExtraBold text-white tracking-widest text-5xl">PEDALPALS</Text>
            
            <View className = "mt-16"></View>

              <View className = "flex-col  mt-64 items-stretch">
                <TextInput className = "bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-left font-Poppins_Light" placeholder = "Username" value = {username_Text} onChangeText={onChangeUsernameText}/>
                <TextInput  className = " mt-3 bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg text-left font-Poppins_Light" secureTextEntry={true} placeholder = "Password" value = {password_Text} onChangeText={onChangePasswordText}/>
                
                <View className = "mt-3">
                  <LoginButton />



                </View>
                

              </View>
            
          </View>

        </ImageBackground> 
    );
  };
  
  export default WelcomeLogin;