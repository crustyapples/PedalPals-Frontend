import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image } from 'react-native';

type LeaderBoardEntryProps = {
    row_id: number;
    profilePic: any,
    username: string;
    points: number;
  };
  



const LeaderBoardEntry: React.FC<LeaderBoardEntryProps>= ({row_id, profilePic, username, points}) => {



    return(

        <View className = "flex-row justify-between items-center pt-4 pb-4 pl-5 pr-5 ">
            <View className = "flex-row ">
                <Text className = "text-black font-Poppins_Bold text-base">{row_id}</Text>
                <Image source = {profilePic} className="w-10 h-10 rounded-full"/>
                <Text className = " ml-4 text-black font-Poppins_Regular text-base">{username}</Text>
            </View>
                
            <Text className = "text-black font-Poppins_Medium text-base">{points}</Text>
        </View>

    );


};

export default LeaderBoardEntry;