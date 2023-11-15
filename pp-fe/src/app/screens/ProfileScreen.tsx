import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Alert,Text } from 'react-native';
import UserDetails from '../components/UserDetails';
import UserStats from '../components/UserStats';
import UserPosts from '../components/UserPosts';
import { useAuthDetails } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';


const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  telegram: string;
  instagram: string;
  friends_list: any;
  posts: any;
  analytics: any;
  gamification: any;
};



const ProfilePage: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Profile" });
  }, [navigation]);


  const { getToken, getUserId } = useAuthDetails();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);


  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

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
    if (token && userId) {
      fetchUserData();
    }
  }, [token, userId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  const badgeCounts = userData ? countBadges(userData.gamification.badges) : { bronze: 0, silver: 0, gold: 0 };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
            token={token}
            userId={userId}

          />
          <UserStats
            totalDistanceTravelled={userData.analytics.total_distance}
            averageSpeed={userData.analytics.avg_speed}
          />
                          <Text className="font-Poppins_Bold text-3xl text-black text-center mt-8">Posts</Text>

          <UserPosts socialPostData={userData.posts.reverse()} />
        </>
      )}
    </ScrollView>
  );
};

export default ProfilePage;

function countBadges(badges) {
  const badgeCount = { bronze: 0, silver: 0, gold: 0 };
  badges.forEach((badge) => {
    if (badgeCount.hasOwnProperty(badge)) {
      badgeCount[badge]++;
    }
  });
  return badgeCount;
}
