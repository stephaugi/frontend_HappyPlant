const getOwnersFromApi = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/owners");
    const owners = await response.json();
    return owners;
  } catch (error) {
    console.log(error);
  }
};

const getPlantsFromApi = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/owners/1/plants");
    const plants = await response.json();
    return plants;
  } catch (error) {
    console.log(error);
  }
};

const createPlantFromApi = async (requestBody) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/owners/1/plants", {
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
    const requestUrl = `http://127.0.0.1:5000/plants/${requestBody.id}`;
    const response = await fetch(requestUrl, {
      method: "PUT",
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

export {
  getOwnersFromApi,
  getPlantsFromApi,
  createPlantFromApi,
  updatePlantFromApi,
};
