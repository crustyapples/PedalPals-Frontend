import React from 'react';
import { View, ScrollView } from 'react-native';
import PostCard from '@/src/app/components/PostCard';

// make a call to /posts/<user_id> to get all posts by user

const dummyData = [
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: 'thelegend27',
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
    time: '20m 14s',
    averageSpeed: 66.23,
    description: 'First cycle of the week!'
  },
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: 'doglover123',
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 13.51,
    time: '1h 20m',
    averageSpeed: 10.13,
    description: ''
  },
  {
    profilePic: require("@/src/assets/images/favicon.png"),
    username: 'thelegend27',
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
    time: '20m 14s',
    averageSpeed: 66.23,
    description: 'Second cycle of the week!'
  }
  // ... more dummy data
];

const HomePage: React.FC = () => {
  return (
    <ScrollView>
      {dummyData.map((cycle, index) => (
        <PostCard key={index} {...cycle} />
      ))}
    </ScrollView>
  );
};

export default HomePage;
