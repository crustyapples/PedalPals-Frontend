import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from 'react-native';
import Leaderboard from '../components/LeaderBoard';
import WeeklyChallengeRoute from '../components/WeeklyChallengeRoute';

type UserStatsProps = {
    totalDistanceTravelled: number,
    averageSpeed: number
  };


const UserStats: React.FC<UserStatsProps>= ({totalDistanceTravelled, averageSpeed}) => {

    return(
        <View className = "flex-col mt-3">
            <Text className = "font-Poppins_Bold text-2xl text-black">Your Stats</Text>
            <View className = "flex-col pl-3">
                <View>
                    <Text className = "font-Poppins_Light">Total Distance Travelled</Text>
                    <View className = "flex-row">
                        <Text className = "font-Poppins_Medium text-2xl text-black">{totalDistanceTravelled}</Text>
                        <Text className = "font-Poppins_Medium text-2xl text-black"> km</Text>
                    </View>
                </View>

                <View>
                    <Text className = "font-Poppins_Light">Average Speed</Text>
                    <View className = "flex-row">
                        <Text className = "font-Poppins_Medium text-2xl text-black">{averageSpeed}</Text>
                        <Text className = "font-Poppins_Medium text-2xl text-black"> km/h</Text>
                    </View>
                </View>

            </View>
        </View>



    );


};

export default UserStats;