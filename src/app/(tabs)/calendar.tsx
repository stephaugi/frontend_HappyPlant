import { StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import React, { useState, useEffect } from "react";
import { getPlantsFromApi } from "../../utils/api/apiCalls";
import { convertFromAPI } from "../../utils/api/convertData";
import { useFocusEffect } from "@react-navigation/native";
import WaterCalendar from "../../components/Calendar/WaterCalendar";

export default function CalendarScreen() {
  const [plantsData, setPlantsData] = useState([]);
  const [plantsToWater, setPlantsToWater] = useState([]);

  // useEffect(() => {
  //   const fetchInitial = async () => {
  //     const data = await getFromStorage("plantsData");
  //     if (data) {
  //       setPlantsData(data);
  //       console.log("getting data from storage");
  //     } else {
  //       const response = await getPlantsFromApi();
  //       saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
  //       setPlantsData(response.map(plantData => convertFromAPI(plantData)));
  //       console.log("getting data from api");
  //     }
  //   };
  //   // setPlantsData([]);
  //   fetchInitial();
  // }, []);

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
          if (plant.nextWaterDate) {
            toWater.push(plant);
          }
        }
        setPlantsToWater(toWater);
        console.log(toWater);
      }
      fetchInitial();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <WaterCalendar plants={plantsData} plantsToWater={plantsToWater}/>
      </View>
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
  calendar: {
    backgroundColor: theme.colorLightGrey,
  },
  agenda: {
    backgroundColor: theme.colorLightGrey,
    padding: 12,
  },
});
