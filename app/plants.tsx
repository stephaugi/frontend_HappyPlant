import { StyleSheet, Text, View } from "react-native";
import { NewPlantForm } from "../components/NewPlantForm";

export default function PlantsScreen() {
  return (
    <View style={styles.container}>
      <NewPlantForm />
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
