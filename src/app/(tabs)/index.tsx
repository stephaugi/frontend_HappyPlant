import { StyleSheet, Text, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import { saveToStorage, getFromStorage } from "../../utils/storage";
import { getPlantsFromApi } from "../../utils/api/apiCalls";
import { convertFromAPI } from "../../utils/api/convertData";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function App() {
  const [plantsData, setPlantsData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function getPlants() {
        const response = await getPlantsFromApi();
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        setPlantsData(response.map((plantData) => convertFromAPI(plantData)));
      }
      getPlants();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <MoistureTracker plantsData={plantsData}/>
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
