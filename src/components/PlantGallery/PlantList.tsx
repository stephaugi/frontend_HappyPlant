// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, Text, StyleSheet, FlatList } from "react-native";
import { theme } from "../../theme";
import PlantCard from "./PlantCard";

type Props = {
  plantsData: any[];
  onSelect: Function;
};

const PlantList = ({ plantsData, onSelect }: Props) => {
  // const plantData = [
  //   {
  //     name: "jellybean",
  //     id: "1209j",
  //   },
  //   {
  //     name: "peanut butter",
  //     id: "199403n",
  //   },
  // ];
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={plantsData}
        renderItem={({ item }) => {
          return <PlantCard plantData={item} onSelect={onSelect} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 20 }} />;
        }}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   plantCardContainer: {
//     backgroundColor: theme.colorLightBlue,
//   },
// });

export default PlantList;
