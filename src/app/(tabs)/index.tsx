import { StyleSheet, Text, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import { saveToStorage, getFromStorage } from "../../utils/storage";
import { getPlantsFromApi, getMoistureFromApi } from "../../utils/api/apiCalls";
import { convertFromAPI } from "../../utils/api/convertData";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function App() {
  const [plantsData, setPlantsData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState([]);
  const [moistureData, setMoistureData] = useState({});
  const [waterData, setWaterData] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function fetchInitial() {
        const response = await getPlantsFromApi();
        const storedSelectedPlant = await getFromStorage("currentSelectedPlant");
        // get moisture data from api and save to storage/state
        if (storedSelectedPlant) {
          // console.log(storedSelectedPlant.name);
          setSelectedPlant(storedSelectedPlant);
          const moisture = await getMoistureFromApi(storedSelectedPlant.id);
          saveToStorage("moistureData", moisture);
          setMoistureData(moisture);
          // console.log(moisture);
        }
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        setPlantsData(response.map((plantData) => convertFromAPI(plantData)));
      }
      fetchInitial();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));
  const selectPlant = (id) => {
    const data = plantsData.filter(plantData => plantData.id === id)
    console.log(data[0].name);
    setSelectedPlant(data[0]);
    saveToStorage("currentSelectedPlant", data[0]);
    const getMoistureLogs = async (id) => {
      try {
        const moistureLogs = await getMoistureFromApi(id);
        console.log(moistureLogs);
        setMoistureData(moistureLogs);
        saveToStorage("moistureData", moistureLogs);
      } catch (error) {
        console.log(error);
      }
    };
    getMoistureLogs(id);
  };

  return (
    <View style={styles.container}>
      <MoistureTracker
        plantsData={plantsData}
        moistureData={moistureData}
        waterData={waterData}
        selectedPlant={selectedPlant}
        onSelectPlant={selectPlant}
      />
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
