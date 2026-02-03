import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import React, { useState, useEffect } from "react";
import { getPlantsFromApi, getAllMoistureFromApi } from "../../utils/api/apiCalls";
import { convertFromAPI } from "../../utils/api/convertData";
import { useFocusEffect } from "@react-navigation/native";
import WaterCalendar from "../../components/Calendar/WaterCalendar";

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
        // let allMoistureData = new Object();
        for (const plant of converted) {
          if (plant.nextWaterDate !== "None") {
            // console.log(`${plant.name} has a watering date ${plant.nextWaterDate}`)
            toWater.push(plant);
          }
          const moisture = await getAllMoistureFromApi();
          saveToStorage("allMoistureData", moisture);
          setAllMoistureData(moisture);
          const water = await getAllMoistureFromApi();
          saveToStorage("allWaterData", water);
          setAllWaterData(water);
          // const water = await getWaterFromApi(storedSelectedPlant.id);
          // saveToStorage("waterData", water);
          // setWaterData(water);
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
        <WaterCalendar plants={plantsData} plantsToWater={plantsToWater} allMoistureLogs={allMoistureData} allWaterLogs={allWaterData}/>
      {/* </View> */}
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
