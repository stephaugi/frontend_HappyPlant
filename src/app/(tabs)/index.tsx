import { Alert, StyleSheet, Text, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import { saveToStorage, getFromStorage } from "../../utils/storage";
import { getPlantsFromApi, getOnePlantFromApi, getMoistureFromApi, updateMoistureFromApi, updateWaterFromApi, getWaterFromApi } from "../../utils/api/apiCalls";
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
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        setPlantsData(response.map((plantData) => convertFromAPI(plantData)));
        // get moisture data from api and save to storage/state
        if (storedSelectedPlant) {
          // console.log(storedSelectedPlant.name);
          setSelectedPlant(storedSelectedPlant);
          const moisture = await getMoistureFromApi(storedSelectedPlant.id);
          saveToStorage("moistureData", moisture);
          setMoistureData(moisture);
          const water = await getWaterFromApi(storedSelectedPlant.id);
          saveToStorage("waterData", water);
          setWaterData(water);
        }
      }
      fetchInitial();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));

  const handleSubmit = (selectedDay, moistureFormData, waterFormData) => {
    // console.log(`Submitting data!`);
    // submit logged info in formData for the day
    const moistureRequestData = { [selectedDay.selectedDate]: moistureFormData };

    // submit logged info in formData for the day
    const waterRequestData = { [selectedDay.selectedDate]: waterFormData };
    const submitData = async(moistureRequestData, waterRequestData) => {
      const newMoistureData = await updateMoistureFromApi(selectedPlant.id, moistureRequestData);
      saveToStorage("moistureData", newMoistureData);
      setMoistureData(newMoistureData);
      const newWaterData = await updateWaterFromApi(selectedPlant.id, waterRequestData);
      saveToStorage("waterData", newWaterData);
      setWaterData(newWaterData);
      // console.log(newMoistureData);
      // const newWaterData
    };
    // const submitWaterData = async(waterRequestData) => {
    //   const newWaterData = await updateWaterFromApi(selectedPlant.id, waterRequestData);
    //   saveToStorage("waterData", newWaterData);
    //   setWaterData(newWaterData);
    //   // console.log(newWaterData);
    // };

    const submitDataUpdatePlants = (moistureRequestData, waterRequestData, selectedPlant) => {
      submitData(moistureRequestData, waterRequestData).then(async() => {
        const newPlantData = await getOnePlantFromApi(selectedPlant.id);
        const converted = convertFromAPI(newPlantData);
        console.log(converted.currentMoistureLevel);
        setSelectedPlant(converted);
        saveToStorage("currentSelectedPlant", converted);
        const updatedPlantsData = plantsData.map(plantData => {
          if (plantData.id === selectedPlant.id) {
            return converted;
          } else {
            return plantData;
          }
        });
        setPlantsData(updatedPlantsData);
        saveToStorage("plantsData", updatedPlantsData);

        if ((converted.currentMoistureLevel) &&  (converted.currentMoistureLevel <= converted.desiredMoistureLevel) ){
          Alert.alert("Watering Reminder",`Remember to water ${converted.name}! It looks like it's ready for a drink.`)
        }
      });
    };
    // submitWaterData(waterRequestData);
    submitDataUpdatePlants(moistureRequestData, waterRequestData, selectedPlant);
    // call api to save changes to moisture/water
  };

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
        const waterLogs = await getWaterFromApi(id);
        console.log(waterLogs);
        setWaterData(waterLogs);
        saveToStorage("waterData", waterLogs);
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
        onSubmit={handleSubmit}
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
