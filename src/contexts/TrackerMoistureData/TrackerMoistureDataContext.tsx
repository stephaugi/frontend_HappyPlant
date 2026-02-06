import { createContext, useState, useEffect, useContext } from "react";
import { getMoistureFromApi } from "utils/api/apiCalls";
import { getFromStorage } from "utils/storage";

const TrackerMoistureDataContext = createContext();

const getInitialTrackerMoistureData = () => {
  return {
    "2026-01-26": [
      { id: 12, moistureLevel: 4, plantId: 2, plantName: "Xiao mao" },
      { id: 1, moistureLevel: 2, plantId: 1, plantName: "Danger" },
    ],
  };
};

const TrackerMoistureDataProvider = ({ children }) => {
  const [trackerMoistureData, setTrackerMoistureData] = useState(getInitialTrackerMoistureData);

  const updateTrackerMoistureData = (updates) => {
    setTrackerMoistureData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetTrackerMoistureData = () => {
    setTrackerMoistureData(getInitialTrackerMoistureData());
  };

  const refreshTrackerMoistureData = () => {
    const getMoisture = async () => {
      const currentPlant = await getFromStorage("currentSelectedPlant");
      const response = await getMoistureFromApi(currentPlant.id);
      setTrackerMoistureData(response);
    };
    getMoisture();
  };

  useEffect(() => {
    refreshTrackerMoistureData();
  }, []);

  return (
    <TrackerMoistureDataContext.Provider value={{ trackerMoistureData, updateTrackerMoistureData, resetTrackerMoistureData, refreshTrackerMoistureData }}>
      {children}
    </TrackerMoistureDataContext.Provider>
  );
};

const useTrackerMoistureData = () => useContext(TrackerMoistureDataContext);

export { TrackerMoistureDataProvider, useTrackerMoistureData };