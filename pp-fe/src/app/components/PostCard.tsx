import React from 'react';
import { View, Text, Image } from 'react-native';
// import { View, Text } from './Themed';

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

const PostCard: React.FC<Post> = ({ user, caption, route, comments, likes, timestamp }) => {
  console.log(route)
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
    </View>
  );
};

export default PostCard;
