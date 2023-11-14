import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList, Switch , Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDistanceUnit } from "../contexts/DistanceUnitContext"



const SettingsUnits: React.FC= () => {
    const [selectedUnit, setselectedUnit] = useState();

    const [isEnabled, setIsEnabled] = useState(false);
    const { toggleDistanceUnit } = useDistanceUnit();
    const toggleSwitch = () => 
        {
            setIsEnabled(previousState => !previousState);
            toggleDistanceUnit();
        };



    return(
        <View className='rounded-lg bg-gray-100'>

                <Text className = "font-Poppins_Bold text-2xl text-black ">Units</Text>


                {/* <Picker
                    selectedValue={selectedUnit}
                    onValueChange={(itemValue, itemIndex) =>
                        setselectedUnit(itemValue)
                    }>
                    <Picker.Item label="Kilometer" value="km" />
                    <Picker.Item label="Mile" value="m" />
                </Picker> */}

                <View className = "flex-row items-center">
                    <Text className = "text-center justify-items-center">MI</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        />
                    <Text>KM</Text>
                </View>

                {/* <View>
                    <Button title="Toggle Distance Unit" onPress={toggleDistanceUnit} />
                </View> */}

                
             

                </View>
            
                

                

    )

}


export default SettingsUnits;