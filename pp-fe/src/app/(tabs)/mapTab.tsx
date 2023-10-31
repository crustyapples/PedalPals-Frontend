import { StyleSheet } from 'react-native';
import MapPage from '../screens/MapScreen';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';





export default function MapTab() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Maps Page goes here</Text>
    //   <Text className='font-bold text-lg'>Hello</Text>
    //   <View style={styles.separator}/>
    //   <EditScreenInfo path="app/(tabs)/mapTab.tsx" />
    // </View>

    <View>
      <MapPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
