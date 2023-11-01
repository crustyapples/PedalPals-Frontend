import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView, FlatList } from 'react-native';
import SettingsUnits from '../components/SettingsUnits';
import SettingsPrivacy from '../components/SettingsPrivacy';
import SettingsAccount from '../components/SettingsAccount';





const SettingsPage: React.FC= () => {



    return(
        <View>
            <SettingsUnits />
            <SettingsPrivacy />
            <SettingsAccount />



        </View>
    )

}


export default SettingsPage;