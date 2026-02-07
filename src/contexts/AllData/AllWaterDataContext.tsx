import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { createContext, useState, useEffect, useContext } from "react";
import { getAllWaterFromApi } from "utils/api/apiCalls";

const AllWaterDataContext = createContext();

const getInitialAllWaterData = () => {
  return {
    "2026-01-18": [{ id: 7, plantId: 3, plantName: "Janice", watered: true },
      { id: 5, plantId: 2, plantName: "Xiao mao", watered: true },
    ],
    "2026-01-24": [{ id: 4, plantId: 2, plantName: "Xiao mao", watered: true }],
  };
};

const AllWaterDataProvider = ({ children }) => {
  const [allWaterData, setAllWaterData] = useState(null);
  const { plantsData } = usePlantsData();

  const updateAllWaterData = (updates) => {
    setAllWaterData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetAllWaterData = () => {
    setAllWaterData(getInitialAllWaterData());
  };

  const refreshAllWaterData = () => {
    const getWater = async () => {
      const response = await getAllWaterFromApi();
      setAllWaterData(response);
    };
    getWater();
  };

  useEffect(() => {
    refreshAllWaterData();
  }, []);

  useEffect(() => {
    refreshAllWaterData();
  }, [plantsData]);

  return (
    <AllWaterDataContext.Provider value={{ allWaterData, updateAllWaterData, resetAllWaterData, refreshAllWaterData }}>
      {children}
    </AllWaterDataContext.Provider>
  );
};

const useAllWaterData = () => useContext(AllWaterDataContext);

export { AllWaterDataProvider, useAllWaterData };