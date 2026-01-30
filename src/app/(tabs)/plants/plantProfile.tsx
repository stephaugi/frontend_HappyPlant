import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import PlantProfileComponent from "../../../components/PlantProfile/PlantProfileComponent";

export default function PlantProfileScreen() {

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <PlantProfileComponent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
