import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image
} from "react-native";
import { useAuthDetails } from '../contexts/AuthContext';
import axios, {AxiosRequestConfig} from 'axios';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from "react-native-gesture-handler";


type StartPathProps = {
    routeSummary: any,
    region: any
  };

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;

const StartPath: React.FC<StartPathProps> = ({routeSummary, region}) => {

    // const [startPoint, setStartPoint] = useState("");
    // const [endPoint, setEndPoint] = useState ("");
    const [totalDistance, setTotalDistance] = useState (0);

    const { getToken,getUserId, getEmail} = useAuthDetails();
    const [token, setToken] = useState('');

    const [seconds, setSeconds] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);
    const [pauseClicked, setPauseClicked] = useState(false);
    const [stopClicked, setStopClicked] = useState(false);

    const [startData, setStartData] = useState(region);
    const [endData, setEndData] = useState(region);
    

    const startTimer = () => {
        if (!timerId) {
          const id = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
          setTimerId(id);
        }
      };

      const pauseTimer = () => {
        if (timerId) {
          clearInterval(timerId);
          setTimerId(null);
        }
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

      const resetTimer = () => {
        setSeconds(0);
        if (timerId) {
          clearInterval(timerId);
          setTimerId(null);
        }
      };




    const ShareButton = () => {

        const onPressFunction = () => {
          // Define the action when the button is pressed
          console.log('Button pressed!');
        };
      
        return(
            <Pressable onPress={onPressFunction}>
              <Image className  ="h-16 w-16" source={require("@/src/assets/images/favicon.png")} />
            </Pressable>
        );
      };  
    
    
    const BookmarkButton = () => {

        const onPressFunction = () => {
          // Define the action when the button is pressed
          console.log('Button pressed!');
        };
      
        return(
            <Pressable onPress={onPressFunction}>
              <Image className  ="h-16 w-16" source={require("@/src/assets/images/favicon.png")} />
            </Pressable>
        );
      };
      

    const StartButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            // console.log('Button pressed!');
            startTimer();
            setTimerStarted(true);


          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#ccfbf1] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155]  text-center font-Poppins_Bold ">START</Text>
            </View>
            </TouchableOpacity>
        );
    };

    const StopButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            // console.log('Button pressed!');
            pauseTimer();
            setStopClicked(true);

          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#fca5a5] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155] text-center font-Poppins_Bold ">STOP</Text>
            </View>
            </TouchableOpacity>
        );
    };

    const PauseButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            // console.log('Button pressed!');
            pauseTimer();
            setPauseClicked(true);
          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#fde68a] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155]  text-center font-Poppins_Bold ">PAUSE</Text>
            </View>
            </TouchableOpacity>
        );
    };

    const ResumeButton = () => {

        const handleButtonPress = () => {
            // Define the action when the button is pressed
            // console.log('Button pressed!');
            startTimer();
            setPauseClicked(false);
          };
        return (
            <TouchableOpacity onPress={handleButtonPress}>
            <View className = "bg-[#FFFFFF] rounded-full text-left h-16 w-16 justify-center">
                <Text className = "text-[#334155]  text-center font-Poppins_Bold ">RESUME</Text>
            </View>
            </TouchableOpacity>
        );
    };


    const getRoute = async () => {
        try{


            const string_data_start = JSON.stringify([startData.latitude, startData.longitude]);
            const trimmed_data_start = string_data_start.trim();

            const string_data_end = JSON.stringify([endData.latitude, endData.longitude]);
            const trimmed_data_end = string_data_end.trim();



            const response = await fetch(BASE_URL + '/get-route', {
                method: 'POST',
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({"start_address": trimmed_data_start.slice(1,-1),
                                        "end_address": trimmed_data_end.slice(1,-1) 
                })
              });
          
              if (!response.ok) {
                console.error('Server responded with an error:', response.statusText);
                return;
              }
          
              const data = await response.json();
              console.log(data);
              setTotalDistance(data.route_summary.total_distance + totalDistance);

              setStartData(endData);

            


        }catch(error){
            console.error('Network error:', error);
          }

    
      };

    //   setEndData(
    //     {
    //         latitude: 1.3788984,
    //         longitude:  103.7526191,
    //     }
    //   )




    

    // console.log("This is the start point",routeSummary.start_point);
    // setStartPoint(routeSummary.start_point);
    // setEndPoint(routeSummary.end_point);
    // setRouteDistance(routeSummary.total_distance)


    useEffect(() => {
        return () => {
          if (timerId) {
            clearInterval(timerId);
          }
        };
      }, [timerId]);


    useEffect(() => {
    const fetchToken = async () => {
        const token = await getToken();
        console.log('Token:', token);
        setToken(token);
    };

    fetchToken();
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
          // Access and process the data here (data prop) as needed
          // You can perform checks or transformations on the data
          // and update the queriedData state as required
          const updatedData = region; // For simplicity, no change here
          setEndData(updatedData);
        }, 2000); // Set the interval duration (e.g., every 5 seconds)
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [region]); // Ensure the effect runs when data changes


      useEffect(() => {
        getRoute();
      }, [endData]);
    
    
    

    return(

        <View className = "bg-[#2dd4bf] h-64 rounded-t-xl rounded-b-xl flex-col justify-start pl-4 pr-4">

        <View className = " flex-row justify-between bg-[#ccfbf1] rounded-t-xl rounded-b-xl mt-4 ">


            <View className = "flex-col ">

                <View className = "flex-row">
                    <Image className = "object-fill w-6 h-8" source = {require("@/src/assets/images/favicon.png")} />
                    <View className = "flex-col pl-2">
                        <Text className = "text-sm font-Poppins_Bold">Start</Text>
                    
                        <Text className = " text-sm font-Poppins_Medium">{routeSummary.start_point}</Text>
                    </View>
                </View>
                
                <View className = "flex-row mt-10">
                    <Image className = "object-fill w-6 h-8" source = {require("@/src/assets/images/favicon.png")} />
                    
                    <View className = "flex-col pl-2">
                        <Text className = "text-sm font-Poppins_Bold">End</Text>
                        <Text className = " text-sm font-Poppins_Medium">{routeSummary.end_point}</Text>
                    </View>

                </View>
            </View>    

            <View className = " flex-col justify-around">

            <View style={{ display:  timerStarted ? 'none' : 'flex' }}>
                <Text className = "text-3xl text-center font-Poppins_Bold">{(routeSummary.total_distance / 1000).toFixed(2)} KM</Text>
            </View>

            <View style={{ display:  timerStarted ? 'flex' : 'none' }}>
                <Text className = "text-3xl text-center font-Poppins_Bold">{(totalDistance / 1000).toFixed(2)} KM</Text>
            </View>


                <View className = "flex-row  items-center justify-around w-32">
                    <Image className = "h-8 w-8" source={require("@/src/assets/images/favicon.png")} />
                    <Text className = "text-2xl font-Poppins_Regular">{formatTime(seconds)}</Text>
                </View>
            </View>
            
            
            

        </View>


        <View className = "flex-row  mt-5 items-center justify-between">
            <View style={{ display:  timerStarted ? 'none' : 'flex' }}>
                <StartButton />
            </View>

            <View style={{ display:  timerStarted ? 'flex' : 'none' }}>
                <View className = "flex-row">
                    <StopButton />
            
                    <View className = "ml-3">
                        <View style={{ display:  pauseClicked ? 'none' : 'flex' }}>
                            <PauseButton />
                        </View>

                        <View style={{ display:  pauseClicked ? 'flex' : 'none' }}>
                            <ResumeButton />
                        </View>
                    </View>
            
                </View>
            </View>
            



            <View className = "flex-row">
                <ShareButton />
                <BookmarkButton />

            </View>

        </View>
          
  
      </View>

    );



};


export default StartPath;