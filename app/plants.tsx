import { StyleSheet, Text, View } from "react-native";

export default function PlantsScreen() {
  return (
    <View style={styles.container}>
      <Text>my plants</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
