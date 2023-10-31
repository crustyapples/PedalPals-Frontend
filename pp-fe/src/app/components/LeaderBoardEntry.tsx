import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";

type LeaderBoardEntryProps = {
    row_id: number;
    profilePic: any;
    username: string;
    points: number;
};

const LeaderBoardEntry: React.FC<LeaderBoardEntryProps> = ({
    row_id,
    profilePic,
    username,
    points,
}) => {
    return (
        <View className="flex-row justify-between items-center px-4 py-1">
            <View className="flex-row items-center">
                <Text className="text-black font-bold text-base">{row_id}</Text>
                <Image source={profilePic} className="rounded-full ml-2 w-8 h-8" />
                <Text className="ml-2 text-black font-medium text-base">{username}</Text>
            </View>

            <Text className="text-black font-medium text-base">{points}</Text>
        </View>
    );
};

export default LeaderBoardEntry;
