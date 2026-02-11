import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import PlantProfileComponent from "../../../components/PlantProfile/PlantProfileComponent";
import { useRouter } from "expo-router";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";

export default function PlantProfileScreen() {
  const router = useRouter();
  return (
    <PlantsDataProvider>
        <View style={styles.container}>
          <PlantProfileComponent toNavigate={router}/>
        </View>
    </PlantsDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
