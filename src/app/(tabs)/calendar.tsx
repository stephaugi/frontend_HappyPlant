import { StyleSheet, View } from "react-native";
import { saveToStorage } from "../../utils/storage";
import React, { useState } from "react";
import { getPlantsFromApi, getAllMoistureFromApi, getAllWaterFromApi } from "../../utils/api/apiCalls";
import { convertFromAPI } from "../../utils/api/convertData";
import { useFocusEffect } from "@react-navigation/native";
import WaterCalendar from "../../components/Calendar/WaterCalendar";
import { AllMoistureDataProvider } from "contexts/AllData/AllMoistureDataContext";
import { AllWaterDataProvider } from "contexts/AllData/AllWaterDataContext";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";

export default function CalendarScreen() {
  const [plantsData, setPlantsData] = useState([]);
  const [plantsToWater, setPlantsToWater] = useState([]);
  const [allMoistureData, setAllMoistureData] = useState({});
  const [allWaterData, setAllWaterData] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function fetchInitial() {
        const response = await getPlantsFromApi();
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        const converted = response.map((plantData) => convertFromAPI(plantData));
        setPlantsData(converted);
        const toWater = [];
        for (const plant of converted) {
          if (plant.nextWaterDate !== "None") {
            toWater.push(plant);
          }
        const moisture = await getAllMoistureFromApi();
        saveToStorage("allMoistureData", moisture);
        setAllMoistureData(moisture);
        const water = await getAllWaterFromApi();
        saveToStorage("allWaterData", water);
        setAllWaterData(water);
        console.log(water);
        }
        setPlantsToWater(toWater);
      }
      fetchInitial();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));


  return (
    <View style={styles.container}>
      {/* <View style={styles.calendar}> */}
      <PlantsDataProvider>
        <AllWaterDataProvider>
          <AllMoistureDataProvider>
            <WaterCalendar plants={plantsData} plantsToWater={plantsToWater} allMoistureLogs={allMoistureData} allWaterLogs={allWaterData}/>
          {/* </View> */}
          </AllMoistureDataProvider>
        </AllWaterDataProvider>
      </PlantsDataProvider>
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
