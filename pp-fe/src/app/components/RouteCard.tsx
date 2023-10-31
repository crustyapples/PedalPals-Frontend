import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, Image } from "react-native";

type RouteCardProps = {
  routeName: any;
  mapImage: any;
  distance: number;
};

const RouteCard: React.FC<RouteCardProps> = ({
  routeName,
  mapImage,
  distance,
}) => {
  return (
    <View className="flex-col p-4 bg-white shadow-md rounded-lg w-1/2 m-1">
      <Text className="text-center font-Poppins_Bold text-black">
        {routeName}
      </Text>

      <View className="flex-row  items-center justify-center mt-1">
        <Image
          source={mapImage}
          className="h-16 w-32 rounded-t-2xl rounded-b-2xl"
        />
      </View>

      <View className="flex-col">
        <Text className="font-Poppins_Light">Distance</Text>
        <Text className="font-Poppins_Medium">{distance}</Text>
      </View>
    </View>
  );
};

export default RouteCard;
