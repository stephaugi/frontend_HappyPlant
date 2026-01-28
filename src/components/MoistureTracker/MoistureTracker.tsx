import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from "../../theme";
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
  moistureLevel: null,
  watered: false,
};

const MoistureTracker = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [formData, setFormData] = useState(kDefaultForm);

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
  const moistureButtons = optionsList.map((item,index) => {
    return (
      <TouchableOpacity
        key={`${item}${index}`}
        style={[
          styles.moistureButton,
          formData["moistureLevel"] === item.value ? styles.selectedButton : null,
        ]}
        activeOpacity={0.8}
        onPress={() => {
          if (formData["moistureLevel"] !== item.value) {
            handleFormChange("moistureLevel", item.value);
          } else {
            handleFormChange("moistureLevel", null);
          }
        }}
      >
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    );
  });
  return (<>
      <CalendarProvider date="2026-01-27">
        <ExpandableCalendar
        // horizontal={true}
        />
        <View style={styles.trackerContainer}>
          <View style={styles.selectPlantButton}>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.label}>Select Plant</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingHorizontal: 30,
              paddingVertical: 30,
              backgroundColor: "white",
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {moistureButtons}
          </View>
          <View>
            <TouchableOpacity
              style={[styles.waterButton, formData["watered"] ? styles.selectedButton : null]}
              onPress={() => {
                handleFormChange("watered", !formData["watered"]);

              }}
            >
              <Text style={styles.label}>{formData["watered"] ? "Watered" : "Water"}</Text>
              <Ionicons name="water" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.waterButton}
              hitSlop={20}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.label}>Save</Text>
            </TouchableOpacity>
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
  selectPlantButton: {
    backgroundColor: theme.colorBlue,
  },
  moistureButton: {
    width: 74,
    height: 80,
    backgroundColor: theme.colorBlue,
    justifyContent: "center",
  },
  waterButton: {
    backgroundColor: theme.colorBlue,
    alignSelf: "center",
    alignItems: "center",
    width: 150,
    padding: 10,
    margin: 6,
  },
  selectedButton: {
    backgroundColor: theme.colorTheme1Light,
  },
  label: {
    fontSize: 24,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
});
