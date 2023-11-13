import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, ScrollView, FlatList } from "react-native";
import SettingsUnits from "../components/SettingsUnits";
import SettingsPrivacy from "../components/SettingsPrivacy";
import SettingsAccount from "../components/SettingsAccount";

import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const SettingsPage: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Settings" });
  }, [navigation]);

  return (
    <View>
      <SettingsUnits />
      <SettingsPrivacy />
      <SettingsAccount />
    </View>
  );
};

export default SettingsPage;
