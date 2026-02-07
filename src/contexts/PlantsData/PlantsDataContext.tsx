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
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [plantsToWater, setPlantsToWater] = useState(null);

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

  const updateSelectedPlant = (update) => {
    setSelectedPlant({...update});
    setSelectedPlantId(update.id);
  };

  const resetPlantsData = () => {
    setPlantsData({...initialPlantsData});
  };

  const selectPlant = (plantId) => {
    const selected = plantsData.filter(plant => {
      return plant.id === plantId;
    });
    setSelectedPlant(selected[0]);
    setSelectedPlantId(plantId);
  };

  const refreshPlantsData = () => {
    const getPlants = async () => {
      const response = await getPlantsFromApi();
      if (response) {
        const plantsConvertedData = response.map((plantData) =>
          convertFromAPI(plantData),
        );
        setPlantsData(plantsConvertedData);
        getPlantsToWater(plantsConvertedData);
        if (!selectedPlant) {
          setSelectedPlantId(plantsConvertedData[0].id);
          setSelectedPlant(plantsConvertedData[0]);
        } else {
          const select = plantsConvertedData.filter(plant => plant.id === selectedPlantId);
          setSelectedPlant(select[0]);
          setSelectedPlantId(select[0].id);
        }
      }
    };
    getPlants();
  };

  const getPlantsToWater = (plants) => {
    const toWater = [];
    for (const plant of plants) {
      if (plant.nextWaterDate !== "None") {
        toWater.push(plant);
      }
    }
    setPlantsToWater([...toWater]);
  };

  useEffect(() => {
    refreshPlantsData();
  }, []);

  // useEffect(() => {
  //   if (!selectedPlant) {
  //     setSelectedPlantId(plantsData[0].id);
  //     setSelectedPlant(plantsData[0]);
  //   } else {
  //     const select = plantsData.filter(plant => plant.id === selectedPlantId);
  //     setSelectedPlant(select[0]);
  //   }
  // }, [plantsData]);

  return (
    <PlantsDataContext.Provider
      value={{
        plantsData,
        selectedPlant,
        plantsToWater,
        addPlantsData,
        updatePlantsData,
        updateSelectedPlant,
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