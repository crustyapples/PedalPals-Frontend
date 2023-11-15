import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList, Switch } from "react-native";
import SettingsUnits from "../components/SettingsUnits";
import SettingsPrivacy from "../components/SettingsPrivacy";
import SettingsAccount from "../components/SettingsAccount";

import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const SettingsPage: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Settings", headerStyle: {
      backgroundColor: '#14b8a6', // Change this to the desired color
    }, });
  }, [navigation]);

  return (
    <View className="bg-[#FFFFFF] h-screen m-4 items-center">
      <SettingsUnits />
      {/* <SettingsPrivacy />
      <SettingsAccount /> */}
    </View>
  );
};

export default SettingsPage;
