import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
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




    // const PostRoute = async () => {
    //     try {

    //         const response = await fetch(BASE_URL + "/post-route", {
    //             method: "POST",
    //             headers: {
    //               Authorization: "Bearer " + token,
    //               "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
                
    //              }),
    //           });
        
    //           if (!response.ok) {
    //             console.error("Server responded with an error:", response.statusText);
    //             return;
    //           }
        
    //           const data = await response.json();
    //           console.log(data);

    //     }catch(error){

    //     }

    // };

    // useEffect(() => {
    //     const fetchToken = async () => {
    //       const token = await getToken();
    //       console.log("Token:", token);
    //       setToken(token);
    //     };
    
    //     fetchToken();
    //   }, []);

return(

    <View>

        <Text>{time}</Text>
        <Text>{distance}</Text>
        {/* <Text>{routeCoordinates}</Text> */}

        


        <TextInput
                className="bg-white rounded-lg p-2 text-[#334155]"
                placeholder="How'd it go? Share more about your activity to your pals!"
                value={caption}
                onChangeText={(end_text) => {
                    setCaption(caption);
                }}
                />



    </View>
    


);

};


export default RoutePosting;
