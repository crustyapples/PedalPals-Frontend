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
  timestamp,
}) => {
  const { getToken, getUserId } = useAuthDetails();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes.length);
  const [numComments, setNumComments] = useState(comments.length);
  const [displayedComments, setDisplayedComments] = useState(comments);

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
                  <Text className="font-medium">{commentObj[2]}:</Text>
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
            <View className="w-8 h-8 rounded-full bg-gray-300" />
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
      <View className="bg-gray-200 w-full h-40 mt-2 rounded-lg mb-2" />

      <View className="flex flex-row justify-between text-sm m-2">
        <Text className="font-Poppins_Light text-sm text-gray-600">
          Distance
          <Text className="font-Poppins_Light text-sm font-bold">
            {` ${route.distance} km`}
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
            {` ${(route.distance / (route.time / 60)).toFixed(2)} km/h`}
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
        <View >
          <PostComment />
        </View>
        <View style={{ width: "25%" }} className="items-center">
          <Text className="font-Poppins_Light text-sm text-gray-600">
            {numComments} Comments
          </Text>
        </View>

      </View>
    </View>
  );
};

export default PostCard;
