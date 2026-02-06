import { createContext, useState, useEffect, useContext } from "react";
import { getAllMoistureFromApi } from "utils/api/apiCalls";

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
  const [allMoistureData, setAllMoistureData] = useState(getInitialAllMoistureData);

  const updateAllMoistureData = (updates) => {
    setAllMoistureData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetAllMoistureData = () => {
    setAllMoistureData(getInitialAllMoistureData());
  };

  const refreshAllMoistureData = () => {
    const getMoisture = async () => {
      const response = await getAllMoistureFromApi();
      setAllMoistureData(response);
    };
    getMoisture();
  };

  useEffect(() => {
    refreshAllMoistureData();
  }, []);

  return (
    <AllMoistureDataContext.Provider value={{ allMoistureData, updateAllMoistureData, resetAllMoistureData, refreshAllMoistureData }}>
      {children}
    </AllMoistureDataContext.Provider>
  );
};

const useAllMoistureData = () => useContext(AllMoistureDataContext);

export { AllMoistureDataProvider, useAllMoistureData };