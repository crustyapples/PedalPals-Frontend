import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList } from "react-native";
import RouteCard from "./RouteCard";

const dummyData = [
  {
    route_difficulty: "Hard",
    route_caption: "Week 13: Death by Finals",
    route_geometry: "wqyFkmzxRp@B^EMiBOs@S[k@m@u@Y{G_BcAc@mC{@oA]o@KSEaPcBkEi@_Ca@gBi@EDg@l@{@p@uArAO@S?MEWIwAu@_@Oo@[}@i@]AsBkAqCyAmBgAyAy@YQw@e@YSk@a@y@q@_@]i@g@oBuBsB`BqD|CaD|CIImB}A}BmBKI}CiCIIMM}@}@]_@c@c@{@_AkAuAmA_BsA_BGIIIaFwF_FqFTW",
    distance: 3.549,
    start_coordinates: "1.2830,103.8513",
    end_coordinates: "1.3073,103.8629",

  }
];

const WeeklyChallengeRoute: React.FC = () => {


  return (
    <View className="flex">
      <Text className="text-black font-Poppins_Bold text-2xl m-4 text-center">
        Weekly Challenge Routes
      </Text>

      <ScrollView>
      <View className="flex-row flex-wrap justify-center">
        {dummyData.map((route, index) => (
          <View key={index}>
            <RouteCard  {...route} />
          </View>
        ))}
      </View>

      </ScrollView>
    </View>
  );
};

export default WeeklyChallengeRoute;
