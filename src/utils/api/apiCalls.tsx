import {
  convertMoistureFromAPI,
  convertMoistureToAPI,
  convertWaterFromAPI,
  convertWaterToAPI,
} from "./convertData";

const apiUrl = "http://127.0.0.1:5000";

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

const updateMoistureFromApi = async (id, inputData) => {
  try {
    const requestBody = convertMoistureToAPI(inputData);
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

const updateWaterFromApi = async (id, inputData) => {
  try {
    const requestBody = convertWaterToAPI(inputData);
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
  createPlantFromApi,
  updatePlantFromApi,
  deletePlantFromApi,
  getMoistureFromApi,
  updateMoistureFromApi,
  updateWaterFromApi,
  getWaterFromApi,
};
