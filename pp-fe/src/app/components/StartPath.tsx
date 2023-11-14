import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { useAuthDetails } from "../contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from 'expo-location';
import { useDistanceUnit } from '../contexts/DistanceUnitContext';

type StartPathProps = {
  routeSummary: any;
  region: any;
  onStopClick: () => void;
  routeData: any;
  sendDistanceToMapScreen: any;
  sendTimeToMapScreen: any;
  sendRouteIdToMapScreen: any;
};

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const StartPath: React.FC<StartPathProps> = ({
  routeSummary,
  region,
  onStopClick,
  sendDistanceToMapScreen,
  sendTimeToMapScreen,
  routeData,
  sendRouteIdToMapScreen,
}) => {
  // const [startPoint, setStartPoint] = useState("");
  // const [endPoint, setEndPoint] = useState ("");
  //   const [acceptingRoute, setAcceptingRoute] = useState(false); // Add this state

  const { distanceUnit, toggleDistanceUnit } = useDistanceUnit();
  console.log("User specified unit", distanceUnit);

  const convertToMiles = (distanceInKm) => {
    // Conversion factor: 1 kilometer = 0.621371 miles
    return (distanceInKm * 0.621371).toFixed(2);
  };

  const [totalDistance, setTotalDistance] = useState(0);
  const [routeId, setRouteId] = useState("");
  const [currentRouteData, setCurrentRouteData] = useState(routeData.route_summary);

  const { getToken, getUserId, getEmail } = useAuthDetails();
  const [token, setToken] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [pauseClicked, setPauseClicked] = useState(false);
  const [stopClicked, setStopClicked] = useState(false);

  const [startData, setStartData] = useState(region);
  const [endData, setEndData] = useState(region);

  // Add state to track location
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  // Start tracking live location and update states
  const startLocationTracking = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    // Start tracking the location
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation);
        setLocations((currentLocations) => [...currentLocations, newLocation]);
      }
    );
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // in meters
    return distance;
  };
    
  const calculateTotalDistance = () => {
    let totalDistance = 0;
    for (let i = 1; i < locations.length; i++) {
      const startCoords = locations[i - 1].coords;
      const endCoords = locations[i].coords;
      totalDistance += getDistance(
        startCoords.latitude,
        startCoords.longitude,
        endCoords.latitude,
        endCoords.longitude
      );
    }
    return totalDistance;
  };

  // Timer functions
  const startTimer = () => {
    if (!timerId) {
      const id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);

        // Update total distance every 10 seconds
        let distanceTravelled = calculateTotalDistance();
        distanceTravelled = distanceTravelled / 1000
        setTotalDistance(distanceTravelled);
        
      }, 1000);
      setTimerId(id);
      setTimerStarted(true);
      startLocationTracking();
    }
  };

  const pauseTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const ShareButton = () => {
    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log("Button pressed!");
    };

    return (
      <Pressable className="p-1" onPress={onPressFunction}>
        <FontAwesome name="share" size={25} color="black" />
      </Pressable>
    );
  };

  const BookmarkButton = () => {
    const onPressFunction = () => {
      // Define the action when the button is pressed
      console.log("Button pressed!");
    };

    return (
      <Pressable className="p-1" onPress={onPressFunction}>
        <FontAwesome name="bookmark" size={25} color="black" />
      </Pressable>
    );
  };

  const StartButton = () => {
    const handleButtonPress = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      startTimer();
      setTimerStarted(true);
    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#ccfbf1] rounded-full text-left h-16 w-16 justify-center">
          <Text className="text-[#334155]  text-center font-Poppins_Bold ">
            START
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchData = async () => {
    try {
      const tempRouteData = routeData.route_summary;
      const distanceTravelled = calculateTotalDistance() / 1000;
      tempRouteData.total_distance = distanceTravelled;
      tempRouteData.total_time = seconds;
      setCurrentRouteData(tempRouteData);

      AcceptRoute().then((routeIdData) => {
        setRouteId(routeIdData);
        console.log("set routeid:", routeIdData);
        sendDistanceToMapScreen(distanceTravelled);
        sendRouteIdToMapScreen(routeIdData);
        sendTimeToMapScreen(seconds);
        setStopClicked(true);
        onStopClick();        
      })
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const StopButton = () => {
    const handleButtonPress = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');

      pauseTimer();
      fetchData();
      
    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#fca5a5] rounded-full text-left h-16 w-16 justify-center">
          <Text className="text-[#334155] text-center font-Poppins_Bold ">
            STOP
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const PauseButton = () => {
    const handleButtonPress = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      pauseTimer();
      setPauseClicked(true);
    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#fde68a] rounded-full text-left h-16 w-16 justify-center">
          <Text className="text-[#334155]  text-center font-Poppins_Bold ">
            PAUSE
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ResumeButton = () => {
    const handleButtonPress = () => {
      // Define the action when the button is pressed
      // console.log('Button pressed!');
      startTimer();
      setPauseClicked(false);
    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#FFFFFF] rounded-full text-left h-16 w-16 justify-center">
          <Text className="text-[#334155]  text-center font-Poppins_Bold ">
            RESUME
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const AcceptRoute = async () => {
    try {
      const response = await fetch(BASE_URL + "/accept-route", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route_geometry: routeData.route_geometry,
          route_instructions: routeData.route_instructions,
          route_name: routeData.route_name,
          route_summary: routeData.route_summary,
          status: routeData.status,
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Output from Accept Route:", data);

      return data.route_id;
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Token:", token);
      setToken(token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Access and process the data here (data prop) as needed
      // You can perform checks or transformations on the data
      // and update the queriedData state as required
      const updatedData = region; // For simplicity, no change here
      setEndData(updatedData);
    }, 2000); // Set the interval duration (e.g., every 5 seconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [region]); 
  
  return (
    <View className="bg-[#2dd4bf] h-64 rounded-t-xl rounded-b-xl flex-col justify-start pl-4 pr-4">
      <View className=" flex-row justify-between bg-[#ccfbf1] rounded-t-xl rounded-b-xl mt-4 ">
        <View className="flex-col ">
          <View className="flex-row p-4">
            <FontAwesome name="map-marker" size={25} color="black" />

            <View className="flex-col pl-2">
              <Text className="text-sm font-Poppins_Bold">Start</Text>

              <Text className=" text-sm font-Poppins_Medium">
                {routeSummary.start_point}
              </Text>
            </View>
          </View>

          <View className="flex-row p-4">
            <FontAwesome name="map-marker" size={25} color="black" />

            <View className="flex-col pl-2">
              <Text className="text-sm font-Poppins_Bold">End</Text>
              <Text className=" text-sm font-Poppins_Medium">
                {routeSummary.end_point}
              </Text>
            </View>
          </View>
        </View>

        <View className=" flex-col justify-around">
          <View style={{ display: timerStarted ? "none" : "flex" }}>
            <Text className="text-3xl text-center font-Poppins_Bold">
            {distanceUnit === 'miles'
            ? `${convertToMiles(routeSummary.total_distance / 1000)} MI`
            : `${(routeSummary.total_distance / 1000).toFixed(2)} KM`}
            </Text>
          </View>

          <View style={{ display: timerStarted ? "flex" : "none" }}>
            <Text className="text-3xl text-center font-Poppins_Bold">
            {distanceUnit === 'miles'
            ? `${convertToMiles(totalDistance)} MI`
            : `${(totalDistance).toFixed(2)} KM`}
            </Text>
          </View>

          <View className="flex-row justify-around w-28">
            <FontAwesome name="hourglass" size={25} color="black" />

            <Text className="text-2xl font-Poppins_Regular">
              {formatTime(seconds)}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row  mt-5 items-center justify-between">
        <View style={{ display: timerStarted ? "none" : "flex" }}>
          <StartButton />
        </View>

        <View style={{ display: timerStarted ? "flex" : "none" }}>
          <View className="flex-row">
            <StopButton />

            <View className="ml-3">
              <View style={{ display: pauseClicked ? "none" : "flex" }}>
                <PauseButton />
              </View>

              <View style={{ display: pauseClicked ? "flex" : "none" }}>
                <ResumeButton />
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row">
          <ShareButton />
          <BookmarkButton />
        </View>
      </View>
    </View>
  );
};

export default StartPath;
