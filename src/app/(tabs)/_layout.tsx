import { Tabs } from "expo-router";
import { theme } from "../../theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorBlue }}>
      <Tabs.Screen

        name="calendar"
        options={{
          headerShown: false,
          title: "Calendar",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="calendar-alt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Track",
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: "My Plants",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
