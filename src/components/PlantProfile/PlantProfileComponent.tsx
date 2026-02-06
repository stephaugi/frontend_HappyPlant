import { View, Text, StyleSheet, Alert } from "react-native";
import { fontStyles } from "../../theme";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import ImageSelector from "../PlantForm/ImageSelector";
import ControlledTextInput from "../PlantForm/ControlledTextInput";
import ControlledOption from "../PlantForm/ControlledOption";
import CustomButton from "components/UI/CustomButton";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";

const PlantProfileComponent = ({ toNavigate }) => {
  const { plantsData, updatePlantsData, selectPlant } = usePlantsData();
  const [plantFormData, setPlantFormData] = useState(null);
  const plant = useLocalSearchParams();

  useFocusEffect(
    React.useCallback(() => {
      setPlantFormData({ ...plant });
    }, [])
  );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     async function getPlants() {
  //       setPlantsData(await getFromStorage("plantsData"));
  //       setPlantFormData(await getFromStorage("currentSelectedPlant"));
  //       // setPlantsData({...selectedPlant});
  //       // selectPlant(1);
  //       // console.log(selectedPlant);
  //       setPlantFormData({...selectedPlant});
  //     }
  //     getPlants();
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );
  if (!plantFormData) return null; // or loading spinner

  const handleUpdatePlant = (plantFormData: Object) => {
    // const updatePlant = async (inputData: object, plantFormData: any[]) => {
    //   const requestBody = convertToAPI({ ...inputData });
    //   const response = convertFromAPI(await updatePlantFromApi(requestBody));
    //   setPlantFormData(response);

    //   const newPlantData = plantsData.map((plant) => {
    //     if (plant.id === plantFormData.id) {
    //       return plant;
    //     } else {
    //       return plant;
    //     }
    //   });
    //   saveToStorage("plantsData", newPlantData);
    // };
    // updatePlantsData(inputData, plantsData);
    updatePlantsData(plantFormData).then(() => {
      Alert.alert("Saved!", "", [
        {
          text: "OK",
          onPress: () => toNavigate.back(),
          style: "default",
        },
      ]);
    });
  };

  const handleFormChange = (inputName: string, inputValue: string) => {
    return setPlantFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  return (
    <View style={styles.profileContainer}>
      <ControlledTextInput
        labelName="Name"
        name="name"
        onChangeText={handleFormChange}
        placeholder="Add a name"
        value={plantFormData["name"]}
      />
      <ImageSelector
        onSelectImage={handleFormChange}
        selectedImage={plantFormData["photo"]}
      />
      <ControlledTextInput
        labelName="Description"
        name="description"
        onChangeText={handleFormChange}
        placeholder="Write something about your plant"
        value={plantFormData["description"]}
        textAreaHeight={100}
        textArea={true}
      />
      <View>
      <Text style={fontStyles.emphasis}>When to water</Text>
        <ControlledOption
          moistureLevel={plantFormData.desiredMoistureLevel}
          onSelectOption={handleFormChange}
        />
      </View>
      <CustomButton
      label="Save"
      onPress={() => handleUpdatePlant(plantFormData)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 20,
    height: 600,
    marginHorizontal: 20,
    borderRadius: 16,
    gap: 10,
  },
});

export default PlantProfileComponent;
