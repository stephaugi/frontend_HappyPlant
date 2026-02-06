import { View, Text, StyleSheet, Alert } from "react-native";
import { fontStyles } from "../../theme";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ImageSelector from "../PlantForm/ImageSelector";
import ControlledTextInput from "../PlantForm/ControlledTextInput";
import ControlledOption from "../PlantForm/ControlledOption";
import CustomButton from "components/UI/CustomButton";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";

const kDefaultForm = {
  name: "",
  description: "",
  desiredMoistureLevel: 1,
  photo: "",
};

const NewPlantForm = () => {
  const { plantsData, addPlantsData, selectPlant } = usePlantsData();
  const [plantFormData, setPlantFormData] = useState(kDefaultForm);

  const router = useRouter();

  const handleAddPlant = (plantFormData: Object) => {
    addPlantsData(plantFormData).then(() => {
      Alert.alert("Created!", "", [
        {
          text: "OK",
          onPress: () => router.back(),
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
      onPress={() => handleAddPlant(plantFormData)}
      />
    </View>
  );
};
export default NewPlantForm;

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




// export function NewPlantForm() {
//   const [plantFormData, setPlantFormData] = useState(kDefaultForm);
//   const router = useRouter();
//   const handleCreatePlant = async (inputData: object) => {
//     const requestBody = convertToAPI(inputData);
//     const newPlant = await createPlantFromApi(requestBody);
//     router.back();
//   };

//   const handleFormChange = (inputName: string, inputValue: string) => {
//     if (inputValue.length <= 100) {
//       return setPlantFormData((prevFormData) => {
//         return { ...prevFormData, [inputName]: inputValue };
//       });
//     }
//   };
//   return (
//     <View style={styles.formContainer}>
//       <ControlledTextInput
//         labelName="Name"
//         name="name"
//         onChangeText={handleFormChange}
//         placeholder="Add a name"
//         value={plantFormData["name"]}
//       />
//       <View style={styles.photoSelectContainer}>
//       <ImageSelector
//         onSelectImage={handleFormChange}
//         selectedImage={plantFormData["photo"]}
//         />
//         </View>
//       <ControlledTextInput
//         labelName="Description"
//         name="description"
//         onChangeText={handleFormChange}
//         placeholder="Write something about your plant"
//         value={plantFormData["description"]}
//         textAreaHeight={100}
//         textArea={true}
//       />
//       <Text style={fontStyles.emphasis}>When to water</Text>
//       <ControlledOption
//         moistureLevel={plantFormData.desiredMoistureLevel}
//         onSelectOption={handleFormChange}
//       />
//       <View style={{ marginTop: 20 }}>
//         <CustomButton
//           label="Submit"
//           pill={true}
//           fontStyle="buttonBold"
//           onPress={() => handleCreatePlant(plantFormData)}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     borderColor: theme.colorBlue,
//     borderWidth: 1,
//     backgroundColor: theme.colorBlue,
//     borderRadius: theme.cornerRound,
//     padding: 10,
//     marginTop: 30,
//     width: 100,
//     alignSelf: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: theme.formTextSize,
//     fontWeight: "800",
//     textAlign: "center",
//   },
//   formContainer: {
//     flex: 1,
//     paddingHorizontal: 22,
//     paddingVertical: 20,
//     // backgroundColor: theme.colorLightBlue,
//     height: 600,
//     marginHorizontal: 20,
//     borderRadius: 16,
//   },
//   photoSelectContainer: {
//     height: 200,
//   }
// });
