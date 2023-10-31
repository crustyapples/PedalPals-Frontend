import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
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
