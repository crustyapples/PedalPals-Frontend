import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ScrollView} from 'react-native';
// import { View, Text } from './Themed';
import { FontAwesome } from "@expo/vector-icons";
import { useAuthDetails } from "../contexts/AuthContext";
import Modal from "react-native-modal";

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
  likes: number;
  route: Route;
  timestamp: string;
  user: string;
}

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const PostCard: React.FC<Post> = ({  _id, user, caption, route, comments, likes, timestamp }) => {
  console.log(route);

  const {getToken, getEmail, getUserId} = useAuthDetails();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");  

  
  const likePost = async () => {
    try {
      const response = await fetch(BASE_URL + `/like-post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
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

  const submitComment = async (typedComment) => {
    try {
      const response = await fetch(BASE_URL + `/comment-post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },

        body: JSON.stringify({
          "comment": typedComment
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

    const [red, setRed] = useState(false);

    const onPressFunction = () => {

      console.log("Button pressed!");
      likePost();
      setRed(true);
    };

    return (
      <Pressable className="p-1" onPress={onPressFunction}>
        <FontAwesome name="heart" size={25} color={red ? "red" : "rgba(0, 0, 0, 0.2)"} />
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
      
  
      // toggleModal();
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
          <View className = " bg-white justify-center rounded-lg h-48">
            <Text className = "text-lg">Comments</Text>

            <ScrollView>
              {comments.map((commentObj, index) => (
                <View key={index}>
                  {/* <Text>{commentObj[0]}</Text> */}
                  <Text>{commentObj[1]}</Text>
                </View>
              ))}
            </ScrollView>

            <View className = "flex-row">
              <TextInput
                className = "rounded-lg w-64 border"
                placeholder="Type your comment"
                onChangeText={(text) => setComment(text)}
              />

              <TouchableOpacity onPress={handleComment}>
                <Text>Post</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        </View>
    );
  };


  useEffect(() => {
    const fetchDetails = async () => {
      const token = await getToken();
      const user_id = await getUserId();
      const email = await getEmail();

      console.log('Token:', token);
      console.log('User ID:', user_id);
      console.log('Email:', email);

      setToken(token);
      setUserId(user_id);
      setEmail(email);
    };

    fetchDetails();
  }, []);

  return (
    <View className="bg-white p-4 rounded-lg shadow-md m-2">

      <View className="flex flex-row items-center">
        {/* <Image source={profilePic} className="w-10 h-10 rounded-full" /> */}
        <Image source={require("@/src/assets/images/favicon.png")} className="w-10 h-10 rounded-full" />
        
        <Text className="ml-2">{user}</Text>
      </View>
      {/* <Image source={mapImage} className="w-full h-40 mt-2 rounded-lg" /> */}
      <View className="flex flex-row mt-2">
        <View className="flex-1">
          <Text>Distance Travelled</Text>
          <Text>{route.distance} km</Text>

        </View>
        <View className="flex-1">
          <Text>Time Taken</Text>
          <Text>{route.time}</Text>

        </View>
        <View className="flex-1">
          <Text>Average Speed</Text>
          <Text>{route.distance / route.time} km/h</Text>

        </View>
      </View>
      <Text className="mt-2">{caption}</Text>

      <View className = "flex-row mt-4">
        <View className = "flex-1 justify-center  items-center">
          <LikeButton />
        </View>
        <View className = "flex-1 justify-center  items-center">
          <PostComment />
        </View>

      </View>
    </View>
  );
};

export default PostCard;
