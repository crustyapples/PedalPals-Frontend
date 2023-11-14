import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthDetails } from "../contexts/AuthContext";
import Modal from "react-native-modal";
import polyline from "@mapbox/polyline";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { useDistanceUnit } from "../contexts/DistanceUnitContext";
import { Link } from "expo-router";

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type Route = {
  _id: string;
  distance: number;
  time: number;
  start_coordinates: string;
  end_coordinates: string;
  route_difficulty: string;
  route_geometry: string;
};

type Post = {
  _id: string;
  caption: string;
  comments: any;
  likes: any;
  route: Route;
  timestamp: string;
  user: string;
  user_id: string;
  avatar: any;
};

const PostCard: React.FC<Post> = ({
  _id,
  user,
  caption,
  route,
  comments,
  likes,
  avatar,
  user_id,
  timestamp,
}) => {
  const { getToken, getUserId } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes.length);
  const [numComments, setNumComments] = useState(comments.length);
  const [displayedComments, setDisplayedComments] = useState(comments);

  const { distanceUnit, toggleDistanceUnit } = useDistanceUnit();
  // console.log("User specified unit", distanceUnit);

  const convertToMiles = (distanceInKm) => {
    // Conversion factor: 1 kilometer = 0.621371 miles
    return (distanceInKm * 0.621371).toFixed(2);
  };

  const colors = ["orange", "red", "blue", "green"];

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function stringToIndex(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum % 4;
  }

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
    if (likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userId, likes]);

  const likePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/like-post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
      if (data.message === "Post liked successfully!") {
        console.log("Post liked!");
        return "Red";
      } else if (data.message === "Post disliked!") {
        console.log("Post unliked!");
        return "Black";
      }
    } catch (error) {
      console.error("Authentication error", error);
    }
  };

  const submitComment = async (typedComment) => {
    try {
      const response = await fetch(`${BASE_URL}/comment-post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: typedComment,
        }),
      });

      if (!response.ok) {
        console.error("Server responded with an error:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Authentication error", error);
    }
  };

  const LikeButton = () => {
    const onPressFunction = async () => {
      const action = await likePost();
      if (action === "Red") {
        setLiked(true);
        setNumLikes(numLikes + 1);
      } else if (action === "Black") {
        setLiked(false);
        setNumLikes(numLikes - 1);
      }
    };

    return (
      <Pressable className="p-1" onPress={onPressFunction}>
        <FontAwesome
          name="heart"
          size={25}
          color={liked ? "red" : "rgba(0, 0, 0, 0.2)"}
        />
      </Pressable>
    );
  };

  const PostComment = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState("");

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const handleComment = () => {
      console.log("Comment:", comment);
      submitComment(comment);
      setNumComments(numComments + 1);
      setDisplayedComments([...displayedComments, [userId, comment]]);
    };

    return (
      <View>
        <Pressable className="p-1" onPress={toggleModal}>
          <FontAwesome name="comment" size={25} color="rgba(0, 0, 0, 0.2)" />
        </Pressable>

        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          swipeDirection={["down"]}
          style={{ justifyContent: "flex-end", margin: 0 }}
          onBackdropPress={toggleModal}
        >
          <View className="bg-white p-4 rounded-t-xl">
            <Text className="text-lg font-semibold mb-3">Comments</Text>

            <ScrollView className="mb-3">
              {displayedComments.map((commentObj, index) => (
                <View key={index} className="p-2 border-b">
                  <Text className="font-medium">{commentObj[0]}:</Text>
                  <Text className="text-sm">{commentObj[1]}</Text>
                </View>
              ))}
            </ScrollView>

            <View className="flex-row items-center">
              <TextInput
                className="flex-1 rounded-lg border p-2 mr-2"
                placeholder="Type your comment"
                onChangeText={(text) => setComment(text)}
              />

              <TouchableOpacity
                onPress={handleComment}
                className="bg-blue-500 rounded-lg p-2"
              >
                <Text className="text-white">Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const routeCoordinates = polyline
    .decode(route.route_geometry)
    .map((coordinate) => ({
      latitude: coordinate[0],
      longitude: coordinate[1],
    }));

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
    const longitudes = routeCoordinates.map(
      (coordinate) => coordinate.longitude
    );

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

  const ShowMap = () => {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        // style={{ flex: 1 }}
        className="w-full h-40 rounded-lg"
        region={{
          ...region,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
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
          strokeColors={["#7F0000"]}
          strokeWidth={3}
        />
      </MapView>
    );
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md m-2">
      <View className="flex flex-row items-center mb-2">
        <View className="mb-3">
          {avatar ? (
            <Image
              source={avatar}
              className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <Pressable className="mt-2">
            <Link
              href={{
                pathname: "/screens/FriendScreen",
                params: {
                  userId: user_id,
                  token: token,
                },
              }}
            >
            <View className={`w-8 h-8 rounded-full bg-${colors[stringToIndex(user)]}-300`} />
            </Link>
          </Pressable>
          )}
        </View>
        <View className="ml-2 mb-2">
          <Text className="font-semibold">{user}</Text>
        </View>
      </View>
      <Text className="ml-2 mb-2 font-Poppins_Light font-bold text-xl">
        {caption}
      </Text>

      {/* Replace the below view with an image if available */}
      {/* <View className="bg-gray-200 w-full h-40 mt-2 rounded-lg mb-2" /> */}
      <View className="mt-2 mb-2">
        <ShowMap />
      </View>

      <View className="flex flex-row justify-between text-sm m-2">
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Distance
          <Text className="font-Poppins_Light text-sm font-bold">
            {distanceUnit === "miles"
              ? ` ${convertToMiles(route.distance)} mi`
              : ` ${route.distance.toFixed(2)} km`}
          </Text>
        </Text>
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Time
          <Text className="font-Poppins_Light text-sm font-bold">
            {` ${route.time} min`}
          </Text>
        </Text>
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Speed
          <Text className="font-Poppins_Light text-sm font-bold">
            {distanceUnit === "miles"
              ? ` ${convertToMiles(route.distance / (route.time / 60))} mph`
              : ` ${(route.distance / (route.time / 60)).toFixed(2)} km/h`}
          </Text>
        </Text>
        {/* <Text>Distance: {route.distance} km</Text> */}
        {/* <Text>Time: {route.time} min</Text>
        <Text>
          Speed: {(route.distance / (route.time / 60)).toFixed(2)} km/h
        </Text> */}
      </View>

      <View className="flex-row items-center justify-start">
        <View>
          <LikeButton />
        </View>
        <View style={{ width: "15%" }} className="items-center">
          <Text className="font-Poppins_Light text-sm text-gray-600">
            {numLikes} Likes
          </Text>
        </View>
        <View>
          <PostComment />
        </View>
        <View className="items-center">
          <Text className="font-Poppins_Light text-sm text-gray-600">
            {numComments} Comments
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
