import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const SettingsPrivacy: React.FC= () => {
    const [selectedUnit, setselectedUnit] = useState();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View>
                <Text className = "font-Poppins_Bold text-2xl text-black">Privacy</Text>

                <View className = "flex-row">
                    
                    <View className = "flex justify-center">
                        <Text className = " font-Poppins_Bold text-sm text-black text-center">Share Locations with other cyclists?</Text>
                    </View>
                    
                    <View className = "flex-1 justify-end">
                        <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />

                    </View>

                </View>
            
                

                
        </View>
    )

}


export default SettingsPrivacy;