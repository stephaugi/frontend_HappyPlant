import {
  convertMoistureFromAPI,
  convertAllMoistureFromAPI,
  convertMoistureToAPI,
  convertWaterFromAPI,
  convertWaterToAPI,
} from "./convertData";

const apiUrl = "https://backend-happyplant.onrender.com";
// const apiUrl = "http://127.0.0.1:5000";
const ownerId = 1;

const getOwnersFromApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/owners`);
    const owners = await response.json();
    return owners;
  } catch (error) {
    console.log(error);
  }
};

const getPlantsFromApi = async () => {
  try {
    const response = await fetch(`${apiUrl}/owners/1/plants`);
    const plants = await response.json();
    // console.log(plants);
    return plants;
  } catch (error) {
    console.log(error);
  }
};

const getOnePlantFromApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/plants/${id}`);
    const plants = await response.json();
    return plants;
  } catch (error) {
    console.log(error);
  }
};

const createPlantFromApi = async (requestBody) => {
  try {
    const response = await fetch(`${apiUrl}/owners/1/plants`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const newPlant = await response.json();
    return newPlant;
  } catch (error) {
    console.log(error);
  }
};

const updatePlantFromApi = async (requestBody) => {
  try {
    const requestUrl = `${apiUrl}/plants/${requestBody.id}`;
    const response = await fetch(requestUrl, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const newPlant = await response.json();
    return newPlant;
  } catch (error) {
    console.log(error);
  }
};

const deletePlantFromApi = async (id) => {
  try {
    const requestUrl = `${apiUrl}/plants/${id}`;
    const response = await fetch(requestUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // const newPlant = await response.json();
    // return newPlant;
  } catch (error) {
    console.log(error);
  }
};

const getMoistureFromApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/plants/${id}/moisture`);
    const moistureLogs = await response.json();
    return convertMoistureFromAPI(moistureLogs);
  } catch (error) {
    console.log(error);
  }
};
const getAllMoistureFromApi = async (ownerId=1) => {
  try {
    const response = await fetch(`${apiUrl}/owners/${ownerId}/moisture`);
    const moistureLogs = await response.json();
    return convertAllMoistureFromAPI(moistureLogs);
  } catch (error) {
    console.log(error);
  }
};

const updateMoistureFromApi = async (id, inputData) => {
  try {
    const requestBody = convertMoistureToAPI(inputData);
    console.log("checking data");
    console.log(requestBody);
    const requestUrl = `${apiUrl}/plants/${id}/moisture`;
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const newMoistureLog = await response.json();
    return convertMoistureFromAPI(newMoistureLog);
  } catch (error) {
    console.log(error);
  }
};

const getWaterFromApi = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/plants/${id}/water`);
    const waterLogs = await response.json();
    return convertWaterFromAPI(waterLogs);
  } catch (error) {
    console.log(error);
  }
};

const getAllWaterFromApi = async (ownerId=1) => {
  try {
    const response = await fetch(`${apiUrl}/owners/${ownerId}/moisture`);
    const waterLogs = await response.json();
    return convertAllWaterFromAPI(waterLogs);
  } catch (error) {
    console.log(error);
  }
};

const updateWaterFromApi = async (id, inputData) => {
  try {
    const requestBody = convertWaterToAPI(inputData);
    console.log(requestBody);
    const requestUrl = `${apiUrl}/plants/${id}/water`;
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const newWaterLog = await response.json();
    return convertWaterFromAPI(newWaterLog);
  } catch (error) {
    console.log(error);
  }
};

export {
  getOwnersFromApi,
  getPlantsFromApi,
  getOnePlantFromApi,
  createPlantFromApi,
  updatePlantFromApi,
  deletePlantFromApi,
  getMoistureFromApi,
  getAllMoistureFromApi,
  updateMoistureFromApi,
  updateWaterFromApi,
  getWaterFromApi,
  getAllWaterFromApi,
};
