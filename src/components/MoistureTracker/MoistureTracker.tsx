import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import {Picker} from '@react-native-picker/picker';
import { CalendarProvider, ExpandableCalendar} from "react-native-calendars";
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme, fontStyles, colorStyles, uiStyles } from "../../theme";
import { useState } from "react";

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

const moistureLogInfo = {
  "2026-01-29": {
    id: 3,
    moistureLevel: 3,
  },
  "2026-01-25": {
    id: null,
    moistureLevel: 4,
  },
};

const waterLogInfo = {
  "2026-01-29": {
    id: 3,
    watered: 3,
  },
  "2026-01-25": {
    id: null,
    moistureLevel: 4,
  },
};

const defMoistureChanges = {
};



type Props = {
  plantsData: object[];
  moistureData?: object;
  waterData?: object;
  selectedPlant?: object;
  onSelectPlant: Function;
  onSubmit: Function;
};
const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];

const MoistureTracker = ({plantsData, moistureData, waterData, selectedPlant, onSelectPlant, onSubmit}: Props) => {
  const [selectedDay, setSelectedDay] = useState({selectedDate: today});
  const [selectedButton, setSelectedButton] = useState(null);
  const [moistureFormData, setMoistureFormData] = useState(kDefaultMoistureForm);
  const [waterFormData, setWaterFormData] = useState(kDefaultWaterForm);
  

  // const [selectedDayData, setSelectedDayData] = useState(null);
  // use moisture log data if there is data. Otherwise don't use it. do this for date change

   // Format as 'YYYY-MM-DD'
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

  const handleDateChange = (newDate) => {
    if ((moistureData) && (newDate in moistureData)) {
      setMoistureFormData(moistureData[newDate]);
    } else {
      setMoistureFormData(kDefaultMoistureForm);
    }

    if ((waterData) && (newDate in waterData)) {
      setWaterFormData(waterData[newDate]);
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
              handleDateChange(day.dateString);
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
              onSelectPlant(itemValue);
              handleDateChange(selectedDay.selectedDate);
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
              console.log(waterFormData);
              onSubmit(selectedDay, moistureFormData, waterFormData);
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
