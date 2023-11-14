import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from "react-native";
import Slider from "@react-native-community/slider";
import UserItem from "@/src/app/components/UserItem";
import { useAuthDetails } from "../contexts/AuthContext";
import * as Location from "expo-location";
import axios from "axios";
import { useDistanceUnit } from '../contexts/DistanceUnitContext';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type User = {
  _id: string;
  name: string;
  email: string;
  teleHandle: string;
  instaHandle: string;
  friends_list: any;
  posts: any;
  analytics: any;
  gamification: any;
};

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
  const [activeTab, setActiveTab] = useState("nearby"); // 'nearby' or 'search'

  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState<User | null>(null);

  const [newLocation, setNewLocation] = useState(null);
  const [distance, setDistance] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { distanceUnit, toggleDistanceUnit } = useDistanceUnit();
  // console.log("User specified unit", distanceUnit);

  const convertToMiles = (distanceInKm) => {
    // Conversion factor: 1 kilometer = 0.621371 miles
    return (distanceInKm * 0.621371).toFixed(2);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    console.log("Refreshing");
    getLocationAndFindNearbyCyclist();
    if (token && userId) {
      fetchUserData();
    }

    setRefreshing(false);
  }, []);

  const handleSearch = (searchText, allUsers) => {
    console.log(searchText);
    const filteredUsersList = allUsers.filter((user) => {
      return user.username.toLowerCase().includes(searchText.toLowerCase());
    });
    
    // remove the current user from the list
    const filteredUsersWithoutCurrentUser = filteredUsersList.filter(
      (user) => user.id !== userId
    );
    
    console.log("filtered", filteredUsersWithoutCurrentUser);
    setFilteredUsers(filteredUsersWithoutCurrentUser);
  };

  const addRemoveFriend = (id) => {
    setUserData((prevState) => {
      const newUserData = { ...prevState };
      if (newUserData.friends_list.includes(id)) {
        newUserData.friends_list = newUserData.friends_list.filter(
          (friend) => friend !== id
        );
      } else {
        newUserData.friends_list.push(id);
      }
      return newUserData;
    })
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log("Got User Data");
      setUserData(data);
    } catch (error) {
      console.error("User Data Error:", error);
    }
  };

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

  const getAllUsers = async () => {
    try {
      const response = await fetch(BASE_URL + "/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
      return data;
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
    if (token && userId) {
      fetchUserData();
    }
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

  useEffect(() => {
    getAllUsers().then((data) => {
      handleSearch(searchedUser, data);
    });
  }, [searchedUser,userId]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="bg-gray-100">
        <View
          className="p-4"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            backgroundColor: "#f7f7f7",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => setActiveTab("nearby")}
              style={{ padding: 10 }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: activeTab === "nearby" ? "blue" : "#666",
                  fontSize: activeTab === "nearby" ? 16 : 16,
                  fontWeight: activeTab === "nearby" ? "bold" : "normal",
                  borderBottomWidth: activeTab === "nearby" ? 2 : 0,
                  borderBottomColor: "blue",
                }}
              >
                Nearby Users
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("search")}
              style={{ padding: 10 }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: activeTab === "search" ? "blue" : "#666",
                  fontSize: activeTab === "search" ? 16 : 16,
                  fontWeight: activeTab === "search" ? "bold" : "normal",
                  borderBottomWidth: activeTab === "search" ? 2 : 0,
                  borderBottomColor: "blue",
                }}
              >
                Search Results
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === "search" && (
            <TextInput
              placeholder="Search"
              className="my-4 p-2 border rounded text-gray-500"
              value={searchedUser}
              onChangeText={(value) => setSearchedUser(value)}
            />
          )}

          {activeTab === "nearby" && (
            <>
              <Text className="mb-2">
                Distance:
                {distanceUnit === 'miles'
            ? ` ${convertToMiles(distance)} mi`
            : ` ${Math.round(distance)} km`}
                </Text>
              <Slider
                minimumValue={0}
                maximumValue={10}
                value={distance}
                onValueChange={(value) => setDistance(value)}
              />
            </>
          )}
        </View>

        <ScrollView>
          <View className="flex-row flex-wrap justify-center">
            {activeTab === "nearby" &&
              nearbyUsers.map((user) => (
                <View key={user.id} style={{ width: "50%" }}>
                  {/* Pass distance prop only when 'nearby' tab is active */}
                  <UserItem
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    distance={user.distance}
                    token={token}
                    userId={userId}
                    isFriend={userData.friends_list.includes(user.id)}
                    updateFriend={addRemoveFriend}
                  />
                </View>
              ))}
            {activeTab === "search" &&
              filteredUsers.map((user) => (
                <View key={user.id} style={{ width: "50%" }}>
                  {/* Do not pass distance prop when 'search' tab is active */}
                  <UserItem
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    token={token}
                    userId={userId}
                    isFriend={userData.friends_list.includes(user.id)}
                    updateFriend={addRemoveFriend}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default NearbyPage;
