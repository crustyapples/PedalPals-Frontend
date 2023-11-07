import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, Alert } from "react-native";

import UserDetails from "../components/UserDetails";
import UserStats from "../components/UserStats";
import UserPosts from "../components/UserPosts";
// import UserPosts2 from "../components/UserPosts2";
import { useAuthDetails } from "../contexts/AuthContext";

const dummyData_UserPosts = [
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: "thelegend27",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
    time: "20m 14s",
    averageSpeed: 66.23,
    description: "First cycle of the week!",
  },
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: "thelegend27",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 13.51,
    time: "1h 20m",
    averageSpeed: 10.13,
    description: "",
  },
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: "thelegend27",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
    time: "20m 14s",
    averageSpeed: 66.23,
    description: "Second cycle of the week!",
  },
  // ... more dummy data
];

// type ProfileScreenProps = {
//   profilePic: any,
//   username: string,
//   numOfPals: number,
// teleHandle: string,
// instaHandle: string,
// numOfReward1: number,
// numOfReward2: number,
// numOfReward3: number,
// totalDistanceTravelled: number,
// averageSpeed: number,
// socialPostData: any
// };

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const ProfilePage: React.FC = () => {
  const {getToken, getEmail, getUserId} = useAuthDetails();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  // const [jsonData, setJsonData] = useState({
  //   "_id": "",
  //   "analytics": {
  //     "avg_speed": 0,
  //     "routes": [],
  //     "total_distance": 0
  //   },
  //   "email": "",
  //   "friends_list": [],
  //   "gamification": {
  //     "badgeCount": 0,
  //     "badges": [],
  //     "leadership_position": 0,
  //     "points": 0
  //   },
  //   "location": {
  //     "coordinates": "",
  //     "gps_permission": ""
  //   },
  //   "name": "",
  //   "posts": []
  // });

  

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

      // setGame(data.gamification);
      // setBadgeCount(data.gamification.badgeCount);
      // setLeadershipPosition(data.gamification.leadership_position);
      // setPoints(data.gamification.points);

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

  // console.log("this is user data",userData);



  // const profilePic = require("@/src/assets/images/favicon.png");
  // const username = "thelegend27";
  // const numOfPals = 5;
  // const teleHandle = "@thelegend27";
  // const instaHandle = "@thelegend27";
  // const numOfReward1 = 5;
  // const numOfReward2 = 2;
  // const numOfReward3 = 23;
  // const totalDistanceTravelled = 22.34;
  // const averageSpeed = 66.23;
  // const socialPostData = dummyData_UserPosts;

  const profilePic = require("@/src/assets/images/favicon.png");
  const teleHandle = "@thelegend27";
  const instaHandle = "@thelegend27";



  // console.log(avgSpeed);
  // console.log(routes);
  // console.log(totalDistance);
  // console.log(emailAddress);
  // console.log(friendsList);

  // console.log(game);
  // console.log(badgeCount);
  // console.log(badges);
  // console.log(points);
  // console.log(leadershipPosition);

  // console.log(coordinates);
  // console.log(gpsPermission);
  // console.log(username);
  // console.log(posts);




  const numOfReward1 = 5;
  const numOfReward2 = 2;
  const numOfReward3 = 23;
  const totalDistanceTravelled = 22.34;
  const averageSpeed = 66.23;
  // const socialPostData = dummyData_UserPosts;


  return (
    <ScrollView>
      <UserDetails
        profilePic={profilePic}
        username = {username}
        numOfPals={friendsList.length}
        teleHandle={teleHandle}
        instaHandle={instaHandle}
        numOfReward1={numOfReward1}
        numOfReward2={numOfReward2}
        numOfReward3={numOfReward3}
      />
      <UserStats
        totalDistanceTravelled={totalDistance}
        averageSpeed={avgSpeed}
      />
      <UserPosts socialPostData={dummyData_UserPosts} />
      {/* <UserPosts2 socialPostData={posts} /> */}
    </ScrollView>
  );
};

export default ProfilePage;
