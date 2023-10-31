import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';

export default function ChallengesTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Challenges Page goes here</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="app/(tabs)/challengesTab.tsx" />
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
