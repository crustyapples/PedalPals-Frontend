import { StyleSheet } from 'react-native';
import NearbyPage from '../screens/NearbyScreen';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from 'react-native';

export default function NearbyTab() {
  return (
    <View >
      {/* <Text style={styles.title}>Nearby Page goes here</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/nearbyTab.tsx" /> */}
      <NearbyPage />
    </View>
  );
}
