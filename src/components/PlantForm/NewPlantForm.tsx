import { fontStyles, theme, uiStyles } from "../../theme";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ControlledTextInput from "./ControlledTextInput";
import ControlledOption from "./ControlledOption";
import ImageSelector from "./ImageSelector";
import { convertToAPI } from "../../utils/api/convertData";
import { useRouter } from "expo-router";
import { createPlantFromApi } from "../../utils/api/apiCalls";
import CustomButton from "../UI/CustomButton";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: 1,
  photo: "",
};

export default function NewPlantForm() {
  const [plantFormData, setPlantFormData] = useState(kDefaultForm);
  const router = useRouter();
  const handleCreatePlant = async (inputData: object) => {
    const requestBody = convertToAPI(inputData);
    const newPlant = await createPlantFromApi(requestBody);
    router.back();
  };

  // _scrollToInput (reactNode: any) {
  //   // Add a 'scroll' ref to your ScrollView
  //   this.scroll.props.scrollToFocusedInput(reactNode)
  //   }
  const handleFormChange = (inputName: string, inputValue: string) => {
    return setPlantFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  return (
    <View style={styles.formContainer}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
      >
        {/* <ScrollView> */}
      {/* <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      > */}
          <View>
          <ImageSelector
            onSelectImage={handleFormChange}
            selectedImage={plantFormData["photo"]}
            />
            </View>
          <View style={styles.textInputsContainer}>
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
              label="Submit"
              pill={true}
              fontStyle="buttonBold"
              size={["100%"]}
              onPress={() => handleCreatePlant(plantFormData)}
            />

          </View>
    </KeyboardAwareScrollView>
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
    flex: 1,
    height: 600,
  },
  textInputsContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
});
