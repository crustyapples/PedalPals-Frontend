import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';


const CustomButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View className = "bg-[#2dd4bf] rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg  h-8 w-16 flex items-center justify-center">
          <Text className = "text-[#3D5151] text-center font-Poppins_Bold">{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const handleButtonPress = () => {
    // Define the action when the button is pressed
    console.log('Button pressed!');
  };


  type NotificationProps = {
    profilePic: any;
    username: string;
    update: string;
  };
  


const Notification: React.FC<NotificationProps> = ({ profilePic, username, update}) => {
    return(
        <View>
            <View className = "flex-row justify-between items-center pt-4 pb-4">
            <Image className = "rounded-full h-8 w-8" source={profilePic} />
            <Text className = " w-24 font-Poppins_Regular">{username}</Text>
            <Text className = " w-32 font-Poppins_Light">{update}</Text>
            <CustomButton onPress={handleButtonPress} title = "Accept"/>
        </View>
            
        </View>
    )

}


export default Notification;