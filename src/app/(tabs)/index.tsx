import { StyleSheet, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <MoistureTracker />
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
