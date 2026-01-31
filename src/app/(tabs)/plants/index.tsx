import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import PlantList from "../../../components/PlantGallery/PlantList";
import { getPlantsFromApi } from "../../../utils/api/apiCalls";
import { convertFromAPI } from "../../../utils/api/convertData";
import { getFromStorage, saveToStorage } from "../../../utils/storage";

const storageKey = "plantsData";

export default function PlantsScreen() {
  const [plantsData, setPlantsData] = useState([]);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function getPlants() {
        const response = await getPlantsFromApi();
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        setPlantsData(response.map(plantData => convertFromAPI(plantData)));
      }
      getPlants();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // useEffect(() => {
    // const fetchInitial = async () => {
    //   const data = await getFromStorage(storageKey);
    //   if (data) {
    //     setPlantsData(data);
    //     console.log("getting data from storage");
    //   } else {
    //     const response = await getPlantsFromApi();
    //     saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
    //     setPlantsData(response.map(plantData => convertFromAPI(plantData)));
    //     console.log("getting data from api");
    //   }
  //   };
  //   // setPlantsData([]);
  //   fetchInitial();
  // }, []);

  // const handleSelectPlant = (item: object) => {
  //   // set the selected plant
  //   // go to the profile page with the selected plant info passed
  //   saveToStorage("currentSelectedPlant", item);
  //   router.navigate({
  //     pathname: `plants/plantProfile`,
  //     // params: item,
  //   });
  // };

  return (
    <View style={styles.container}>
      <PlantList plantsData={plantsData}/>
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
