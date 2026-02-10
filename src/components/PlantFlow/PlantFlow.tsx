import { usePlantCreationFlow } from "contexts/PlantCreationFlow";
import { useRouter } from "expo-router";
import { useAuthStore } from "utils/authStore";
import { Modal, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import NewPlantForm from "components/PlantForm/NewPlantForm";
import ControlledOption from "components/PlantForm/ControlledOption";
import ControlledTextInput from "components/PlantForm/ControlledTextInput";
import ImageSelector from "components/PlantForm/ImageSelector";
import CustomButton from "components/UI/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { fontStyles, uiStyles, theme } from "theme";
import { convertToAPI } from "utils/api/convertData";
import { createPlantFromApi } from "utils/api/apiCalls";

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: 1,
  photo: "",
  plantSpecies: "",
};

const PlantFlow = () => {
  const [showModal, setShowModal] = useState(true);
  const { updateHasPlants, hasPlants } = useAuthStore();
  const { plantForm, updatePlantForm, plantFlowStep } = usePlantCreationFlow();
  const [plantFormData, setPlantFormData] = useState(kDefaultForm);
  const router = useRouter();

  // const onFirstLaunchClosed = () => {
  //   router.push("/");
  //   updateHasPlants();
  // };

  const handleCreatePlant = async (inputData: object) => {
    const requestBody = convertToAPI(inputData);
    const newPlant = await createPlantFromApi(requestBody);
    updateHasPlants();
    router.replace("(tabs)/plants");
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


  return (<>
    {/* // <View>
    //   <CustomButton
    //     label="Create a Plant!"
    //     onPress={() => {
    //       updateHasPlants();
    //       router.replace("(tabs)");
    //     }}
    //   />
    // </View>
    //  */}

        <Modal
          animationType="slide"
          presentationStyle="formSheet"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
      <View style={[uiStyles.centerAlign, { marginVertical: 50}]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
        >
  <Text style={fontStyles.header}>Let's add a plant!</Text>
          {/* <ScrollView> */}
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        > */}
  
            <ControlledTextInput
              labelName="Name"
              name="name"
              onChangeText={handleFormChange}
              placeholder="Add a name"
              value={plantFormData["name"]}
            />
            <View style={styles.photoSelectContainer}>
            <ImageSelector
              onSelectImage={handleFormChange}
              selectedImage={plantFormData["photo"]}
              />
              </View>
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
            <Text style={fontStyles.emphasis}>When to water</Text>
            <ControlledOption
              moistureLevel={plantFormData.desiredMoistureLevel}
              onSelectOption={handleFormChange}
            />
            <View style={{ marginTop: 20 }}>
              <CustomButton
                label="Submit"
                pill={true}
                fontStyle="buttonBold"
                onPress={() => handleCreatePlant(plantFormData)}
              />
            </View>
      </KeyboardAwareScrollView>
        </View>
        </Modal>
    </>
  );
};

export default PlantFlow;

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
    // width: 300,
    // paddingHorizontal: 22,
    // paddingVertical: 20,
    // backgroundColor: theme.colorLightBlue,
    height: 600,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  photoSelectContainer: {
    height: 200,
  }
});
