import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useAuthToken } from '../contexts/AuthContext';
import axios, {AxiosRequestConfig} from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const RouteInfoPlanning: React.FC = () => {
  const PlanPathButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity onPress={onPress} className="bg-[#ccfbf1] rounded-lg py-3 mt-4">
        <Text className="text-[#334155] text-center text-lg font-bold">{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleButtonPress = () => {
    console.log("Button pressed!");
  };

  const [start_Text, onChangeStartText] = useState("");
  const [end_Text, onChangeEndText] = useState("");

  const getToken = useAuthToken();
  const [token, setToken] = useState('');

  const getStartSuggestionResponse = async () => {
    try {
      const response = await fetch(BASE_URL + '/address-autocomplete', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "input_address": start_Text })
      });
  
      if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Network error:', error);
    }

  };

  const getEndSuggestionResponse = async () => {

    try {
      const response = await fetch(BASE_URL + '/address-autocomplete', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "input_address": end_Text })
      });
  
      if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Network error:', error);
    }

  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log('Token:', token);
      setToken(token);
    };

    fetchToken();
  }, []);

  useEffect(() => {

    getStartSuggestionResponse();
    getEndSuggestionResponse();
  }, [start_Text, end_Text]);



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#2dd4bf] p-4 rounded-xl my-4 mx-3 shadow-md">
          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">Start</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Starting Address"
              value={start_Text}
              onChangeText={onChangeStartText}
            />
          </View>

          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">End</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Ending Address"
              value={end_Text}
              onChangeText={onChangeEndText}
            />
          </View>

          <PlanPathButton onPress={handleButtonPress} title="PLAN PATH" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RouteInfoPlanning;
