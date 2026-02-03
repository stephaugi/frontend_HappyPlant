import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import PlantProfileComponent from "../../../components/PlantProfile/PlantProfileComponent";
import { useRouter } from "expo-router";

export default function PlantProfileScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <PlantProfileComponent toNavigate={router}/>
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
