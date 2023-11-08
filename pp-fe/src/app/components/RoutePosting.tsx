import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapButtons from './MapButtons';
import RouteInfoPlanning from './RouteInfoPlanning';
import MapViewComponent from './MapViewComponent';
import PostCard from './PostCard';
import { useAuthDetails } from "../contexts/AuthContext";


const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

type RoutePostingProps = {
    distance: number;
    time: number;
    routeData: any
    routeId: any
  };


const RoutePosting: React.FC<RoutePostingProps> = ({distance, time, routeData, routeId}) => {

    const [caption, setCaption] = useState("");
    const { getToken, getUserId, getEmail } = useAuthDetails();
    const [token, setToken] = useState("");
    // console.log("Received Route Data", routeData)
    console.log("Route Id received by RoutePosting", routeId);




    const PostRoute = async () => {
        try {

            const response = await fetch(BASE_URL + "/post-route", {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "caption": caption,
                    "route": routeId
                 }),
              });
        
              if (!response.ok) {
                console.error("Server responded with an error:", response.statusText);
                return;
              }
        
              const data = await response.json();
              console.log(data);

        }catch(error){
            console.error("Error:", error);

        }

    };


    
  const PostButton = () => {
    const handleButtonPress = async () => {
    //   console.log('Button pressed!');
    await PostRoute();

    };
    return (
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="bg-[#d1d5db] text-left h-16 w-24 justify-center">
          <Text className="text-[#334155]  text-center font-Poppins_Bold ">
            Post Now
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

    useEffect(() => {
        const fetchToken = async () => {
          const token = await getToken();
          console.log("Token:", token);
          setToken(token);
        };
    
        fetchToken();
      }, []);

return(

    <View>

        <Text>{time}</Text>
        <Text>{distance}</Text>
        {/* <Text>{routeCoordinates}</Text> */}
        

        


        <TextInput
                className="bg-white rounded-lg p-2 m-2 text-[#334155]"
                placeholder="How'd it go? Share more about your activity to your pals!"
                value={caption}
                onChangeText={(caption) => {
                    setCaption(caption);
                }}
                />
        <View className = "mt-32">
            <View className = "flex  justify-center items-center bottom-0">
                <PostButton />
            </View>
        </View>
    
    </View>


);

};


export default RoutePosting;
