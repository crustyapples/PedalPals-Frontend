import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";

type LeaderBoardEntryProps = {
    leadership_position: number;
    // profilePic: any;
    name: string;
    points: number;
};

const LeaderBoardEntry: React.FC<LeaderBoardEntryProps> = ({
    leadership_position,
    // profilePic,
    name,
    points,
}) => {
    return (
        <View className="flex-row justify-between items-center px-4 py-1">
            <View className="flex-row items-center">
                <Text className="text-black font-bold text-base text-center w-8">{leadership_position}</Text>
                <Image source = {require("@/src/assets/images/favicon.png")} className="rounded-full ml-2 w-8 h-8" />
                <Text className="ml-2 text-black font-medium text-base">{name}</Text>
            </View>

            <Text className="text-black font-medium text-base">{points}</Text>
        </View>
    );
};

export default LeaderBoardEntry;
