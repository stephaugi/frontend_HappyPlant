import { StyleSheet, Text, View } from "react-native";
import NewPlantForm from "../../../components/PlantForm/NewPlantForm";
import { PlantsDataProvider } from "contexts/PlantsData/PlantsDataContext";
// import { useLocalSearchParams } from "expo-router";

export default function NewPlantScreen() {
  return (
    <View style={styles.container}>
      <PlantsDataProvider>
        <NewPlantForm />
      </PlantsDataProvider>
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
