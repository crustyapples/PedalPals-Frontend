import { useState, useEffect, useCallback } from "react";
import { useAuthDetails } from "../contexts/AuthContext";
import { View, ScrollView, RefreshControl } from "react-native";
import RouteCard from "../components/RouteCard";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
type Route = {
  _id: string;
  distance: number;
  time: number;
  route_geometry: string;
  route_difficulty: string;
  date?: string;
  route_summary?: {
    start_point: string;
    end_point: string;
  }
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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
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
    // Ensure to call fetchRoutes inside fetchUserData if needed
    // or call it here after fetchUserData if they are independent
    setRefreshing(false);
  }, [userId, token]); // Add other dependencies if necessary
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-row flex-wrap justify-center">
        {userRoutes.map((route, index) => (
          <View key={index} >
            <RouteCard  {...route} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RoutePage;
