import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList } from "react-native";
import RouteCard from "../components/RouteCard";

const dummyData = [
  {
    id: 1,
    routeName: "Ring of Fire",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
  },
  {
    id: 2,
    routeName: "Cyclone",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 13.51,
  },
  {
    id: 3,
    routeName: "Tsunami",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 16.81,
  },
  {
    id: 1,
    routeName: "Ring of Fire",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
  },
  {
    id: 2,
    routeName: "Cyclone",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 13.51,
  },
  {
    id: 3,
    routeName: "Tsunami",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 16.81,
  },
  {
    id: 3,
    routeName: "Tsunami",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 16.81,
  },
  {
    id: 1,
    routeName: "Ring of Fire",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 22.34,
  },
  {
    id: 2,
    routeName: "Cyclone",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 13.51,
  },
  {
    id: 3,
    routeName: "Tsunami",
    mapImage: require("@/src/assets/images/favicon.png"),
    distance: 16.81,
  },
  // ... more dummy data
];

const RoutePage: React.FC = () => {
  const renderItem = ({ item }) => (
    <RouteCard
      routeName={item.routeName}
      mapImage={item.mapImage}
      distance={item.distance}
    ></RouteCard>
  );

  return (
    <View className="flex items-center mt-5">


      {
        Array.from({ length: Math.ceil(dummyData.length / 2) }).map(
          (_, index) => (
            <View key={index} className="flex-row justify-between mx-4">
              <RouteCard
                routeName={dummyData[index * 2].routeName}
                mapImage={dummyData[index * 2].mapImage}
                distance={dummyData[index * 2].distance}
              />
              {dummyData[index * 2 + 1] && (
                <RouteCard
                  routeName={dummyData[index * 2 + 1].routeName}
                  mapImage={dummyData[index * 2 + 1].mapImage}
                  distance={dummyData[index * 2 + 1].distance}
                />
              )}
            </View>
          )
        )
      }

    </View>
  );
};

export default RoutePage;
