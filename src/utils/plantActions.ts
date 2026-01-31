import { deletePlantFromApi, getPlantsFromApi } from "./api/apiCalls";
import { convertFromAPI, convertToAPI } from "./api/convertData";
import { Alert } from "react-native";
import { saveToStorage, getFromStorage } from "./storage";
import { useRouter } from "expo-router";

const getPlants = async () => {
  const response = await getPlantsFromApi();
  const plantsConvertedData = response.map(plantData => convertFromAPI(plantData))
  saveToStorage("plantsData", plantsConvertedData);
};

const deletePlant = async (plantId) => {
  try {
    const response = await deletePlantFromApi(plantId);
  } catch (error) {
    console.log(error);
  }
};

export { deletePlant };
