import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Pressable,
  Image,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import MapButtons from "../components/MapButtons";
import RouteInfoPlanning from "../components/RouteInfoPlanning";
import MapViewComponent from "../components/MapViewComponent";
import polyline from "@mapbox/polyline";
import StartPath from "../components/StartPath";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RoutePosting from "../components/RoutePosting";
import WeatherDisplay from "../components/WeatherDisplay";
import { useIsFocused } from "@react-navigation/native";

// define MapPageProps
type MapPageProps = {
  pre_start_coordinates?: any;
  pre_end_coordinates?: any;
};

const MapPage: React.FC<MapPageProps> = ({pre_start_coordinates,pre_end_coordinates}) => {
  const [routePlanned, setRoutePlanned] = useState(false);
  const [dataReceived, setDataReceived] = useState(false);
  const [routeSummary, setRouteSummary] = useState("");
  const [routeData, setRouteData] = useState();
  const [rG, setRG] = useState("");
  const [routeStopped, setRouteStopped] = useState(false);
  const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(true);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [routeId, setRouteId] = useState("");
  // State to manage the active/inactive status of the RouteInfoPlanning
  const [routeInfoActive, setRouteInfoActive] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [routePoints, setRoutePoints] = useState([]);
  const[showBicycleRacks, setShowBicycleRacks] = useState(false);
  const[showWaterPoint, setShowWaterPoint] = useState(false);
  const [loadedStartCoordinates, setPreStartCoordinates] = useState(pre_start_coordinates);
  const [loadedEndCoordinates, setPreEndCoordinates] = useState(pre_end_coordinates);

  console.log("This is the start coordinates", loadedStartCoordinates);
  console.log("This is the end coordinates", loadedEndCoordinates);

  const isFocused = useIsFocused();

  useEffect(() => {
    setPreEndCoordinates(pre_end_coordinates);
    setPreStartCoordinates(pre_start_coordinates);
  }, [isFocused]);

  const postSetPlanned = (state) => {
    setRoutePlanned(state);
  }

  const postSetStopped = (state) => {
    setRouteStopped(state);
  }

  // Set up an Animated.Value for the X position
  const routeInfoAnim = useRef(new Animated.Value(0)).current; // start fully visible

  // Function to toggle the RouteInfoPlanning visibility
  const toggleRouteInfo = () => {
    // Animate the view based on isRouteInfoVisible
    Animated.timing(routeInfoAnim, {
      toValue: isRouteInfoVisible ? -Dimensions.get("window").width : 0, // or any other value depending on your UI
      duration: 300, // duration of the slide animation
      useNativeDriver: true,
    }).start();

    // After starting the animation, set the visibility to the opposite
    setIsRouteInfoVisible(!isRouteInfoVisible);
  };

  const handlePlanStartRoute = () => {
    setRoutePlanned(true);
  };

  const handleBackButton = () => {
    setRoutePlanned(false);
    setDataReceived(false);
    setShowBicycleRacks(false);
    setPreStartCoordinates("");
    setPreEndCoordinates("");
    setShowWaterPoint(false);
  };

  const handleBicycleRackButton = () => {
    setShowBicycleRacks((prevShowBicycleRacks) => !prevShowBicycleRacks);

  };

  const handleWaterPointButton = () => {
    setShowWaterPoint((prevShowWaterPoint) => !prevShowWaterPoint);

  };

  const handleStopRoute = () => {
    setRouteStopped(true);
  };

  const [region, setRegion] = useState(null);

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const processDataFromParent1 = (data) => {
    console.log("Data Received in Parent 2:", data);
    if (data && data.route_geometry && data.route_summary) {
      setRouteData(data);
      console.log("This is route data from parent 1", routeData);
      setRG(data.route_geometry);
      setRouteSummary(data.route_summary);
      setRoutePoints(data.route_points);
      setDataReceived(true);
      const decodedCoordinates = polyline
        .decode(data.route_geometry)
        .map((coordinate) => ({
          latitude: coordinate[0],
          longitude: coordinate[1],
        }));

      setRouteCoordinates(decodedCoordinates);
    }
    // const decodedCoordinatesRg = polyline.decode(rG).map(coordinate => ({
    //   latitude: coordinate[0],
    //   longitude: coordinate[1],
    // }));
    // setRouteCoordinates(decodedCoordinatesRg);
  };

  console.log("This is the route summary", routeSummary);

  // console.log("This is route data from parent 1", routeData);

  // console.log("This is the route Id from StartPath", routeId)
  const processDistanceFromStartPath = (distance) => {
    console.log("Distance Travelled:", distance);
    setDistanceTravelled(distance);
  };

  const processTimeFromStartPath = (time) => {
    console.log("Time taken:", time);
    setTimeTaken(time);
  };

  const processRouteIdFromStartPath = (routeId) => {
    setRouteId(routeId);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitude: 1.3492,
        // longitude: 103.6845,
      });
    })();
  }, []);

  if (!region) {
    return <View></View>;
  }

  return (
    <View className="h-screen">
      {routeStopped ? (
        <View>
          <RoutePosting
            distance={distanceTravelled}
            time={timeTaken}
            routeData={routeData}
            routeId={routeId}
            routeCoordinates = {routeCoordinates}
            setRoutePlanned={postSetPlanned}
            setRouteStopped={postSetStopped}
          />
        </View>
      ) : (
        <View className="h-screen">
          <MapViewComponent
            region={region}
            routeCoordinates={routeCoordinates}
            routePoints={routePoints}
            showBicycleRacks = {showBicycleRacks}
            showWaterPoint = {showWaterPoint}
            routePlanned = {routePlanned}

          />

          <View className="absolute top-0 left-0">
            <MapButtons onBackClick={handleBackButton} 
            onBicycleRackClick = {handleBicycleRackButton} 
            onWaterPointClick = {handleWaterPointButton}/>
          </View>

          <Animated.View
            style={{
              transform: [{ translateX: routeInfoAnim }],
              position: "absolute",
              bottom: 180, // Adjust based on where you want the view to appear
              left: 0,
              right: 0,
            }}
          >
            {routePlanned && dataReceived ? (
              <View>
                <View className = "bottom-64 inset-x-48">
                  <WeatherDisplay routeData = {routeData} />
                </View>
                

                <StartPath
                  routeSummary={routeSummary}
                  region={region}
                  onStopClick={handleStopRoute}
                  sendDistanceToMapScreen={processDistanceFromStartPath}
                  sendTimeToMapScreen={processTimeFromStartPath}
                  routeData={routeData}
                  sendRouteIdToMapScreen={processRouteIdFromStartPath}
                />
                
              </View>
            ) : (
              <RouteInfoPlanning
                pre_start_coordinates={loadedStartCoordinates}
                pre_end_coordinates={loadedEndCoordinates}
                onStartClick={handlePlanStartRoute}
                sendDataToParent2={processDataFromParent1}
              />
            )}
          </Animated.View>

          <Pressable
            onPress={toggleRouteInfo}
            style={{
              position: "absolute",
              left: 15,
              bottom: 420, // Adjust as necessary
            }}
          >
            {isRouteInfoVisible ? (
              <Image
                className="h-8 w-8"
                source={require("@/src/assets/images/hide.png")}
              />
            ) : (
              <Image
                className="h-8 w-8"
                source={require("@/src/assets/images/show.png")}
              />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MapPage;
