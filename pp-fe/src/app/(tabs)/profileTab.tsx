
import { Text, View } from 'react-native';

import ProfilePage from '../screens/ProfileScreen';

export default function HomeTab() {


  return (
    <View className='flex justify-center'>
      {/* <Text style={styles.title}>Home Page goes here</Text>
      <Text>Access Token: {token}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {/* <Text className='font-bold'>Access Token: {token}</Text> */}
      <ProfilePage />
    </View>
    

  );
}