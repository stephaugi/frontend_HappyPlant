import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { createContext, useState, useEffect, useContext } from "react";
import { getMoistureFromApi } from "utils/api/apiCalls";

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
  const [trackerMoistureData, setTrackerMoistureData] = useState(null);
  const { selectedPlant } = usePlantsData();

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
    if (selectedPlant) {
      const getMoisture = async () => {
        // const currentPlant = await getFromStorage("currentSelectedPlant");
        // const response = await getMoistureFromApi(currentPlant.id);
        const response = await getMoistureFromApi(selectedPlant.id);
        setTrackerMoistureData(response);
      };
      getMoisture();
    }
  };

  useEffect(() => {
    refreshTrackerMoistureData();
  }, [selectedPlant]);

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