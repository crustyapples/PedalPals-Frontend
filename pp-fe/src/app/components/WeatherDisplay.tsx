import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

type WeatherDisplayProps = {
  routeData: any;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ routeData }) => {
  return (
    <View className="bg-white w-48 h-32 rounded-xl flex shadow-md p-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-col items-start">
          <Text className="text-lg font-bold">1-hr PM 2.5:</Text>
          <Text className="text-lg">{routeData.weather.PM25} µ/m3</Text>
        </View>
      </View>
      <View className="mt-2 flex-col items-start">
        <Text className="text-lg">{routeData.weather.weather.forecast} at</Text>
        <Text className="text-lg font-semibold">{routeData.weather.weather.area}</Text>
      </View>
    </View>
  );
};

export default WeatherDisplay;
