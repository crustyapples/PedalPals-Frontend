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
import PlanPathButton from "./PlanPathButton";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type RouteInfoPlanningProps = {
  onStartClick: any;
  sendDataToParent2: any;
};

const RouteInfoPlanning: React.FC<RouteInfoPlanningProps> = ({
  onStartClick,
  sendDataToParent2,
}) => {
  // const handleStartClick = () => {
  //   // Pass the startAddr and endAddr to the parent component to initiate the route
  //   onStartClick();
  // };

  // const PlanPathButton = () => {

  //   return (
  //     <TouchableOpacity onPress={handleStartClick} className="bg-[#ccfbf1] rounded-lg py-3 mt-4">
  //       <Text className="text-[#334155] text-center text-lg font-bold"> PLAN PATH</Text>
  //     </TouchableOpacity>
  //   );

  //   };

  // const sendDataToParent2 = (data) => {
  //   console.log("Data Received in Parent 1:", data)

  // };

  const [start_Text, onChangeStartText] = useState("");
  const [end_Text, onChangeEndText] = useState("");
  const [dataStart, setDataStart] = useState([]);
  const [dataEnd, setDataEnd] = useState([]);
  const [startAddr, setStartAddr] = useState([]);
  const [endAddr, setEndAddr] = useState([]);

  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [isStartListVisible, setStartListVisible] = useState(false);
  const [isEndListVisible, setEndListVisible] = useState(false);

  const getStartSuggestionResponse = async () => {
    try {
      const response = await fetch(BASE_URL + "/address-autocomplete", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_address: start_Text }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
      setDataStart(data);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const getEndSuggestionResponse = async () => {
    try {
      const response = await fetch(BASE_URL + "/address-autocomplete", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_address: end_Text }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
      setDataEnd(data);
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

  useEffect(() => {
    if (start_Text.trim() !== "") {
      getStartSuggestionResponse();
    }

    if (end_Text.trim() !== "") {
      getEndSuggestionResponse();
    }
  }, [start_Text, end_Text]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#2dd4bf] p-4 rounded-xl shadow-md">
          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">Start</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Starting Address"
              value={start_Text}
              onChangeText={(start_text) => {
                onChangeStartText(start_text);
                setStartListVisible(true);
              }}
            />
            {isStartListVisible && start_Text.length > 0 && (
              <FlatList
                data={dataStart}
                keyExtractor={(item, index) => item.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChangeStartText(item[0]);
                      setStartAddr(item);
                      setStartListVisible(false);
                    }}
                  >
                    <Text>{item[0]}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View className="mb-3">
            <Text className="text-sm font-bold text-[#334155] mb-1">End</Text>
            <TextInput
              className="bg-white rounded-lg p-2 text-[#334155]"
              placeholder="Ending Address"
              value={end_Text}
              onChangeText={(end_text) => {
                onChangeEndText(end_text);
                setEndListVisible(true);
              }}
            />
            {isEndListVisible && end_Text.length > 0 && (
              <FlatList
                data={dataEnd}
                keyExtractor={(item, index) => item.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChangeEndText(item[0]);
                      setEndAddr(item);
                      setEndListVisible(false);
                    }}
                  >
                    <Text>{item[0]}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          {/* <PlanPathButton startAddr = {startAddr} endAddr = {endAddr}/> */}
          {/* <PlanPathButton /> */}
          <PlanPathButton
            startAddr={startAddr}
            endAddr={endAddr}
            onStartClick={onStartClick}
            sendDataToParent1={sendDataToParent2}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RouteInfoPlanning;
