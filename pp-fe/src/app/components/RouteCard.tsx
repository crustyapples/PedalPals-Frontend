import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image} from 'react-native';


type RouteCardProps = {
    routeName: any;
    mapImage: any;
    distance: number;
  };
  

const RouteCard: React.FC<RouteCardProps>= ({routeName, mapImage, distance}) => {


    return(
        <View className = "inline-flex flex-col bg-[#e2e8f0] rounded-t-3xl rounded-b-3xl pl-5 pr-5 pt-2 pb-2 mt-5 w-40 h-40 m-2">
            

        <Text className = "text-center font-Poppins_Bold text-black">{routeName}</Text>

        <View className = "flex-row  items-center justify-center mt-1">
            <Image source={mapImage} className = "h-16 w-32 rounded-t-2xl rounded-b-2xl" />
        </View>

        <View className = "flex-col">
            <Text className = "font-Poppins_Light">Distance</Text>
            <Text className = "font-Poppins_Medium">{distance}</Text>

        </View>
</View>




    );







};

export default RouteCard;