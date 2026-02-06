import { StyleSheet, View } from "react-native";
import MoistureTracker from "../../components/MoistureTracker/MoistureTracker";
import React from "react";
import { TrackerMoistureDataProvider } from "contexts/TrackerMoistureData/TrackerMoistureDataContext";
import { TrackerWaterDataProvider } from "contexts/TrackerMoistureData/TrackerWaterDataContext";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";

export default function App() {
  return (
    <View style={styles.container}>
      <PlantsDataProvider>
        <TrackerWaterDataProvider>
          <TrackerMoistureDataProvider>
            <MoistureTracker />
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
