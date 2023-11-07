import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, Alert } from "react-native";

import UserDetails from "../components/UserDetails";
import UserStats from "../components/UserStats";
import UserPosts from "../components/UserPosts";
// import UserPosts2 from "../components/UserPosts2";
import { useAuthDetails } from "../contexts/AuthContext";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const ProfilePage: React.FC = () => {
  const {getToken, getEmail, getUserId} = useAuthDetails();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");  

  const [avgSpeed, setAvgSpeed] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const[emailAddress, setEmailAddress] = useState("");
  const[friendsList, setFriendsList] = useState([]);
  const[game, setGame] = useState();
  const [badgeCount, setBadgeCount] = useState(0);
  const[badges, setBadges] = useState([]);
  const [leadershipPosition, setLeadershipPosition] = useState(0);
  const [points, setPoints] = useState(0);
  const [coordinates, setCoordinates] = useState("");
  const [gpsPermission, setGpsPermission] = useState("");
  const [username, setUsername] = useState("");
  const[posts, setPosts] = useState([]);
  const[userData, setUserData] = useState();


  const loadUserInfo = async () => {
    try {
      const response = await fetch(BASE_URL + `/users/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);

      setAvgSpeed(data.analytics.avg_speed);
      setRoutes(data.analytics.routes);
      setTotalDistance(data.analytics.total_distance);
      setEmailAddress(data.email);
      setFriendsList(data.friends_list);

      setGame(data.gamification);
      setBadgeCount(data.gamification.badgeCount);
      setBadges(data.gamification.badges)
      setLeadershipPosition(data.gamification.leadership_position);
      setPoints(data.gamification.points);

      setCoordinates(data.location.coordinates);
      setGpsPermission(data.location.gps_permission);
      setUsername(data.name);
      setPosts(data.posts);
    }
    catch (error) {
      console.error('Authentication error', error);
      Alert.alert('Authentication error', 'Something went wrong');
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
    if (token && userId) {
      loadUserInfo();
    }
  }, [token, userId]);

  const profilePic = require("@/src/assets/images/favicon.png");
  const teleHandle = "@thelegend27";
  const instaHandle = "@thelegend27";


  // Function to count the occurrence of each badge
  const countBadges = (badges) => {
    const badgeCount = { bronze: 0, silver: 0, gold: 0 };
    badges.forEach((badge) => {
      if (badgeCount.hasOwnProperty(badge)) {
        badgeCount[badge]++;
      }
    });
    return badgeCount;
  };

  const badgeCounts = game ? countBadges(badges) : { bronze: 0, silver: 0, gold: 0 };


  return (
    <ScrollView>
      {userData && (
        <>
          <UserDetails
            profilePic={require("@/src/assets/images/favicon.png")} // Placeholder, replace with actual profilePic if available
            username={username}
            numOfPals={friendsList.length}
            teleHandle="@thelegend27" // Placeholder, replace with actual data if available
            instaHandle="@thelegend27" // Placeholder, replace with actual data if available
            numOfReward1={badgeCounts.bronze}
            numOfReward2={badgeCounts.silver}
            numOfReward3={badgeCounts.gold}
          />
          <UserStats
            totalDistanceTravelled={totalDistance}
            averageSpeed={avgSpeed}
          />
          <UserPosts socialPostData={posts} />
        </>
      )}
    </ScrollView>
  );
};

export default ProfilePage;






