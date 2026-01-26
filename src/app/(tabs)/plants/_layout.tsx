import { Stack, Link } from "expo-router";
import { Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Plants",
          headerRight: () => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Link href="plants/newPlant" asChild>
                  <Pressable hitSlop={20}>
                    <AntDesign name="plus" size={24} color="black" />
                  </Pressable>
                </Link>
              </View>
            );
          },
        }}
      />
    </Stack>
  );
}
