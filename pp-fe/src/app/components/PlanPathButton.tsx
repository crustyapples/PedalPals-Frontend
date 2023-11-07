import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuthDetails } from "../contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type PlanPathButtonProps = {
  startAddr: any[];
  endAddr: any[];
  sendDataToParent1: any;
  onStartClick: any;
};

const PlanPathButton: React.FC<PlanPathButtonProps> = ({
  startAddr,
  endAddr,
  sendDataToParent1,
  onStartClick,
}) => {
  const { getToken } = useAuthDetails();
  const [token, setToken] = useState("");

  const start_place_id = startAddr[1];
  const end_place_id = endAddr[1];

  const reverseGeo = async (place_id: string) => {
    try {
      const response = await fetch(BASE_URL + "/reverse-geocode", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_id }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      const string_data = JSON.stringify(data);
      const trimmed_data = string_data.trim();
      console.log("This is data from reverse geo", trimmed_data);

      return { isSuccessful: true, trimmed_data };
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const getRoute = async (start: string, end: string) => {
    try {
      const response = await fetch(BASE_URL + "/get-route", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_address: start.slice(1, -1),
          end_address: end.slice(1, -1),
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("this is data from getRoute", data);
      sendDataToParent1(data)
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
      const startResult = await reverseGeo(start_place_id);
      const endResult = await reverseGeo(end_place_id);
      getRoute(startResult.trimmed_data, endResult.trimmed_data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonPress = () => {
    fetchData();
    onStartClick();
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
