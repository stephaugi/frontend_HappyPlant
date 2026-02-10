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

  if (!plantFormData) return null; // or loading spinner

  const handleUpdatePlant = (plantFormData: Object) => {

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
      <ControlledTextInput
        labelName="Plant Species"
        name="plantSpecies"
        onChangeText={handleFormChange}
        placeholder="What plant species are they?"
        value={plantFormData["plantSpecies"]}
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
