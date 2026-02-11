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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  plantData: object;
};
const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];

const PlantCard = ({ plantData }: Props) => {
  const { plantsData, selectedPlant, updatePlantsData, resetPlantsData, refreshPlantsData, selectPlant } = usePlantsData();
  const needsWater = plantData.nextWaterDate === today;
  const waterIcon = needsWater ? (
    <MaterialCommunityIcons name="emoticon-sad" size={50} color={theme.colorGrey} />
  ) : (
    <MaterialCommunityIcons name="emoticon-happy" size={50} color={theme.colorOrange} />
  );

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
        <View>
          <View>
            {plantData.photo && <Image source={{ uri: plantData.photo }}
              style={styles.image}
              resizeMode="cover"
            />}
          </View>
        </View>
        <View style={styles.water}>
          {waterIcon}
          </View>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap:10 }}>
          <Text style={[fontStyles.header, {color: theme.colorLightBlue}]}>{plantData.name}</Text>
          { plantData.plantSpecies ?
          <Text style={fontStyles.tinyDescription}>({plantData.plantSpecies})</Text> : null}
          </View>
          <Text style={fontStyles.tinyDescription}>{plantData.description}</Text>
          
          <Text style={fontStyles.emphasis}>When to water: {moistureScales[plantData.desiredMoistureLevel-1]}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plantCardContainer: {
    padding: 22,
    backgroundColor: theme.colorLightGrey,
    // height: 250,
    // marginHorizontal: 20,
    borderRadius: 16,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",

  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 40,
  },
  textContainer: {
    // width: 200,
  },
  water: {
    position: "absolute",
    zIndex: 9999,
    top: 10,
    right: 10,
  },
});

export default PlantCard;
