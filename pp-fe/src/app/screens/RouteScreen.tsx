import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useAuthDetails } from "../contexts/AuthContext";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList } from "react-native";
import RouteCard from "../components/RouteCard";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
type Route = {
  _id: string;
  distance: number;
  time: number;
  route_geometry: string;
  route_difficulty: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  analytics: {
    routes: string[];
  };
};

const RoutePage: React.FC = () => {
  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [userRoutes, setUserRoutes] = useState<Route[]>([]);

  const fetchRoutes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routes`, {
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
      console.log("Got Routes");
      // console.log(data);
      setRoutes(data);
      return data;
    } catch (error) {
      console.error("Routes Error:", error);
    }
  };

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
      return data;
    } catch (error) {
      console.error("User Data Error:", error);
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
    if (userId && token) {
      fetchUserData().then((fetched_userData) =>
        fetchRoutes().then((fetched_routes) => {
          // userData.routes contains the route ids
          console.log("user route ids", fetched_userData.analytics.routes);
          const userRoutes = fetched_routes.filter((route) =>
          fetched_userData.analytics.routes.includes(route._id)
          );
          console.log("User Routes:", userRoutes[0]);
          setUserRoutes(userRoutes);
        })
      );
    }
  }, [userId, token]);

  return (
    <View className="flex items-center mt-5">
      <Text className="font-Poppins_Bold text-3xl text-black text-center">
        Your Routes
      </Text>
      <ScrollView>
        <View className="flex-row flex-wrap justify-center">
        {userRoutes.map((route, index) => (
          <View style={{width:"50%"}}>
            <RouteCard key={index} {...route} />
          </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RoutePage;
