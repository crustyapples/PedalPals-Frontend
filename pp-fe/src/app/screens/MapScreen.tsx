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

const MapPage: React.FC = () => {
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

  const postSetPlanned = (state) => {
    setRoutePlanned(state);
  }

  const postSetStopped = (state) => {
    setRouteStopped(state);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        // Adjust the offset calculation as needed for your UI
        let offset = e.endCoordinates.height;
        setKeyboardOffset(offset);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOffset(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Position of RouteInfoPlanning
  const routeInfoPosAnim = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current; // start off-screen

  // Function to activate the RouteInfoPlanning and animate its position
  const activateRouteInfo = () => {
    setRouteInfoActive(true);

    Animated.timing(routeInfoPosAnim, {
      toValue: Dimensions.get("window").height / 2, // Moves to the middle of the screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
            setRoutePlanned={postSetPlanned}
            setRouteStopped={postSetStopped}
          />
        </View>
      ) : (
        <View className="h-screen">
          <MapViewComponent
            region={region}
            routeCoordinates={routeCoordinates}
          />

          <View className="absolute top-0 left-0">
            <MapButtons onBackClick={handleBackButton} />
          </View>

          <Animated.View
            style={{
              transform: [{ translateY: -keyboardOffset }],
              position: "absolute",
              bottom: 180, // Adjust based on where you want the view to appear
              left: 0,
              right: 0,
            }}
          >
            {routePlanned && dataReceived ? (
              <StartPath
                routeSummary={routeSummary}
                region={region}
                onStopClick={handleStopRoute}
                sendDistanceToMapScreen={processDistanceFromStartPath}
                sendTimeToMapScreen={processTimeFromStartPath}
                routeData={routeData}
                sendRouteIdToMapScreen={processRouteIdFromStartPath}
              />
            ) : (
              <RouteInfoPlanning
                onStartClick={handlePlanStartRoute}
                sendDataToParent2={processDataFromParent1}
              />
            )}
          </Animated.View>

          <Pressable
            onPress={toggleRouteInfo}
            style={{
              position: "absolute",
              left: 25,
              bottom: 450, // Adjust as necessary
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
