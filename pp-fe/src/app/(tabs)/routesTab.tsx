import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View, ScrollView, FlatList } from 'react-native';
import RoutePage from '../screens/RouteScreen';

export default function RoutesTab() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Routes Page goes here</Text>
    //   <View style={styles.separator}  />
    //   <EditScreenInfo path="app/(tabs)/routesTab.tsx" />
    // </View>

    <View>
      <RoutePage />
    </View>
  );
}

