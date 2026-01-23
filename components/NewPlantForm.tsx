import { theme } from "../theme";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Flatlist } from "react-native";
import ControlledTextInput from "./ControlledTextInput";
import ControlledOption from "./ControlledOption";
import PhotoSelect from "./PhotoSelect";

type Props = {
  name?: string;
  isCompleted?: boolean;
};

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: "",
};

// required_inputs = ["name", "owner_id", "desired_moisture_level"]
// optional_params = [
// "description",
// "photo",
// "current_moisture_level"
// ]

export function NewPlantForm({ name, isCompleted }: Props) {
  const [formData, setFormData] = useState(kDefaultForm);
  const handleFormChange = (inputName: string, inputValue: string) => {
    console.log(inputName, inputValue);
    return setFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };
  const handleSubmit = () => {
    return console.log(formData);
  };
  return (
    <SafeAreaView>
      <View style={styles.formContainer}>
        <PhotoSelect />
        <ControlledTextInput
          labelName="Name"
          name="name"
          onChangeText={handleFormChange}
          placeholder="Add a name"
          value={formData["name"]}
        />
        <ControlledTextInput
          labelName="Description"
          name="description"
          onChangeText={handleFormChange}
          placeholder="Write something about your plant"
          value={formData["description"]}
          textAreaHeight={100}
          textArea={true}
        />
        <ControlledOption
          moistureLevel={formData.desiredMoistureLevel}
          onSelectOption={handleFormChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: theme.colorBlue,
    borderWidth: 1,
    backgroundColor: theme.colorBlue,
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    width: 100,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
  },
});
