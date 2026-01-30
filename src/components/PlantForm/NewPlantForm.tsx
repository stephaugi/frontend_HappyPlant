import { theme } from "../../theme";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ControlledTextInput from "./ControlledTextInput";
import ControlledOption from "./ControlledOption";
import PhotoSelect from "./PhotoSelect";
import { convertToAPI } from "../../utils/api/convertData";
import { useRouter } from "expo-router";
import { createPlantFromApi } from "../../utils/api/plantApiCalls";

type Props = {
  name?: string;
  isCompleted?: boolean;
};

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: 1,
};

// required_inputs = ["name", "owner_id", "desired_moisture_level"]
// optional_params = [
// "description",
// "photo",
// "current_moisture_level"
// ]

export function NewPlantForm({ name, isCompleted }: Props) {
  const [plantFormData, setPlantFormData] = useState(kDefaultForm);
  const router = useRouter();
  const handleCreatePlant = async (inputData: object) => {
    const requestBody = convertToAPI(inputData);
    const newPlant = await createPlantFromApi(requestBody);
    router.back();
  };

  const handleFormChange = (inputName: string, inputValue: string) => {
    return setPlantFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };
  return (
    <View style={styles.formContainer}>
      <PhotoSelect />
      <ControlledTextInput
        labelName="Name"
        name="name"
        onChangeText={handleFormChange}
        placeholder="Add a name"
        value={plantFormData["name"]}
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
      <Text>When to water</Text>
      <ControlledOption
        moistureLevel={plantFormData.desiredMoistureLevel}
        onSelectOption={handleFormChange}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => handleCreatePlant(plantFormData)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
