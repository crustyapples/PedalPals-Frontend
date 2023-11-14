import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";

type LeaderBoardEntryProps = {
  leadership_position: number;
  profilePic: any;
  name: string;
  points: number;
};

const colors = ["orange", "red", "blue", "green"];


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stringToIndex(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
  }
  return sum % 4;
}


const LeaderBoardEntry: React.FC<LeaderBoardEntryProps> = ({
  leadership_position,
  profilePic,
  name,
  points,
}) => {
  return (
    <View className="flex-row justify-between items-center px-4 py-1">
      <View className="flex-row items-center">
        <Text className="text-black font-bold text-base text-center w-8">
          {leadership_position}
        </Text>
        <View>
          {profilePic ? (
            <Image
              source={profilePic}
              className="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <View className={`w-6 h-6 rounded-full bg-${colors[stringToIndex(name)]}-300`} />
          )}
        </View>
        <Text className="ml-2 text-black font-medium text-base">{name}</Text>
      </View>

      <Text className="text-black font-medium text-base">{points.toFixed(0)}</Text>
    </View>
  );
};

export default LeaderBoardEntry;
