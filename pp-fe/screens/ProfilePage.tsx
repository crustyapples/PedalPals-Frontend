import React, {useState} from "react";
import {Text, StyleSheet, Image, View, TextInput, ImageBackground, Button, TouchableOpacity, ScrollView, FlatList} from "react-native";
import TopNavBar from "../components/TopNavBar";
import SocialPost from "../components/SocialPost";




const ProfilePage = () => {
    const SOCIAL_POST_DATA = [
        {
          id: 1,
          username: "iLoveCycling",
          distance: "22.34 km",
          time: "20m 14s",
          speed: "66.23 km/h",
          comment: "First cycle of the week! 🔥"
        },
        {
          id: 2,
          username: "iLoveCycling",
          distance: "30 km",
          time: "10m 14s",
          speed: "100 km/h",
          comment: "Best cycle EVER! "
        },
    
        {
          id: 3,
          username: "iLoveCycling",
          distance: "200 km",
          time: "59m 59s",
          speed: "70 km/h",
          comment: "Loved it"
        }
      ]
      
    
      const renderItem = ({ item }) => (
        <SocialPost username = {item.username} distance={item.distance} time={item.time} speed={item.speed} comment={item.comment}></SocialPost>
      );


    //   const dropDownProfileEdit = () => {

    //     const [selected, setSelected] = useState(undefined);
    //     const data = [
    //         { label: 'One', value: '1' },
    //         { label: 'Two', value: '2' },
    //         { label: 'Three', value: '3' },
    //         { label: 'Four', value: '4' },
    //         { label: 'Five', value: '5' },
    //     ];

    //     return (
    //         <View>
    //         {!!selected && (
    //             <Text>
    //             Selected: label = {selected.label} and value = {selected.value}
    //             </Text>
    //         )}
    //         <Dropdown label="Select Item" data={data} onSelect={setSelected} />
    //         <Text>This is the rest of the form.</Text>
    //         </View>
    //     );
    //   };

    

    return(

    <View className = "pl-5 pr-5">
        {/* <TopNavBar /> */}
            <View className = "flex-col mt-10">
                <ScrollView>
                    <View className = "flex-row justify-center">
                        <Image className = "rounded-full h-40 w-40" source={require("../assets/Serene_Lee_profile.png")} />
                    </View>

                    <View className = "flex-row justify-center items-center mt-3">
                        <Text className = "font-Poppins_Bold text-3xl text-black text-center ">iLoveCycling</Text>
                        <View className = "absolute right-10">
                            <Image className = "h-8 w-8" source={require("../assets/Icon_Edit.png")} />
                        </View>
        
                    </View>   
                        

                    <View className = "flex-row justify-center items-center mt-3">
                        <Text className = "font-Poppins_Bold rounded-t-xl rounded-b-xl pl-4 pr-4 pt-2 pb-2 border text-center">5 Pals</Text>
                    </View>

                    <View className = "flex-row justify-center mt-3">
                        <View className = "flex-row">
                            <View className = "flex-row items-center justify-center ">
                                    <Image className = "h-8 w-8" source={require("../assets/Icon_Tele.png")} />
                                    <Text className = "ml-1 font-Poppins_Regular">@iLoveCycling</Text>
                            </View>

                            <View className = "flex-row items-center justify-center  ml-3">
                                    <Image className = "h-8 w-8" source={require("../assets/Icon_Insta.png")} />
                                    <Text className = "ml-1 font-Poppins_Regular">@iLoveCycling</Text>
                            </View>
                        </View>
                    </View>



                    <View className = "flex-row justify-center mt-3">
                        <View className = "flex-row">
                            <View className = "flex-row items-center justify-center ">
                                    <Image className = "h-12 w-12" source={require("../assets/Icon_Certificate.png")} />
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#B89130]">x</Text>
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#B89130]">5</Text>
                            </View>

                            <View className = "flex-row items-center justify-center  ml-3">
                                    <Image className = "h-12 w-12" source={require("../assets/Icon_Badge.png")} />
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#163760]">x</Text>
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#163760]">2</Text>
                            </View>

                            <View className = "flex-row items-center justify-center  ml-3">
                                    <Image className = "h-12 w-12" source={require("../assets/Icon_Fire.png")} />
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#F0870F]">x</Text>
                                    <Text className = "ml-1 font-Poppins_Bold text-2xl text-[#F0870F]">23</Text>
                            </View>
                        </View>
                    </View>




                    <View className = "flex-col mt-3">
                        <Text className = "font-Poppins_Bold text-2xl text-black">Your Stats</Text>
                        <View className = "flex-col pl-3">
                            <View>
                                <Text className = "font-Poppins_Light">Total Distance Travelled</Text>
                                <View className = "flex-row">
                                    <Text className = "font-Poppins_Medium text-2xl text-black">22.34</Text>
                                    <Text className = "font-Poppins_Medium text-2xl text-black"> km</Text>
                                </View>
                            </View>

                            <View>
                                <Text className = "font-Poppins_Light">Average Speed</Text>
                                <View className = "flex-row">
                                    <Text className = "font-Poppins_Medium text-2xl text-black">66.23</Text>
                                    <Text className = "font-Poppins_Medium text-2xl text-black"> km/h</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View className = "flex-col mt-3">
                    <Text className = "font-Poppins_Bold text-2xl text-black">Your Posts</Text>

                    <FlatList
                        data = {SOCIAL_POST_DATA}
                        renderItem = { renderItem}
                        keyExtractor={item => item.id}
                        // ItemSeparatorComponent = {this.FlatListItemSeparator}
                        />
                </View>

                    
                </ScrollView>





                
            
                

            </View>
                

    </View>
    );
  };

  export default ProfilePage;
  
  
  
  
  
  
  