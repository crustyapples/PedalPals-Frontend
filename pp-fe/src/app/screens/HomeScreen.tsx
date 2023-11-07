import React from "react";
import { View, ScrollView } from "react-native";
import PostCard from "@/src/app/components/PostCard";
import { useAuthDetails } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

// make a call to /posts/<user_id> to get all posts by user

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type Route = {
  _id: string;
  distance: number;
  time: number;
  start_coordinates: string;
  end_coordinates: string;
  route_difficulty: string;
  route_geometry: string;
}

type Post = {  
  _id: string;
  caption: string;
  comments: any;
  likes: number;
  route: Route;
  timestamp: string;
  user: string;
}

const HomePage: React.FC = () => {
  const { getToken, getEmail, getUserId } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

  const loadPosts = async (userId) => {
    try {
      const response = await fetch(BASE_URL + `/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }
      const data = await response.json();

      // filter through data for all posts that are not from userId

      const filteredData = data.filter((post) => post.user_id!== userId);

      setPosts(filteredData);

    } catch (error) {
      console.error("Authentication error", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const token = await getToken();
      const user_id = await getUserId();

      console.log("Token:", token);
      console.log("User ID:", user_id);

      setToken(token);
      setUserId(user_id);

    };

    fetchDetails();
  }, []);

  useEffect(() => {
    if (token && userId) {
      loadPosts(userId);
    }
  }, [token, userId]);

  return (
    <ScrollView>
      {posts.map((cycle, index) => (
        <PostCard key={index} {...cycle} />
      ))}
    </ScrollView>
  );
};

export default HomePage;
