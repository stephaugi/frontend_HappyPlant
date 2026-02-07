import { StyleSheet, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import React from "react";
import { TrackerMoistureDataProvider } from "contexts/TrackerData/TrackerMoistureDataContext";
import { TrackerWaterDataProvider } from "contexts/TrackerData/TrackerWaterDataContext";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";
import { TrackerProvider } from "contexts/Tracker";

export default function App() {
  return (
    <View style={styles.container}>
      <PlantsDataProvider>
        <TrackerWaterDataProvider>
          <TrackerMoistureDataProvider>
            <TrackerProvider>
              <MoistureTracker />
            </TrackerProvider>
          </TrackerMoistureDataProvider>
        </TrackerWaterDataProvider>
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
