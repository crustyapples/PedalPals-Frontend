import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useAuthDetails, useAuthToken } from "../contexts/AuthContext";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, Button } from "react-native";
import LeaderBoardEntry from "./LeaderBoardEntry";

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
const LeaderBoard: React.FC = () => {
  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  const onRefresh = () => {
    if (token && userId) {
      fetchUserData().then((fetchedUserData) => {
        if (fetchedUserData) {
          getLeaderboard().then((fetchedLeaderboard) => {
            if (fetchedLeaderboard) {
              // from fetchedUserData.friends_list we get an array of ids
              // from fetchedLeaderboard we get an array of objects, each with an id
              // we want to filter fetchedLeaderboard to only include those objects with ids in fetchedUserData.friends_list
              // then we want to sort fetchedLeaderboard by points

              console.log(fetchedLeaderboard);
              console.log(fetchedUserData.friends_list);
              const filteredLeaderboard = fetchedLeaderboard.filter((user) => {
                return fetchedUserData.friends_list.includes(user.id);
              });

              filteredLeaderboard.sort((a, b) => {
                return b.points - a.points;
              });

              // re number the leaderboard_position in the filteredLeaderboard
              for (let i = 0; i < filteredLeaderboard.length; i++) {
                filteredLeaderboard[i].leadership_position = i + 1;
              }
              setLeaderboardData(filteredLeaderboard);
            }
          });
        }
      });
    }
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
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLeaderboard = async () => {
    try {
      const response = await fetch(BASE_URL + "/refresh-leaderboard", {
        method: "POST",
        headers: {
          // 'Authorization': 'Bearer ' + token,
          // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({})
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      setLeaderboardData(data.message);
      return data.message;
    } catch (error) {
      console.error("Network error:", error);
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
    if (token && userId) {
      fetchUserData().then((fetchedUserData) => {
        if (fetchedUserData) {
          getLeaderboard().then((fetchedLeaderboard) => {
            if (fetchedLeaderboard) {
              // from fetchedUserData.friends_list we get an array of ids
              // from fetchedLeaderboard we get an array of objects, each with an id
              // we want to filter fetchedLeaderboard to only include those objects with ids in fetchedUserData.friends_list
              // then we want to sort fetchedLeaderboard by points

              console.log(fetchedLeaderboard);
              console.log(fetchedUserData.friends_list);
              const filteredLeaderboard = fetchedLeaderboard.filter((user) => {
                return fetchedUserData.friends_list.includes(user.id);
              });

              filteredLeaderboard.sort((a, b) => {
                return b.points - a.points;
              });

              // re number the leaderboard_position in the filteredLeaderboard
              for (let i = 0; i < filteredLeaderboard.length; i++) {
                filteredLeaderboard[i].leadership_position = i + 1;
              }
              setLeaderboardData(filteredLeaderboard);
            }
          });
        }
      });
    }
  }, [token, userId]);

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-black font-Poppins_Bold text-3xl text-center my-4">
        Leaderboard
      </Text>

      <View className="h-64 mx-4 my-2 bg-white rounded-lg shadow-md p-2">
      <Button title="Refresh Leaderboard" onPress={onRefresh} />

      <ScrollView
        >
          {leaderboardData.map((cycle, index) => (
            <LeaderBoardEntry key={index} {...cycle} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default LeaderBoard;
