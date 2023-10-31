import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView } from "react-native";
import LeaderBoardEntry from "./LeaderBoardEntry";

const dummyData = [
  {
    row_id: 1,
    username: "thelegend27",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 2000,
  },
  {
    row_id: 2,
    username: "thedoglover",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 1500,
  },
  {
    row_id: 3,
    username: "thecatlover",
    profilePic: require("@/src/assets/images/favicon.png"),
    points: 1200,
  },
  // ... more dummy data
];

const LeaderBoard: React.FC = () => {
  return (
    <View>
      <View>
        <Text className="text-black font-Poppins_Bold text-2xl text-center my-2">
          Leaderboard
        </Text>

        <View className="h-64 bg-[#C8E5E5] rounded-lg border mx-4">
          <ScrollView>
            {dummyData.map((cycle, index) => (
              <LeaderBoardEntry key={index} {...cycle} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default LeaderBoard;
