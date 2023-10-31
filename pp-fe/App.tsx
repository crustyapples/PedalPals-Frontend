/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image,Pressable} from "react-native"; 
import type {PropsWithChildren} from 'react';
import { FontSize, FontFamily, Color, Padding, Border } from "./GlobalStyles";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
// import { createAppContainer } from "react-navigation";

// import Welcome Screen

import WelcomeLogin from "./screens/WelcomeLogin";
// import HomePage from "./screens/HomePage";
// import NotificationPage from "./screens/NotificationPage";
// import MapChoosingPathPage from "./screens/MapChoosingPathPage";
// import MapStartPathPage from "./screens/MapStartPathPage";
// import MapDuringPathPage from "./screens/MapDuringPathPage";
// import RoutePage from './screens/RoutePage';
// import ProfilePage from './screens/ProfilePage';
// import Challenges from './screens/Challenges';
// import NearbyPage from './screens/NearbyPage';
// import SettingsPage from './screens/SettingsPage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();


 
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



    


  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your Changes">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    
    
    <WelcomeLogin />
    // <HomePage />
    // <NotificationPage />
    // <MapChoosingPathPage />
    // <MapStartPathPage />
    // <MapDuringPathPage />
    // <RoutePage />
    // <ProfilePage />
    // <Challenges />
    // <SettingsPage />

    // <NavigationContainer>
    //    <Tab.Navigator initialRouteName="Home">
    //       <Tab.Screen name = "Home" component={HomePage} />
    //       <Tab.Screen name = "Nearby" component= {NearbyPage} />
    //       <Tab.Screen name = "Map" component= {MapStartPathPage} />
    //       <Tab.Screen name = "Route" component= {RoutePage} />
    //       <Tab.Screen name = "Challenges" component= {Challenges} />
    //    </Tab.Navigator>
    // </NavigationContainer>






    

  );
}

// const Tab = createMaterialBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomePage} />
//       <Tab.Screen name="Maps" component={MapStartPathPage} />
//     </Tab.Navigator>
//   );
// }

// MyTabs();

// export default App() {
//   return(
//     <Navigator>
//       <HomePage />
//     </Navigator>
//   );
// }

export default App;