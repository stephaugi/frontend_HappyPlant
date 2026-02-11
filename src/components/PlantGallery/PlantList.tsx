// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, FlatList, StyleSheet } from "react-native";
import PlantCard from "./PlantCard";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useFocusEffect } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "theme";

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

  return (<>
  <StatusBar style="light" />
    <View style={styles.pageContainer}>
      <View style={styles.cardsContainer}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
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
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: theme.colorBlue,
    // paddingTop: 30,
    flex: 1,
  },
  cardsContainer: {
    // paddingVertical: 1,
    backgroundColor: theme.colorWhite,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // height: "70%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    objectFit: "cover",
  },
  flatListContainer: {
    padding: 50,
    // paddingBottom: 20,

  }
});

export default PlantList;
