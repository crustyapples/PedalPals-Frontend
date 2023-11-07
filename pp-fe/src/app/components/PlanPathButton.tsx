import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAuthDetails } from "../contexts/AuthContext";
import axios, { AxiosRequestConfig } from "axios";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type PlanPathButtonProps = {
  startAddr: any[];
  endAddr: any[];
  sendDataToParent1: any;
  onStartClick: any;
};

// type PlanPathButtonProps = {
//     onPress: any
//   };

// const PlanPathButton: React.FC<PlanPathButtonProps> = ({startAddr, endAddr}) => {

const PlanPathButton: React.FC<PlanPathButtonProps> = ({
  startAddr,
  endAddr,
  sendDataToParent1,
  onStartClick,
}) => {
  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [dataToSendParent1, setDataToSendParent1] = useState("");

  const sendDataToParent1OnClick = () => {
    sendDataToParent1(dataToSendParent1);
  };

  const start_place_id = startAddr[1];
  const end_place_id = endAddr[1];

  const [startLocationResponse, setStartLocationResponse] = useState("");
  const [endLocationResponse, setEndLocationResponse] = useState("");

  const reverseGeoStart = async () => {
    try {
      const response = await fetch(BASE_URL + "/reverse-geocode", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_id: start_place_id }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      //   console.log("Start Location")
      const data = await response.json();
      console.log(data);
      const string_data = JSON.stringify(data);
      console.log(string_data);
      const trimmed_data = string_data.trim();
      console.log("This is data from reverse geo", trimmed_data);
      setStartLocationResponse(trimmed_data);

      return { isSuccessful: true, data };
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const reverseGeoEnd = async () => {
    try {
      const response = await fetch(BASE_URL + "/reverse-geocode", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_id: end_place_id }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      //   console.log("End Location")
      const data = await response.json();
      console.log(data);
      const string_data = JSON.stringify(data);
      const trimmed_data = string_data.trim();
      console.log("This is data from reverse geo", trimmed_data);
      setEndLocationResponse(trimmed_data);

      return { isSuccessful: true, data };
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const getRoute = async () => {
    try {
      const response = await fetch(BASE_URL + "/get-route", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_address: startLocationResponse.slice(1, -1),
          end_address: endLocationResponse.slice(1, -1),
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("this is data from getRoute", data);
      setDataToSendParent1(data);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Token:", token);
      setToken(token);
    };

    fetchToken();
  }, []);

  const fetchData = async () => {
    try {
      // Call the first async function
      const startResult = await reverseGeoStart();
      // Call the second async function
      if (startResult.isSuccessful) {
        const endResult = await reverseGeoEnd();

        if (endResult.isSuccessful && startLocationResponse && endLocationResponse) {
          await getRoute();
        }
      }
      // Once the first two functions have completed, call the third async function
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonPress = () => {
    fetchData();
    onStartClick();
    sendDataToParent1OnClick();

    // reverseGeoStart();
    // reverseGeoEnd();
    // getRoute();

    // onPress;
  };

  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      className="bg-[#ccfbf1] rounded-lg py-3 mt-4"
    >
      <Text className="text-[#334155] text-center text-lg font-bold">
        {" "}
        PLAN PATH
      </Text>
    </TouchableOpacity>
  );
};

export default PlanPathButton;
