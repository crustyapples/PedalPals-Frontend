import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "react-native";
import Leaderboard from "../components/LeaderBoard";
import WeeklyChallengeRoute from "../components/WeeklyChallengeRoute";

const ChallengesPage: React.FC = () => {
  return (
    <View>
      <Leaderboard />
      <WeeklyChallengeRoute />
    </View>
  );
};

export default ChallengesPage;
