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
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { updatePlantFromApi } from "../../utils/api/plantApiCalls";
import { convertToAPI, convertFromAPI } from "../../utils/api/convertData";
import { useState } from "react";
import ControlledTextInput from "../PlantForm/ControlledTextInput";
import ControlledOption from "../PlantForm/ControlledOption";
import PhotoSelect from "../PlantForm/PhotoSelect";

const PlantProfileComponent = ({ plantData }) => {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [plantFormData, setPlantFormData] = useState(plantData);

  const handleUpdatePlant = async (inputData: object) => {
    const requestBody = convertToAPI(inputData);
    const newPlant = convertFromAPI(await updatePlantFromApi(requestBody));
    setPlantFormData(newPlant);
  };

  const handleFormChange = (inputName: string, inputValue: string) => {
    return setPlantFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  return (
    // <View style={styles.profileContainer}>
    //   {plantData.photo ? (
    //     <Text>show photo</Text>
    //   ) : (
    //     <View style={styles.textContainer}>
    //       <Feather name="image" size={24} color={theme.colorTheme1} />
    //     </View>
    //   )}
    //   <Text style={styles.text}>{plantData.name}</Text>
    //   <Text style={styles.profileBody}>{plantData.description}</Text>
    //   <Text style={styles.text}>{plantData.desiredMoistureLevel}</Text>
    //   <Text style={styles.text}>{plantData.currentMoistureLevel}</Text>

    // </View>

    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={{ backgroundColor: theme.colorBlue, padding: 20 }}
        onPress={() => {
          setEditMode(prevEditMode => !prevEditMode);
          console.log(plantFormData);
        }}>
        <Text>Edit!</Text>
      </TouchableOpacity>
      <PhotoSelect />
      {editMode ? (<>
          <ControlledTextInput
            labelName=""
            name="name"
            onChangeText={handleFormChange}
            placeholder="Add a name"
            value={plantFormData["name"]}
          />
          <ControlledTextInput
            labelName=""
            name="description"
            onChangeText={handleFormChange}
            placeholder="Write something about your plant"
            value={plantFormData["description"]}
            textAreaHeight={100}
            textArea={true}
          />
        </>
      ) : (
        <>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInput}>{plantFormData["name"]}</Text>
            <Text style={[styles.profileBody, { paddingLeft: 30, paddingVertical: 20 }]}>{plantFormData["description"]}</Text>
            <Text style={styles.label}>When to water</Text>
            <ControlledOption
              moistureLevel={plantFormData.desiredMoistureLevel}
              onSelectOption={handleFormChange}
            />
            <Text style={styles.label}>Today's moisture level</Text>
            <ControlledOption
              moistureLevel={plantFormData.currentMoistureLevel}
              onSelectOption={handleFormChange}
            />
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => handleUpdatePlant(plantFormData)}
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
    backgroundColor: theme.colorLightBlue,
    height: 600,
    marginHorizontal: 20,
    borderRadius: 16,
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
