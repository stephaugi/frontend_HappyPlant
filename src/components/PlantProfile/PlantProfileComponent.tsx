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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { theme } from "../../theme";


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
              label="Save"
              pill={true}
              fontStyle="buttonBold"
              size={["100%"]}
              onPress={() => handleUpdatePlant(plantFormData)}
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
    // 
  },
  textInputsContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
});

export default PlantProfileComponent;

//     <View style={styles.formContainer}>
//       <KeyboardAwareScrollView
//         enableOnAndroid={true}
//       >
//       <View>
//       <ImageSelector
//         onSelectImage={handleFormChange}
//         selectedImage={plantFormData["photo"]}
//         />
//         </View>
//       <View style={styles.textInputsContainer}>
//       <ControlledTextInput
//         labelName="Name"
//         name="name"
//         onChangeText={handleFormChange}
//         placeholder="Add a name"
//         value={plantFormData["name"]}
//       />

//       <ControlledTextInput
//         labelName="Description"
//         name="description"
//         onChangeText={handleFormChange}
//         placeholder="Write something about your plant"
//         value={plantFormData["description"]}
//         textAreaHeight={100}
//         textArea={true}
//       />
//       <ControlledTextInput
//         labelName="Plant Species"
//         name="plantSpecies"
//         onChangeText={handleFormChange}
//         placeholder="What plant species are they?"
//         value={plantFormData["plantSpecies"]}
//       />
//       <View>
//       <Text style={fontStyles.emphasis}>When to water</Text>
//         <ControlledOption
//           moistureLevel={plantFormData.desiredMoistureLevel}
//           onSelectOption={handleFormChange}
//         />
//       </View>
//       <CustomButton
//       label="Save"
//       onPress={() => handleUpdatePlant(plantFormData)}
//       />
//       </View>
//     </KeyboardAwareScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   textInputsContainer: {
//     marginHorizontal: 20,
//     marginTop: 10,
//   },
//   formContainer: {
//     flex: 1,
//     height: 600,
//   },
  
// });

// export default PlantProfileComponent;
