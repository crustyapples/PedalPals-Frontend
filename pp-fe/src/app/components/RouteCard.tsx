import { Text, View, Image } from "react-native";

type RouteCardProps = {
  routeName: any;
  mapImage: any;
  distance: number;
};

const RouteCard: React.FC<RouteCardProps> = ({ routeName, mapImage, distance }) => {
  return (
    <View className="flex-col items-center p-4 bg-white shadow-lg rounded-lg w-1/2 m-1">
      <Text className="text-center font-Poppins_Bold text-lg text-black mb-2">
        {routeName}
      </Text>

      <View className="flex-row items-center justify-center mb-3">
      <View className="bg-gray-200 w-full h-40 mt-2 rounded-lg mb-2" />
      </View>

      <View className="flex-col items-center">
        <Text className="font-Poppins_Light text-sm text-gray-600">Distance</Text>
        <Text className="font-Poppins_Medium text-md text-gray-800">
          {`${distance} km`}
        </Text>
      </View>
    </View>
  );
};

export default RouteCard;
