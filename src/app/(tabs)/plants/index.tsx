import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import PlantList from "../../../components/PlantGallery/PlantList";
import { getPlantsFromApi } from "../../../utils/api/plantApiCalls";
import { convertFromAPI } from "../../../utils/api/convertData";
import { getFromStorage } from "../../../utils/api/storage";

const storageKey = "plantsData";

export default function PlantsScreen() {
  const [plantsData, setPlantsData] = useState([]);
  const router = useRouter();
  // get plants from api
  useEffect(() => {
    async function getPlants() {
      const response = await getPlantsFromApi();
      setPlantsData(response.map(plantData => convertFromAPI(plantData)));
    }
    getPlants();
  }, []);
  // get plants from async storage
  // useEffect(() => {
  //   const fetchInitial = async () => {
  //     const data = await getFromStorage(storageKey);
  //     if (data) {
  //       setPlantsData(data);
  //     }
  //   };
  //   fetchInitial();
  // }, []);
  const handleSelectPlant = (item: any) => {
    // set the selected plant
    // go to the profile page with the selected plant info passed
    router.navigate({
      pathname: `plants/plantProfile`,
      params: item,
    });
  };

  return (
    <View style={styles.container}>
      <PlantList plantsData={plantsData} onSelect={handleSelectPlant} />
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
