import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

const StartPath = ({
  routeSummary,
  onStopClick,
  sendDistanceToMapScreen,
  sendTimeToMapScreen,
  sendRouteIdToMapScreen,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);

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
  
  // Replace the calculateTotalDistance function with the following:
  
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

  // Button components
  const StartButton = () => (
    <TouchableOpacity onPress={startTimer}>
      <View>
        <Text>START</Text>
      </View>
    </TouchableOpacity>
  );

  const StopButton = () => (
    <TouchableOpacity
      onPress={async () => {
        pauseTimer();
        const distanceTravelled = calculateTotalDistance();
        sendDistanceToMapScreen(distanceTravelled);
        sendTimeToMapScreen(seconds);
        onStopClick();
        setLocations([]);
      }}
    >
      <View>
        <Text>STOP</Text>
      </View>
    </TouchableOpacity>
  );

  const PauseButton = () => (
    <TouchableOpacity onPress={pauseTimer}>
      <View>
        <Text>PAUSE</Text>
      </View>
    </TouchableOpacity>
  );

  // Formatting function for the timer
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  return (
    <View>
      <View>
        <Text>Start: {routeSummary.start_point}</Text>
        <Text>End: {routeSummary.end_point}</Text>
      </View>
      <View>
        <FontAwesome name="hourglass" size={25} color="black" />
        <Text>{formatTime(seconds)}</Text>
      </View>
      {!timerStarted ? (
        <StartButton />
      ) : (
        <>
          <StopButton />
          <PauseButton />
        </>
      )}
    </View>
  );
};

export default StartPath;