import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useAuthDetails, useAuthToken } from '../contexts/AuthContext';
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "react-native";
import LeaderBoardEntry from "./LeaderBoardEntry";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const dummyData = [
  {
    row_id: 1,
    username: "thelegend27",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 2000,
  },
  {
    row_id: 2,
    username: "thedoglover",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 1500,
  },
  {
    row_id: 3,
    username: "thecatlover",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 1200,
  },
  // ... more dummy data
];

const LeaderBoard: React.FC = () => {

  const { getToken,getUserId, getEmail} = useAuthDetails();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const[leaderboardData, setLeaderboardData] = useState([]);

  const getLeaderboard = async () => {
    try {
      const response = await fetch(BASE_URL + '/refresh-leaderboard', {
        method: 'POST',
        headers: {
          // 'Authorization': 'Bearer ' + token,
          // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({})
      });
  
      if (!response.ok) {
        console.error('Server responded with an error:', response.statusText);
        return;
      }
  
      const data = await response.json();
      console.log(data);
      setLeaderboardData(data.message);

    } catch (error) {
      console.error('Network error:', error);
    }
  };


  useEffect(() => {
    const fetchDetails = async () => {
      const token = await getToken();
      const user_id = await getUserId();
      const email = await getEmail();

      console.log('Token:', token);
      console.log('User ID:', user_id);
      console.log('Email:', email);

      setToken(token);
      setUserId(user_id);
      setEmail(email);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    getLeaderboard();

    }, []);


  return (
    <View>
      <View>
        <Text className="text-black font-Poppins_Bold text-2xl text-center my-2">
          Leaderboard
        </Text>

        <View className="h-64 bg-[#C8E5E5] rounded-lg border mx-4">
          <ScrollView nestedScrollEnabled>
            {leaderboardData.map((cycle, index) => (
              <LeaderBoardEntry key={index} {...cycle} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default LeaderBoard;
