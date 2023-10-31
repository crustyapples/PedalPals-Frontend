import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { useAuth } from "../contexts/AuthContext";

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

  return (
    <Tabs

    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View className="flex-row">
              {/* <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link> */}
              {/* <Link href="/modal" asChild> */}
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
              {/* </Link>               */}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="nearbyTab"
        options={{
          title: "Nearby",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mapTab"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="routesTab"
        options={{
          title: "Routes",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="challengesTab"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="profileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}  
      /> */}
    </Tabs>
  );
}
