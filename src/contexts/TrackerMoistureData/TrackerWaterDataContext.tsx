import { createContext, useState, useEffect, useContext } from "react";
import { getWaterFromApi } from "utils/api/apiCalls";
import { getFromStorage } from "utils/storage";

const TrackerWaterDataContext = createContext();

const initialTrackerWaterData = {
  "2026-01-26": {
    "Xiao Mao": { id: 12, watered: false, plantId: 2, plantName: "Xiao mao" },
    "Danger": { id: 1, watered: false, plantId: 1, plantName: "Danger" },
  }
  };


const TrackerWaterDataProvider = ({ children }) => {
  const [trackerWaterData, setTrackerWaterData] = useState(initialTrackerWaterData);

  const updateTrackerWaterData = (updates) => {
    setTrackerWaterData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetTrackerWaterData = () => {
    setTrackerWaterData(getInitialTrackerWaterData());
  };

  const refreshTrackerWaterData = () => {
    const getWater = async () => {
      const currentPlant = await getFromStorage("currentSelectedPlant");
      const response = await getWaterFromApi(currentPlant.id);
      setTrackerWaterData(response);
    };
    getWater();
  };

  useEffect(() => {
    refreshTrackerWaterData();
  }, []);

  return (
    <TrackerWaterDataContext.Provider value={{ trackerWaterData, updateTrackerWaterData, resetTrackerWaterData, refreshTrackerWaterData }}>
      {children}
    </TrackerWaterDataContext.Provider>
  );
};

const useTrackerWaterData = () => useContext(TrackerWaterDataContext);

export { TrackerWaterDataProvider, useTrackerWaterData };