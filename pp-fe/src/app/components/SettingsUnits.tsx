import { StyleSheet } from "react-native";
import React, { useState } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList, Switch, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDistanceUnit } from "../contexts/DistanceUnitContext";

const SettingsUnits: React.FC = () => {
  const [selectedUnit, setselectedUnit] = useState();

  const [isEnabled, setIsEnabled] = useState(true);
  const { toggleDistanceUnit } = useDistanceUnit();
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleDistanceUnit();
  };

  return (
    <View className="rounded-lg bg-[#FFFFFF] p-4 w-full items-center m-12">
      <Text className="font-Poppins_Bold text-2xl text-black font-bold m-5">
        Unit of Length
      </Text>

      {/* <Picker
                    selectedValue={selectedUnit}
                    onValueChange={(itemValue, itemIndex) =>
                        setselectedUnit(itemValue)
                    }>
                    <Picker.Item label="Kilometer" value="km" />
                    <Picker.Item label="Mile" value="m" />
                </Picker> */}

      <View className="flex-row items-center">
        <Text className="text-center text-lg mr-2">MI</Text>
        <Switch
          style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
          trackColor={{ false: "#e5e7eb", true: "#2dd4bf" }}
          thumbColor={isEnabled ? "#ffffff" : "#d1d5db"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text className="text-center text-lg ml-4">KM</Text>
      </View>

      {/* <View>
                    <Button title="Toggle Distance Unit" onPress={toggleDistanceUnit} />
                </View> */}
    </View>
  );
};

export default SettingsUnits;
