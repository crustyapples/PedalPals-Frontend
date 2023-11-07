import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "react-native";
import Leaderboard from "../components/LeaderBoard";
import WeeklyChallengeRoute from "../components/WeeklyChallengeRoute";
import PostCard from "./PostCard";

// "posts": [{"_id": "653f3832c1e6cdb9a69fba07", "caption": "Test Caption", "comments": [Array], "likes": 2, "route": "Placeholder RouteId", "timestamp": "Mon, 30 Oct 2023 12:59:30 GMT", "user": "6536308df0648db2a3aacff6"}, {"_id": "654743fee9d4ea5b6cf21723", "caption": "Hello everyone", "comments": [Array], "likes": 0, "route": "12334552523", "timestamp": "Sun, 05 Nov 2023 15:27:58 GMT", "user": "6536308df0648db2a3aacff6"}]}

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

type UserPostsProps = {
    socialPostData: Post[];
};

const UserPosts: React.FC<UserPostsProps> = ({ socialPostData }) => {
  return (
    <View className="flex-col mt-3">
      <Text className="font-Poppins_Bold text-2xl text-black">Your Posts</Text>
      <View>
        {socialPostData.map((cycle, index) => (
          <PostCard key={index} {...cycle} />
        ))}
      </View>
    </View>
  );
};

export default UserPosts;
