// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, FlatList } from "react-native";
import PlantCard from "./PlantCard";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useFocusEffect } from "expo-router";
import React from "react";

const PlantList = () => {
  const { plantsData, refreshPlantsData } = usePlantsData();

  useFocusEffect(
    React.useCallback(() => {
      refreshPlantsData();
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
      };
    }, [])
  );

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={plantsData}
        renderItem={({ item }) => {
          return (
            <PlantCard
              plantData={item}
            />
          );
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
