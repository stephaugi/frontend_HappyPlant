import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../UI/CustomButton";
import {Picker} from '@react-native-picker/picker';
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
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

const kDefaultForm = {
  timeStamp: "",
  moistureLevel: null,
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
const defWaterChanges = {
};

const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];

type Props = {
  plantsData: object[];
  moistureData?: object;
  waterData?: object;
};

const MoistureTracker = ({plantsData, moistureData, waterData}: Props) => {
  const [selectedDay, setSelectedDay] = useState({selectedDate: "2026-01-29"});
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [moistureLogs, setMoistureLogs] = useState();
  // const [moistureChanges, setMoistureChanges] = useState(defMoistureChanges);
  // const [waterChanges, setWaterChanges] = useState(defWaterChanges);


  const [formData, setFormData] = useState(kDefaultForm);
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

  const handleFormChange = (inputName: string, inputValue: any) => {
    return setFormData((prevFormData) => {
      return { ...prevFormData, [inputName]: inputValue };
    });
  };

  const handleSubmit = () => {
    console.log(`Submitting data! ${formData}`);
    // call api to create moisture log, or edit existing one?
    // with api call, see if there is a log for this date + plant. If not, send post request
    // if log exists, send patch request.
  };

  const moistureButtons = optionsList.map((item, index) => {
    return (
      <CustomButton
        key={`${item}${index}`}
        label={item.label}
        size={[90, 90]}
        colorTheme="colorTheme2"
        selected={formData["moistureLevel"] === item.value}
        onPress={() => {
          if (formData["moistureLevel"] !== item.value) {
            handleFormChange("moistureLevel", item.value);
          } else {
            handleFormChange("moistureLevel", null);
          }
        }}
      />
    );
  });
  return (<>
      <CalendarProvider date="2026-01-27">
        <ExpandableCalendar
          onDayPress={(day) => {
            setSelectedDay({selectedDate: day.dateString});
          }}
          markedDates={{
            [selectedDay]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#F1EFFE',
              selectedTextColor: '#7954FA',
            },
          }}
        />
        <View style={styles.trackerContainer}>
          <View>
            <Picker
              style={[{ marginTop: -50, height: 160, width: "100%" }]}
              selectedValue={selectedPlant ? selectedPlant : null}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPlant(itemValue)
              }>
              {plantOptions}
            </Picker>

            {/* <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker> */}
            {/* <CustomButton
              label={selectedPlant ? selectedPlant : "Select Plant"}
              colorTheme="colorTheme1"
              // size={[300]}
              onPress={() => console.log("selected plant")}>
            </CustomButton> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingHorizontal: 30,
              paddingVertical: 10,
              backgroundColor: "white",
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {moistureButtons}
          </View>
          <View style={uiStyles.centerAlign}>

            <CustomButton
              label={formData["watered"] ? "Watered" : "Water"}
              colorTheme="colorTheme2"
              selected={formData["watered"]}
              size={[100]}
              onPress={() => {
                handleFormChange("watered", !formData["watered"]);
              }}
            >
              <Ionicons name="water" size={32} color="white" />
            </CustomButton>
            <CustomButton
              label="Save"
              pill={true}
              fontStyle="buttonBold"
              onPress={() => {
                handleSubmit();
              }}
            />

          </View>
        </View>
      </CalendarProvider>
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
