import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { useTrackerMoistureData } from "./TrackerData/TrackerMoistureDataContext";
import { useTrackerWaterData } from "./TrackerData/TrackerWaterDataContext";
import { usePlantsData } from "./PlantsData/PlantsDataContext";
import { convertFromAPI } from "utils/api/convertData";
import { getOnePlantFromApi, updateMoistureFromApi, updateWaterFromApi } from "utils/api/apiCalls";
import { theme } from "theme";
import { Alert } from "react-native";

const TrackerContext = createContext();

const kDefaultMoistureForm = {
  id: null,
  moistureLevel: null,
};

const kDefaultWaterForm = {
  id: null,
  watered: false,
};
const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];

const TrackerProvider = ({ children }) => {
  const { plantsData, selectedPlant, refreshPlantsData, updateSelectedPlant } = usePlantsData();
  const { trackerWaterData, refreshTrackerWaterData } = useTrackerWaterData();
  const { trackerMoistureData,refreshTrackerMoistureData } = useTrackerMoistureData();

  const [moistureFormData, setMoistureFormData] = useState(kDefaultMoistureForm);
  const [waterFormData, setWaterFormData] = useState(kDefaultWaterForm);
  const [selectedDay, setSelectedDay] = useState(today);
  const [trackedDates, setTrackedDates] = useState(null);

  const submitData = () => {
    const moistureRequestData = { [selectedDay]: moistureFormData };
    const waterRequestData = { [selectedDay]: waterFormData };
    // // submit logged info in formData for the day
    const updateAPI = async(moistureRequestData, waterRequestData) => {
      const newMoistureData = await updateMoistureFromApi(selectedPlant.id, moistureRequestData);
      const newWaterData = await updateWaterFromApi(selectedPlant.id, waterRequestData);
      const newPlantData = convertFromAPI(await getOnePlantFromApi(selectedPlant.id));
      // updateSelectedPlant(newPlantData);
      if (newPlantData.currentMoistureLevel <= newPlantData.desiredMoistureLevel) {
        Alert.alert("Watering Alert!", `Looks like ${newPlantData.name} is ready for a drink!`);
      }
    };
    updateAPI(moistureRequestData, waterRequestData);
    // refreshPlantsData();
  };


  const updateWaterForm = (inputName: string, inputValue: any) => {
    return setWaterFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };
  const updateMoistureForm = (inputName: string, inputValue: any) => {
    return setMoistureFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  const changeDate = (newDate) => {
    setSelectedDay(newDate);
    if ((trackerMoistureData) && (newDate in trackerMoistureData)) {
      setMoistureFormData(trackerMoistureData[newDate]);
    } else {
      setMoistureFormData(kDefaultMoistureForm);
    }

    if ((trackerWaterData) && (newDate in trackerWaterData)) {
      setWaterFormData(trackerWaterData[newDate]);
    } else {
      setWaterFormData(kDefaultWaterForm);
    }
  };

  const getMarkedDates = () => {
    return setTrackedDates(Object.fromEntries([...Object.keys(trackerMoistureData).map(moistureDates => {
          return [moistureDates, {marked:true}]
        }
      )
    ]));
  };

  // useEffect(() => {
  //   changeDate(selectedDay);
  // }, []);

  useEffect(() => {
    changeDate(selectedDay);
    if (trackerMoistureData) {
      getMarkedDates();
    }
  }, [trackerMoistureData, trackerWaterData]);

  useEffect(() => {
    if (!selectedPlant) return;
    if (selectedPlant.currentMoistureLevel <= selectedPlant.desiredMoistureLevel) {
      Alert.alert("Watering Alert!", `Looks like ${selectedPlant.name} is ready for a drink!`);
    };
  }, [selectedPlant]);

  return (
    <TrackerContext.Provider value={{ waterFormData, moistureFormData, selectedDay, trackedDates, updateWaterForm, updateMoistureForm, changeDate, submitData }}>
      {children}
    </TrackerContext.Provider>
  );

};

const useTracker = () => useContext(TrackerContext);

export { TrackerProvider, useTracker };