import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const SettingsUnits: React.FC= () => {
    const [selectedUnit, setselectedUnit] = useState();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View>

                <Text className = "font-Poppins_Bold text-2xl text-black">Units</Text>


                <Picker
                    selectedValue={selectedUnit}
                    onValueChange={(itemValue, itemIndex) =>
                        setselectedUnit(itemValue)
                    }>
                    <Picker.Item label="Kilometer" value="km" />
                    <Picker.Item label="Mile" value="m" />
                </Picker>

                
             

                </View>
            
                

                

    )

}


export default SettingsUnits;