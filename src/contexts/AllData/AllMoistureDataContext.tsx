import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { createContext, useState, useEffect, useContext } from "react";
import { getAllMoistureFromApi } from "utils/api/apiCalls";
import { theme } from "theme";

const AllMoistureDataContext = createContext();

const getInitialAllMoistureData = () => {
  return {
    "2026-01-26": [
      { id: 12, moistureLevel: 4, plantId: 2, plantName: "Xiao mao" },
      { id: 1, moistureLevel: 2, plantId: 1, plantName: "Danger" },
    ],
  };
};

const AllMoistureDataProvider = ({ children }) => {
  const { plantsData } = usePlantsData();
  const [allMoistureData, setAllMoistureData] = useState(null);
  const [moistureDates, setMoistureDates] = useState(null);

  const updateAllMoistureData = (updates) => {
    setAllMoistureData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const getMoistureDates = (data) => setMoistureDates(Object.fromEntries(Object.keys(data).map(moistureDate => {
      return [
        moistureDate,
        { marked: true, dotColor: theme.moistureColor },
      ];
      }
    ))
  );

  const resetAllMoistureData = () => {
    setAllMoistureData(getInitialAllMoistureData());
  };

  const refreshAllMoistureData = () => {
    const getMoisture = async () => {
      const response = await getAllMoistureFromApi();
      setAllMoistureData(response);
      getMoistureDates(response);
    };
    getMoisture();
  };

  useEffect(() => {
    refreshAllMoistureData();
  }, []);

  useEffect(() => {
    refreshAllMoistureData();
  }, [plantsData]);

  return (
    <AllMoistureDataContext.Provider value={{ allMoistureData, moistureDates, updateAllMoistureData, resetAllMoistureData, refreshAllMoistureData }}>
      {children}
    </AllMoistureDataContext.Provider>
  );
};

const useAllMoistureData = () => useContext(AllMoistureDataContext);

export { AllMoistureDataProvider, useAllMoistureData };