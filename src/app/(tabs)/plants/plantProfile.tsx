import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import PlantList from "../../../components/PlantGallery/PlantList";
import { getPlantsFromApi } from "../../../utils/api/plantApiCalls";
import PlantProfileComponent from "../../../components/PlantProfile/PlantProfileComponent";

export default function PlantProfileScreen() {
  const currentPlantData = useLocalSearchParams();
  // const [currentPlantData, setCurrentPlantData] = useState({
  //   currentMoistureLevel: null,
  //   description: null,
  //   desiredMoistureLevel: 4,
  //   id: 4,
  //   name: "sweety",
  //   nextWaterDate: null,
  //   photo: null,
  // });
  // const [plantsData, setPlantsData] = useState([]);
  // useEffect(() => {
  //   async function getPlants() {
  //     setPlantsData(await getPlantsFromApi());
  //   }
  //   getPlants();
  // }, []);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <PlantProfileComponent plantData={currentPlantData} />
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
