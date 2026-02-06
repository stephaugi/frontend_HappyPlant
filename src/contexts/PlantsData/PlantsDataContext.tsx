import { createContext, useState, useEffect, useContext } from "react";
import { getPlantsFromApi } from "utils/api/apiCalls";
import { convertFromAPI, convertToAPI } from "utils/api/convertData";
import { updatePlantFromApi, createPlantFromApi } from "utils/api/apiCalls";

const initialPlantsData = [
  {
    averageWaterCycle: null,
    currentMoistureLevel: null,
    description: "",
    desiredMoistureLevel: null,
    id: null,
    name: "",
    nextWaterDate: "",
    photo: "",
  },
];
const PlantsDataContext = createContext(initialPlantsData);

const PlantsDataProvider = ({ children }) => {
  const [plantsData, setPlantsData] = useState(initialPlantsData);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const addPlantsData = async (inputData: object) => {
    const requestBody = convertToAPI(inputData);
    const newPlant = await createPlantFromApi(requestBody);
  };

  const updatePlantsData = async (updates) => {
    const requestBody = convertToAPI({ ...updates });
    const response = convertFromAPI(await updatePlantFromApi(requestBody));
    setSelectedPlant(response);
    setPlantsData(prevPlantsData => {
      return prevPlantsData.map((plant) => {
        return plant.id === response.id ? { ...response } : plant;
      });
    });
  };

  const resetPlantsData = () => {
    setPlantsData({...initialPlantsData});
  };

  const selectPlant = (plantId) => {
    const selected = plantsData.filter(plant => {
      return plant.id === plantId;
    });
    setSelectedPlant(selected[0]);
  };

  const refreshPlantsData = () => {
    const getPlants = async () => {
      const response = await getPlantsFromApi();
      if (response) {
        const plantsConvertedData = response.map((plantData) =>
          convertFromAPI(plantData),
        );
        setPlantsData(plantsConvertedData);
      }
    };
    getPlants();
  };

  const getPlantsToWater = () => {
    const toWater = [];
    for (const plant of plantsData) {
      if (plant.nextWaterDate !== "None") {
        toWater.push(plant);
      }
    }
    return toWater;
  };

  useEffect(() => {
    refreshPlantsData();
  }, []);

  return (
    <PlantsDataContext.Provider
      value={{
        plantsData,
        selectedPlant,
        addPlantsData,
        updatePlantsData,
        resetPlantsData,
        refreshPlantsData,
        selectPlant,
        getPlantsToWater,
      }}
    >
      {children}
    </PlantsDataContext.Provider>
  );
};

const usePlantsData = () => useContext(PlantsDataContext);

export { PlantsDataProvider, usePlantsData };