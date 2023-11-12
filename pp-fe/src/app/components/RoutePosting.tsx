import React, { useEffect, useState } from "react";
import { Link } from "expo-router"
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapButtons from "./MapButtons";
import RouteInfoPlanning from "./RouteInfoPlanning";
import MapViewComponent from "./MapViewComponent";
import PostCard from "./PostCard";
import { useAuthDetails } from "../contexts/AuthContext";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type RoutePostingProps = {
  distance: number;
  time: number;
  routeData: any;
  routeId: any;
  routeCoordinates: any;
  setRoutePlanned: any;
  setRouteStopped: any;
};

const RoutePosting: React.FC<RoutePostingProps> = ({
  distance,
  time,
  routeData,
  routeId,
  routeCoordinates,
  setRoutePlanned,
  setRouteStopped,

}) => {
  const [caption, setCaption] = useState("");
  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");
  // console.log("Received Route Data", routeData)
  console.log("Route Id received by RoutePosting", routeId);

  const calculateRegion = () => {
    if (routeCoordinates.length === 0) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const latitudes = routeCoordinates.map((coordinate) => coordinate.latitude);
    const longitudes = routeCoordinates.map((coordinate) => coordinate.longitude);

    const maxLatitude = Math.max(...latitudes);
    const minLatitude = Math.min(...latitudes);
    const maxLongitude = Math.max(...longitudes);
    const minLongitude = Math.min(...longitudes);

    const latitudeDelta = maxLatitude - minLatitude;
    const longitudeDelta = maxLongitude - minLongitude;

    return {
      latitude: (maxLatitude + minLatitude) / 2,
      longitude: (maxLongitude + minLongitude) / 2,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const region = calculateRegion();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const PostRoute = async () => {
    try {
      const response = await fetch(BASE_URL + "/post-route", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: caption,
          route: routeId,
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const PostButton = () => {
    const handleButtonPress = async () => {
      //   console.log('Button pressed!');
      PostRoute().then(() => {
        console.log("Route Posted!");
        setRoutePlanned(false);
        setRouteStopped(false);
      })
    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#d1d5db] text-left h-16 w-full ml-4 justify-center rounded-lg">
        
          <Text className="text-gray-600 text-center font-Poppins_Bold font-bold text-2xl">
              Share with my pals!
            </Text>
        

        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Token:", token);
      setToken(token);
    };

    fetchToken();
  }, []);

  return (
    <View className="bg-white p-4 h-screen rounded-lg shadow-md m-2">
      {/* <Text>{time}</Text>
      <Text>{distance}</Text> */}
      {/* <Text>{routeCoordinates}</Text> */}

      <TextInput
        className="bg-white rounded-lg p-2 h-16 mt-2 border break-all text-gray-600 border-gray-400"
        placeholder="How'd it go? Share more about your activity to your pals!"
        value={caption}
        multiline = {true}
        onChangeText={(caption) => {
          setCaption(caption);
        }}
      />

<MapView
        provider={PROVIDER_GOOGLE}
        // style={{ flex: 1 }}
        className = "w-full h-64 rounded-lg mt-8 mb-2"
        region={{
          ...region,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        zoomEnabled={true}
        scrollEnabled={false}
        rotateEnabled={true}
        pitchEnabled={true}
        // Rotate the map according to the heading
      >
        {/* <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="My Location"
        /> */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeColors={['#7F0000']}
          strokeWidth={3}
        />
      </MapView>

      <View className="flex flex-row justify-between text-sm mt-8">
      <Text className="font-Poppins_Light text-sm text-gray-600">
          Distance
          <Text className="font-Poppins_Light text-sm font-bold">
            {` ${distance} km`}
          </Text>
        </Text>
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Time
          <Text className="font-Poppins_Light text-sm font-bold">
            {` ${formatTime(time)}`}
          </Text>
        </Text>
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Speed
          <Text className="font-Poppins_Light text-sm font-bold">
            {` ${(distance / (time / 3600)).toFixed(2)} km/h`}  
          </Text>
        </Text>
        </View>


        <View className="flex-col flex  justify-center items-center h-32">
          <PostButton />
        </View>
    </View>
  );
};

export default RoutePosting;
