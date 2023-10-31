import React from "react";
import { View, Text, Image, Button, FlatList, TextInput } from "react-native";
import RouteInfoPlanning from '../components/RouteInfoPlanning';
import MapButtons from "../components/MapButtons";



const MapPage: React.FC = () => {


    return(



            <View className = " h-screen ">

                <View className= "left-0 top-0">
                    <MapButtons />
                </View>

                <View className = "bottom-32 inset-x-0 absolute" >
                    <RouteInfoPlanning />
                </View>
                
            </View>


    );







};

export default MapPage;