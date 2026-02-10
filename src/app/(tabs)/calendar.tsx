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

  return (
    <View style={styles.container}>
      <PlantsDataProvider>
        <AllWaterDataProvider>
          <AllMoistureDataProvider>
            <WaterCalendar />
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
