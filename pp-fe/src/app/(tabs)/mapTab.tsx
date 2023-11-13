import MapPage from '../screens/MapScreen';
import { Text, View } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";


export default function MapTab() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { start_coordinates, end_coordinates } = params;
  const [loadedStartCoordinates, setPreStartCoordinates] = useState(start_coordinates);
  const [loadedEndCoordinates, setPreEndCoordinates] = useState(end_coordinates);

  console.log("This is the start coordinates", loadedStartCoordinates);
  console.log("This is the end coordinates", loadedEndCoordinates);

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Maps Page goes here</Text>
    //   <Text className='font-bold text-lg'>Hello</Text>
    //   <View style={styles.separator}/>
    //   <EditScreenInfo path="app/(tabs)/mapTab.tsx" />
    // </View>

    <View>
      <MapPage 
        pre_start_coordinates={loadedStartCoordinates}
        pre_end_coordinates={loadedEndCoordinates}
      />
    </View>
  );
}
