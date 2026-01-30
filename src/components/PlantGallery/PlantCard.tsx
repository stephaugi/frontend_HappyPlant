// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { saveToStorage } from "../../utils/storage";
import { useRouter } from "expo-router";
import { theme } from "../../theme";

type Props = {
  plantData: object;
};

const moistureScales = ["Very Dry", "Dry", "Normal", "Damp", "Wet", "Very Wet"];

const PlantCard = ({ plantData }: Props) => {
  const router = useRouter();
  const handleSelectPlant = (item: object) => {
    // set the selected plant
    const saveSelectedPlant = async (item: object) => {
      await saveToStorage("currentSelectedPlant", item);
    };
    saveSelectedPlant(item);
    // go to the profile page with the selected plant info passed
    router.navigate({
      pathname: `plants/plantProfile`,
    });
  };
  return (
    <TouchableOpacity onPress={() => handleSelectPlant(plantData)}>
      <View style={styles.plantCardContainer}>
        <Text style={styles.plantCardText}>{plantData.name}</Text>
        <Text style={styles.plantSubtitle}>{plantData.description}</Text>
        <Text style={styles.plantBold}>When to water: {moistureScales[plantData.desiredMoistureLevel-1]}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plantCardContainer: {
    padding: 22,
    backgroundColor: theme.colorLightBlue,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  plantCardText: {
    fontSize: theme.formTextSize,
    fontWeight: "800",
  },
  plantBold: {
    fontWeight: "600",
  },
  plantSubtitle: {
    fontSize: theme.subtitleSize,
    fontWeight: "300",
  }
});

export default PlantCard;
