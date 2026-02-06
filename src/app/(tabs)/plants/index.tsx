import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import PlantList from "../../../components/PlantGallery/PlantList";
import { getPlantsFromApi } from "../../../utils/api/apiCalls";
import { convertFromAPI } from "../../../utils/api/convertData";
import { getFromStorage, saveToStorage } from "../../../utils/storage";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";

const storageKey = "plantsData";

export default function PlantsScreen() {
  // const [plantsData, setPlantsData] = useState([]);
  const router = useRouter();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     async function getPlants() {
  //       const response = await getPlantsFromApi();
  //       const converted = response.map(plantData => convertFromAPI(plantData))
  //       saveToStorage("plantsData", converted);
  //       setPlantsData(converted);
  //       console.log(converted);
  //     }
  //     getPlants();
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <PlantsDataProvider>
        <PlantList />
      </PlantsDataProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
