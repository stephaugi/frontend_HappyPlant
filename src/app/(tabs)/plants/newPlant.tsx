import { StyleSheet, Text, View } from "react-native";
import { NewPlantForm } from "../../../components/PlantForm/NewPlantForm";

export default function NewPlantScreen() {
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
