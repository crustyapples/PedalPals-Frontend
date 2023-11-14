import React from "react";
import { View, ScrollView, RefreshControl} from "react-native";
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
  likes: any;
  route: Route;
  timestamp: number;
  user: string;
  user_id: string;
}

const HomePage: React.FC = () => {
  const { getToken, getUserId } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
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
      const filteredData = data.filter((post) => post.user_id !== userId);

      // reverse the order of the posts so that the most recent post is at the top
      filteredData.reverse();

      setPosts(filteredData);
    } catch (error) {
      console.error("Network error", error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchedToken = await getToken();
      const fetchedUserId = await getUserId();

      setToken(fetchedToken);
      setUserId(fetchedUserId);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    if (token && userId) {
      loadPosts(userId);
    }
  }, [token, userId]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadPosts(userId).then(() => setRefreshing(false));
  }, [userId]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </ScrollView>
  );
};

export default HomePage;
