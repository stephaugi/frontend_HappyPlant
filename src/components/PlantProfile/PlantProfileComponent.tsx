// plant profile page with plant info from state/api call
// edit button that allows user to edit the profile info
// top is a calendar to select date that you want to log
// photo/image
// name Text
// description Text
// desiredMoistureLevel Text
// <actions section>
// water button
// moisture level buttons
// save button to save new changes

// states to use:
// plants api call from owners/<user_id>/plants
// each plant card shows the name of the plant, picture, happy or sad face icon.
// clicks to go to profile page with more info on plant. Use the current plant for the profile info
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { fontStyles, theme } from "../../theme";
import { updatePlantFromApi } from "../../utils/api/apiCalls";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ImageSelector from "../PlantForm/ImageSelector";
import { convertToAPI, convertFromAPI } from "../../utils/api/convertData";
import ControlledTextInput from "../PlantForm/ControlledTextInput";
import ControlledOption from "../PlantForm/ControlledOption";
import { saveToStorage, getFromStorage } from "../../utils/storage";

const PlantProfileComponent = () => {
  // const selectedPlant = useLocalSearchParams();
  const [plantFormData, setPlantFormData] = useState({});
  const [plantsData, setPlantsData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // const saveSelectedPlant = async (selectedPlant: object) => {
      //   await saveToStorage("currentSelectedPlant", selectedPlant);
      // };
      // saveSelectedPlant(selectedPlant);
      async function getPlants() {
        setPlantsData(await getFromStorage("plantsData"));
        setPlantFormData(await getFromStorage("currentSelectedPlant"));
      }
      getPlants();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const handleUpdatePlant = (inputData: object, plantFormData: any[]) => {
    const updatePlant = async (inputData: object, plantFormData: any[]) => {
      const requestBody = convertToAPI({ ...inputData });
      const response = convertFromAPI(await updatePlantFromApi(requestBody));
      setPlantFormData(response);

      const newPlantData = plantsData.map((plant) => {
        if (plant.id === plantFormData.id) {
          return plant;
        } else {
          return plant;
        }
      });
      saveToStorage("plantsData", newPlantData);
    };
    updatePlant(inputData, plantsData);
    Alert.alert("Saved!");
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
      <Text style={fontStyles.emphasis}>When to water</Text>
      <View style={{ alignSelf: "center" }}>
        <ControlledOption
          moistureLevel={plantFormData.desiredMoistureLevel}
          onSelectOption={handleFormChange}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => handleUpdatePlant(plantFormData, plantsData)}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 20,
    // backgroundColor: theme.colorLightBlue,
    height: 600,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  editButton: {
    backgroundColor: theme.colorBlue,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    height: 150,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.formTextSize,
    fontWeight: "800",
    color: "black",
  },
  profileBody: {
    fontSize: theme.subtitleSize,
    fontWeight: "300",
    color: "black",
  },
  button: {
    borderColor: theme.colorBlue,
    borderWidth: 1,
    backgroundColor: theme.colorBlue,
    borderRadius: theme.cornerRound,
    padding: 10,
    marginTop: 30,
    width: 100,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: theme.formTextSize,
    fontWeight: "800",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  textInputContainer: {
    marginVertical: 10,
  },
  textInput: {
    fontSize: theme.formTextSize,
    fontWeight: "800",
    minWidth: 300,
  },
  label: {
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default PlantProfileComponent;
