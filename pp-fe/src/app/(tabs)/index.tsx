import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../../components/Themed';
import { Text, View } from 'react-native';
import { useAuthToken } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import HomePage from '../screens/HomeScreen';

export default function HomeTab() {
  const getToken = useAuthToken();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log('Token:', token);
      setToken(token);
      // Now you can use the token for API calls or other purposes
    };

    fetchToken();
  }, []);

  return (
    <View className='flex justify-center'>
      {/* <Text style={styles.title}>Home Page goes here</Text>
      <Text>Access Token: {token}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {/* <Text className='font-bold'>Access Token: {token}</Text> */}
      <HomePage />
    </View>
    

  );
}