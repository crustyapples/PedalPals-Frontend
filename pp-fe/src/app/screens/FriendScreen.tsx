import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Text } from 'react-native';
import UserDetails from '../components/UserDetails';
import UserStats from '../components/UserStats';
import UserPosts from '../components/UserPosts';
import { useAuthDetails } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  telegram: string;
  instagram: string;
  friends_list: any;
  posts: any;
  analytics: any;
  gamification: any;
};



const FriendPage: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { userId, token } = useLocalSearchParams();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchUserData();
    }
  }, [token, userId]);


  const navigation = useNavigation();
  

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Profile" });
  }, [navigation]);

  const badgeCounts = userData ? countBadges(userData.gamification.badges) : { bronze: 0, silver: 0, gold: 0 };

  return (
    <ScrollView

    >
      {userData && (
        <>
          <UserDetails
            username={userData.username}
            name={userData.name}
            numOfPals={userData.friends_list.length}
            teleHandle={userData.telegram || "@thelegend27"}
            instaHandle={userData.instagram || "@thelegend27"}
            numOfReward1={badgeCounts.bronze}
            numOfReward2={badgeCounts.silver}
            numOfReward3={badgeCounts.gold}
            friendView={true}


          />
          <UserStats
            totalDistanceTravelled={userData.analytics.total_distance}
            averageSpeed={userData.analytics.avg_speed}
          />
                <Text className="font-Poppins_Bold text-3xl text-black text-center mt-8">Posts</Text>

          <UserPosts socialPostData={userData.posts} />
        </>
      )}
    </ScrollView>
  );
};

export default FriendPage;

function countBadges(badges) {
  const badgeCount = { bronze: 0, silver: 0, gold: 0 };
  badges.forEach((badge) => {
    if (badgeCount.hasOwnProperty(badge)) {
      badgeCount[badge]++;
    }
  });
  return badgeCount;
}
