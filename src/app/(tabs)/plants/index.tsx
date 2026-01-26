import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import PlantList from "../../../components/PlantGallery/PlantList";
import { getPlantsFromApi } from "../../../utils/api/plantApiCalls";

export default function PlantsScreen() {
  const [plantsData, setPlantsData] = useState([]);
  useEffect(() => {
    async function getPlants() {
      setPlantsData(await getPlantsFromApi());
    }
    getPlants();
  }, []);
  return (
    <View style={styles.container}>
      <PlantList plantsData={plantsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
