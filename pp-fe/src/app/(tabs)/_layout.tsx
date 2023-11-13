import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Text, View, Image } from "react-native";
import Colors from "../../constants/Colors";
import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";
import ProfilePage from "../screens/ProfileScreen";
import HomeTab from ".";
import MapPage from "../screens/MapScreen";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { logout } = useAuth();
  const colorScheme = useColorScheme();
  // const [showProfilePage, setshowProfilePage] = useState(false);

  return (
    <Tabs>
      <Tabs.Screen
        name={"index"}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <View className="flex-row">
              <Link href="/screens/ProfileScreen" asChild>
                <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    color="black"
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    
                  />
                )}
                  </Pressable>

              </Link>              
            </View>
          
          ),
          headerRight: () => (
            <View className="flex-row">

              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color="black"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    onPress={logout}
                  />
                )}
              </Pressable>
              {/* <Link href="/screens/ProfileScreen" asChild>
                <Pressable onPress={(pressed) => {
                    // Your onPress action here
                  }}>
                    <Image source={require('@/src/assets/images/notification-icon.png')} />
                  </Pressable>

              </Link>              */}
            </View>
          ),
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="nearbyTab"
        options={{
          title: "Nearby",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="mapTab"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bicycle" color={color} />
          ),
          headerTitleAlign: "center"
        }}
      />

      <Tabs.Screen
        name="routesTab"
        options={{
          title: "Routes",
          tabBarIcon: ({ color }) => <TabBarIcon name="road" color={color} />,
        }}
      />

      <Tabs.Screen
        name="challengesTab"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
          headerTitleAlign: "center"
        }}
      />

      <Tabs.Screen
        name="profileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <View className="flex-row">

              <Link href="/screens/SettingsScreen" asChild>
                <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="gear"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>

              </Link>
            </View>
          ),
          headerTitleAlign: "center"
        }}  
      />



      
    </Tabs>
  );
}
