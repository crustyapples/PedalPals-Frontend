import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "react-native";
import Leaderboard from "../components/LeaderBoard";
import WeeklyChallengeRoute from "../components/WeeklyChallengeRoute";

type UserStatsProps = {
  totalDistanceTravelled: number;
  averageSpeed: number;
};



const UserStats: React.FC<UserStatsProps> = ({
  totalDistanceTravelled,
  averageSpeed,
}) => {
  return (
    <View className="flex-col mt-4 p-4 bg-white rounded-lg shadow mx-2">
      <Text className="font-Poppins_Bold text-2xl text-black mb-2">Your Stats</Text>

      <View className="flex-col">
        <View className="mb-3">
          <Text className="font-Poppins_Light text-lg text-gray-600">Total Distance Travelled</Text>
          <Text className="font-Poppins_Medium text-2xl text-black">
            {totalDistanceTravelled} km
          </Text>
        </View>

        <View>
          <Text className="font-Poppins_Light text-lg text-gray-600">Average Speed</Text>
          <Text className="font-Poppins_Medium text-2xl text-black">
            {averageSpeed} km/h
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserStats;
