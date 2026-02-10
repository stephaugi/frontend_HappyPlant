// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { saveToStorage } from "../../utils/storage";
import { useRouter } from "expo-router";
import { theme, fontStyles } from "../../theme";
import { moistureScales } from "../../constants";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useEffect } from "react";

type Props = {
  plantData: object;
};

const PlantCard = ({ plantData }: Props) => {
  const { plantsData, selectedPlant, updatePlantsData, resetPlantsData, refreshPlantsData, selectPlant } = usePlantsData();

  const router = useRouter();
  const handleSelectPlant = (item: object) => {
    // set the selected plant
    const saveSelectedPlant = async (item: object) => {
      await saveToStorage("currentSelectedPlant", item);
    };
    saveSelectedPlant(item);

    // go to the profile page with the selected plant info passed

    selectPlant(item.id);

    router.navigate({
      pathname: `plants/plantProfile`,
      params: plantData,
    });
  };
  return (
    <TouchableOpacity onPress={() => handleSelectPlant(plantData)}>
      <View style={styles.plantCardContainer}>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap:10 }}>
          <Text style={fontStyles.header}>{plantData.name}</Text>
          { plantData.plantSpecies ?
          <Text style={fontStyles.tinyDescription}>({plantData.plantSpecies})</Text> : null}
          </View>
          <Text style={fontStyles.tinyDescription}>{plantData.description}</Text>
          
          <Text style={fontStyles.emphasis}>When to water: {moistureScales[plantData.desiredMoistureLevel-1]}</Text>
        </View>
        <View>
          {plantData.photo && <Image source={{ uri: plantData.photo }}
            style={styles.image}
            resizeMode="cover"
          />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plantCardContainer: {
    padding: 22,
    backgroundColor: theme.colorLightGrey,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textContainer: {
    width: 200,
  },
});

export default PlantCard;
