import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useAuthDetails, useAuthToken } from "../contexts/AuthContext";
import * as Location from "expo-location";
import axios, { AxiosRequestConfig } from "axios";
import { ScrollView } from "react-native-gesture-handler";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

// async functoin to request for location using the location service from expo location
async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission not granted",
      "Allow the app to use location service."
    );
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
}

const NearbyPage: React.FC = () => {
  const [distance, setDistance] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [newLocation, setNewLocation] = useState(null);

  const findNearbyCyclist = async (location) => {
    try {
      const response = await fetch(BASE_URL + "/find-nearby-cyclists", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radius: Math.round(distance),
          location: location,
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
      setNearbyUsers(data.nearby_users);
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const getLocationAndFindNearbyCyclist = async () => {
    console.log("Getting Users Current location");
    const location = await getUserLocation();
    console.log("User location:", location);

    if (location) {
      // make an UPDATE call to /user/user_id to update location
      const requestData = {
        location: {
          coordinates: `${location.coords.latitude},${location.coords.longitude}`,
          gps_persmission: "Granted",
        },
      };

      if (token && userId) {
        const response = await axios.put(
          BASE_URL + `/users/${userId}`,
          requestData,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setNewLocation(location);
      }
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const token = await getToken();
      const user_id = await getUserId();
      const email = await getEmail();

      console.log("Token:", token);
      console.log("User ID:", user_id);
      console.log("Email:", email);

      setToken(token);
      setUserId(user_id);
      setEmail(email);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    getLocationAndFindNearbyCyclist();
  }, [token, userId]);

  useEffect(() => {
    if (newLocation) {
      findNearbyCyclist(
        `${newLocation.coords.latitude},${newLocation.coords.longitude}`
      );
    } else {
      console.log("User location not updated");
      getLocationAndFindNearbyCyclist();
    }
  }, [Math.round(distance)]);

  return (
    <View className="bg-gray-100">
      <View className="p-4">
        <TextInput
          placeholder="Search"
          className="my-4 p-2 border rounded text-gray-500"
        />

        <Text className="mb-2">{`Distance: ${Math.round(distance)} km`}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          value={distance}
          onValueChange={(value) => setDistance(value)}
        />
      </View>

      <ScrollView>
        <View className="flex-row flex-wrap justify-center">
          {nearbyUsers.map((user, index) => (
            <View key={user.id} style={{ width: "50%" }}>
              <UserItem user={user} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NearbyPage;
