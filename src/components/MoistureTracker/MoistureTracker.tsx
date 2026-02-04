import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../UI/CustomButton";
import { Picker } from "@react-native-picker/picker";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme, fontStyles, uiStyles } from "../../theme";
import { saveToStorage, getFromStorage } from "../../utils/storage";
import { convertFromAPI } from "../../utils/api/convertData";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  getPlantsFromApi,
  getOnePlantFromApi,
  getMoistureFromApi,
  updateMoistureFromApi,
  updateWaterFromApi,
  getWaterFromApi,
} from "../../utils/api/apiCalls";

const optionsList = [
  {
    label: "Very Dry",
    value: 1,
  },
  {
    label: "Dry",
    value: 2,
  },
  {
    label: "Normal",
    value: 3,
  },
  {
    label: "Damp",
    value: 4,
  },
  {
    label: "Wet",
    value: 5,
  },
  {
    label: "Very Wet",
    value: 6,
  },
];

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

const MoistureTracker = () => {
  const [selectedDay, setSelectedDay] = useState({ selectedDate: today });
  const [moistureFormData, setMoistureFormData] = useState(kDefaultMoistureForm);
  const [waterFormData, setWaterFormData] = useState(kDefaultWaterForm);
  const [plantsData, setPlantsData] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState([]);
  const [moistureData, setMoistureData] = useState({});
  const [waterData, setWaterData] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function fetchInitial() {
        const response = await getPlantsFromApi();
        const storedSelectedPlant = await getFromStorage("currentSelectedPlant");
        saveToStorage("plantsData", response.map(plantData => convertFromAPI(plantData)));
        setPlantsData(response.map((plantData) => convertFromAPI(plantData)));
        // get moisture data from api and save to storage/state
        if (storedSelectedPlant) {
          setSelectedPlant(storedSelectedPlant);
          const moisture = await getMoistureFromApi(storedSelectedPlant.id);
          saveToStorage("moistureData", moisture);
          setMoistureData(moisture);
          const water = await getWaterFromApi(storedSelectedPlant.id);
          saveToStorage("waterData", water);
          setWaterData(water);
        }
      }
      fetchInitial();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []));

  const handleSubmit = (selectedDay, moistureFormData, waterFormData) => {
    const moistureRequestData = { [selectedDay.selectedDate]: moistureFormData };
    const waterRequestData = { [selectedDay.selectedDate]: waterFormData };
    // submit logged info in formData for the day
    const submitData = async(moistureRequestData, waterRequestData) => {
      const newMoistureData = await updateMoistureFromApi(selectedPlant.id, moistureRequestData);
      saveToStorage("moistureData", newMoistureData);
      setMoistureData(newMoistureData);
      const newWaterData = await updateWaterFromApi(selectedPlant.id, waterRequestData);
      saveToStorage("waterData", newWaterData);
      setWaterData(newWaterData);
    };

    const submitDataUpdatePlants = (moistureRequestData, waterRequestData, selectedPlant) => {
      submitData(moistureRequestData, waterRequestData).then(async() => {
        const newPlantData = await getOnePlantFromApi(selectedPlant.id);
        const converted = convertFromAPI(newPlantData);
        setSelectedPlant(converted);
        saveToStorage("currentSelectedPlant", converted);
        const updatedPlantsData = plantsData.map(plantData => {
          if (plantData.id === selectedPlant.id) {
            return converted;
          } else {
            return plantData;
          }
        });
        setPlantsData(updatedPlantsData);
        saveToStorage("plantsData", updatedPlantsData);

        if ((converted.currentMoistureLevel) &&  (converted.currentMoistureLevel <= converted.desiredMoistureLevel) ){
          Alert.alert("Watering Reminder",`Remember to water ${converted.name}! It looks like it's ready for a drink.`)
        }
      });
    };
    // submitWaterData(waterRequestData);
    submitDataUpdatePlants(moistureRequestData, waterRequestData, selectedPlant);
    // call api to save changes to moisture/water
  };

  const selectPlant = (id) => {
    const data = plantsData.filter(plantData => plantData.id === id)

    setSelectedPlant(data[0]);
    saveToStorage("currentSelectedPlant", data[0]);
    const getMoistureLogs = async (id) => {
      try {
        const moistureLogs = await getMoistureFromApi(id);
        setMoistureData(moistureLogs);
        saveToStorage("moistureData", moistureLogs);

        const waterLogs = await getWaterFromApi(id);
        setWaterData(waterLogs);
        saveToStorage("waterData", waterLogs);

        handleDateChange(selectedDay.selectedDate, moistureLogs, waterLogs);

      } catch (error) {
        console.log(error);
      }
    };
    getMoistureLogs(id);
  };

  const plantOptions = plantsData.map((plant, index) => {
    return (
      <Picker.Item
        key={`${index}${plant.id}`}
        label={plant.name}
        value={plant.id}
      />
    );
  });

  const handleWaterFormChange = (inputName: string, inputValue: any) => {
    return setWaterFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };
  const handleMoistureFormChange = (inputName: string, inputValue: any) => {
    return setMoistureFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  const handleDateChange = (newDate, inputMoisture, inputWater) => {
    if ((inputMoisture) && (newDate in inputMoisture)) {
      setMoistureFormData(inputMoisture[newDate]);
    } else {
      setMoistureFormData(kDefaultMoistureForm);
    }

    if ((inputWater) && (newDate in inputWater)) {
      setWaterFormData(inputWater[newDate]);
    } else {
      setWaterFormData(kDefaultWaterForm);
    }
  };

  const moistureButtons = optionsList.map((item, index) => {
    return (
      <CustomButton
        key={`${item}${index}`}
        label={item.label}
        size={[90, 90]}
        colorTheme="colorTheme2"
        // selected={formData["moistureLevel"] === item.value}
        selected={moistureFormData["moistureLevel"] === item.value}
        onPress={() => {
          if (moistureFormData["moistureLevel"] !== item.value) {
            handleMoistureFormChange("moistureLevel", item.value);
          } else {
            handleMoistureFormChange("moistureLevel", null);
          }
        }}
      />
    );
  });
  return (<>
      <View style={{ height: 150, marginTop: 30 }}>
        <CalendarProvider
          // style={{ height: 150 }}
          // date={selectedDay.selectedDate}
          date={todayDate}
          disableAutoDaySelection={[
            ExpandableCalendar.navigationTypes.MONTH_SCROLL,
            ExpandableCalendar.navigationTypes.MONTH_ARROWS,
            ExpandableCalendar.navigationTypes.WEEK_SCROLL,
            ExpandableCalendar.navigationTypes.WEEK_ARROWS,
          ]}
        >
          <ExpandableCalendar
            horizontal={true}
            disablePan={true}
            disableWeekScroll={false}
            onDayPress={(day) => {
              handleDateChange(day.dateString, moistureData, waterData);
              setSelectedDay({selectedDate: day.dateString});
            }}
            markedDates={Object.fromEntries([...Object.keys(moistureData).map(moistureDates => {
                return [moistureDates, {marked:true}]
              }),
              [[selectedDay.selectedDate], { selected: true, selectedColor: theme.colorGrey }]]
              )}
          />
        </CalendarProvider>
      </View>
      <View style={styles.trackerContainer}>
        <View>
          <Picker
            style={[{ marginTop: -30, height: 160, width: "100%", textAlign: "center" }]}
            // itemStyle={{ textAlign: "center", backgroundColor: "#b11313" }}
            selectedValue={selectedPlant ? selectedPlant.id : null}
            onValueChange={(itemValue, itemIndex) => {
              selectPlant(itemValue);
              handleDateChange(selectedDay.selectedDate, moistureData, waterData);
            }
            }>
            {plantOptions}
          </Picker>
          <Text style={[fontStyles.header, { alignSelf: "center" }]}>How is the soil feeling today?</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 30,
            paddingVertical: 10,
            backgroundColor: "white",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {moistureButtons}
        </View>
        <View style={[uiStyles.centerAlign, { gap: 10, }]}>

          <CustomButton
            label={waterFormData["watered"] ? "Watered" : "Water"}
            colorTheme="colorTheme2"
            selected={waterFormData["watered"]}
            size={[100]}
            onPress={() => {
              handleWaterFormChange("watered", !waterFormData["watered"]);
            }}
          >
            <Ionicons name="water" size={32} color="white" />
          </CustomButton>
          <CustomButton
            label="Save"
            pill={true}
            fontStyle="buttonBold"
            onPress={() => {
              handleSubmit(selectedDay, moistureFormData, waterFormData);
            }}
          />
        </View>
      </View>

    </>
  );
};

export default MoistureTracker;

const styles = StyleSheet.create({
  trackerContainer: {
    flex: 1,
    // width: "80%",
    height: "90%",
    backgroundColor: "white",
  },
});
