import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from 'react-native';
import Leaderboard from '../components/LeaderBoard';
import WeeklyChallengeRoute from '../components/WeeklyChallengeRoute';
import PostCard from './PostCard';

type UserPostsProps = {
    socialPostData: any
  };

const UserPosts: React.FC <UserPostsProps>= ({socialPostData}) => {

    return(
        <View className = "flex-col mt-3">
            <Text className = "font-Poppins_Bold text-2xl text-black">Your Posts</Text>
            <View>
                {socialPostData.map((cycle, index) => (
                <PostCard key={index} {...cycle} />
                ))}
            </View>
        </View>


        


    );


};

export default UserPosts;