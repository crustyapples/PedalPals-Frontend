import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, Image } from 'react-native';
import Leaderboard from '../components/LeaderBoard';
import WeeklyChallengeRoute from '../components/WeeklyChallengeRoute';


type UserDetailsProps = {
    profilePic: any,
    username: string,
    numOfPals: number,
  teleHandle: string,
  instaHandle: string,
  numOfReward1: number,
  numOfReward2: number,
  numOfReward3: number,
  };


const UserDetails: React.FC<UserDetailsProps>= ({profilePic, username, numOfPals, teleHandle, instaHandle, numOfReward1, numOfReward2, numOfReward3}) => {

    return(
        <View>
            <View className = "flex-row justify-center">
                            <Image className = "rounded-full h-40 w-40" source={profilePic} />
                        </View>

                        <View className = "flex-row justify-center items-center mt-3">
                            <Text className = "font-Poppins_Bold text-3xl text-black text-center ">{username}</Text>
                            <View className = "absolute right-10">
                                <Image className = "h-8 w-8" source={require("@/src/assets/images/edit-icon.png")} />
                            </View>
            
                        </View>   
                            

                        <View className = "flex-row justify-center items-center mt-3">
                            <Text className = "font-Poppins_Bold rounded-t-xl rounded-b-xl pl-4 pr-4 pt-2 pb-2 border text-center">{numOfPals} Pals</Text>
                        </View>

                        <View className = "flex-row justify-center mt-3">
                            <View className = "flex-row">
                                <View className = "flex-row items-center justify-center ">
                                        <Image className = "h-8 w-8" source={require("@/src/assets/images/tele-icon.png")} />
                                        <Text className = "ml-1 font-Poppins_Regular">@{teleHandle}</Text>
                                </View>

                                <View className = "flex-row items-center justify-center  ml-3">
                                        <Image className = "h-8 w-8" source={require("@/src/assets/images/insta-icon.png")} />
                                        <Text className = "ml-1 font-Poppins_Regular">{instaHandle}</Text>
                                </View>
                            </View>
                        </View>



                        <View className = "flex-row justify-center mt-3">
                            <View className = "flex-row">
                                <View className = "flex-row items-center justify-center ">
                                        <Image className = "h-12 w-12" source={require("@/src/assets/images/certificate-icon.png")} />
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#B89130]">x</Text>
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#B89130]">{numOfReward1}</Text>
                                </View>

                                <View className = "flex-row items-center justify-center  ml-3">
                                        <Image className = "h-12 w-12" source={require("@/src/assets/images/badge-icon.png")} />
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#163760]">x</Text>
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#163760]">{numOfReward2}</Text>
                                </View>

                                <View className = "flex-row items-center justify-center  ml-3">
                                        <Image className = "h-12 w-12" source={require("@/src/assets/images/fire-icon.png")} />
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#F0870F]">x</Text>
                                        <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#F0870F]">{numOfReward3}</Text>
                                </View>
                            </View>
                        </View>
        </View>
    


    );


};

export default UserDetails;