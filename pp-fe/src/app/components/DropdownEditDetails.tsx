import { StyleSheet, TextInputComponent, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuthToken } from '../contexts/AuthContext';




const DropdownEditDetails = ({ visibleState }) => {

    const [teleHandle, setTeleHandle] = useState('');
    const [instaHandle, setInstaHandle] = useState('');
    const [email, setEmail] = useState('');
    const getToken = useAuthToken();



    const saveButtonPress = () => {

    };


    const cancelButtonPress = () => {
        visibleState.setVisible(!visibleState.visible)

    }

    return (
      <View style={{ display: visibleState.visible ? 'flex' : 'none' }}>
        {/* Dropdown content goes here */}
        <View className = "flex-col pl-5 pr-5 pt-5 pb-5">
            <View className = "flex-row items-center border">
                <Image className = "w-8 h-8 mr-3" source={require("@/src/assets/images/tele-icon.png")} />

                <TextInput
                    value={teleHandle}
                    onChangeText={setTeleHandle} 
                    placeholder = "Telegram Handle"
                    placeholderTextColor={'gray'}
                    className='border rounded p-2 mb-4  w-64' />

            </View>
            
            <View className = "flex-row border items-center">
                <Image className = "w-8 h-8 mr-3" source={require("@/src/assets/images/insta-icon.png")} />


                <View >
                    <TextInput
                    value={instaHandle}
                    onChangeText={setInstaHandle}
                    placeholder="Instagram Handle"
                    placeholderTextColor={'gray'}
                    className='border rounded p-2 mb-4  w-64'
                    />
                </View>


                

            </View>
            
            <View className = "flex-row border">
                <Image className = "w-8 h-8 mr-3" source={require("@/src/assets/images/edit-icon.png")} />

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                    className='border rounded p-2 mb-4 w-64'
                />

            </View>


            <View className = "flex-row">
                <TouchableOpacity onPress={saveButtonPress}>
                    <View className = "bg-[#2dd4bf] rounded-t-lg rounded-b-lg justify-center h-8">
                        <Text className = "text-[#303535] text-center font-Poppins_Bold ">Save</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={cancelButtonPress}>
                    <View className = "bg-[#2dd4bf] rounded-t-lg rounded-b-lg justify-center h-8">
                        <Text className = "text-[#303535] text-center font-Poppins_Bold ">Cancel</Text>
                    </View>
                </TouchableOpacity>
                

            </View>
        </View>
        
        </View>
    );
  };
  
  export default DropdownEditDetails;
