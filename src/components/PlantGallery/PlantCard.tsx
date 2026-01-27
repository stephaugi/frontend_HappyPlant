// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

type Props = {
  plantData: object;
  onSelect: Function;
};

const PlantCard = ({ plantData, onSelect }: Props) => {
  return (
    <TouchableOpacity onPress={() => onSelect(plantData)}>
      <View style={styles.plantCardContainer}>
        <Text style={styles.plantCardText}>{plantData.name}</Text>
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
});

export default PlantCard;
