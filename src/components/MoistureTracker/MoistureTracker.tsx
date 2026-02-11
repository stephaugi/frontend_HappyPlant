import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme, fontStyles, uiStyles } from "../../theme";
import React from "react";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useTracker } from "contexts/TrackerContext";
import CustomPicker from "components/UI/CustomPicker";
import { StatusBar } from "expo-status-bar";

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

const customTheme = {
  // Calendar background color
  // calendarBackground: theme.colorWhite,
  // // Text color for the month title
  // monthTextColor: theme.colorLightBlue,
  // monthTextWeight: "500",
  // // Color for today's date text
  // todayTextColor: '#00 internal link 255 0', 
  // // Default text color for all days
  // dayTextColor: theme.colorGrey,
  // selectedDayTextColor: theme.colorWhite,
  dotColor: theme.colorLightBlue,
  todayDotColor: theme.colorLightBlue,
  // selectedDotColor: theme.colorOrange,
  todayTextColor: theme.colorLightBlue,
  arrowColor: theme.colorBlue,
    calendarBackground: theme.colorLightGrey,
  textSectionTitleColor: theme.colorGrey, // For all weekdays
  // 'stylesheet.calendar.header': {
  //   // This will apply a general style to the week header container
  //   week: {
  //     marginTop: 7,
  //     marginBottom: 7,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     // Note: Directly styling individual day text color for specific days (Sat/Sun) 
  //     // is not straightforward with the 'theme' prop alone. The 'textSectionTitleColor'
  //     // sets the color for ALL day headers.
  //   },
  //   // You can also try to target the header's text elements if the library 
  //   // structure allows, but this is less reliable across versions.
  // },
  // textSectionTitleColor: theme.colorBlue, // For all weekdays

};

const MoistureTracker = () => {
  const { plantsData, selectPlant, selectedPlant } = usePlantsData();
  const {
    waterFormData,
    moistureFormData,
    selectedDay,
    trackedDates,
    updateWaterForm,
    updateMoistureForm,
    changeDate,
    submitData,
  } = useTracker();

  const moistureButtons = optionsList.map((item, index) => {
    return (
      <CustomButton
        key={`${item}${index}`}
        label={item.label}
        size={[90, 90]}
        colorTheme="colorTheme2"
        selected={moistureFormData["moistureLevel"] === item.value}
        onPress={() => {
          if (moistureFormData["moistureLevel"] !== item.value) {
            updateMoistureForm("moistureLevel", item.value);
          } else {
            updateMoistureForm("moistureLevel", null);
          }
        }}
      />
    );
  });

  return (<>
      <StatusBar style="auto" />
      <View style={{ height: 150, marginTop: 30, backgroundColor: theme.colorLightBlue }}>
        <CalendarProvider
          style={{ elevation: 0 }}
          // style={{backgroundColor:"transparent"}}
          // theme={{calendarBackground: "transparent"}}
          // theme={customTheme}
          date={selectedDay}
          disableAutoDaySelection={[
            ExpandableCalendar.navigationTypes.MONTH_SCROLL,
            ExpandableCalendar.navigationTypes.MONTH_ARROWS,
            ExpandableCalendar.navigationTypes.WEEK_SCROLL,
            ExpandableCalendar.navigationTypes.WEEK_ARROWS,
          ]}
        >
          <ExpandableCalendar
            // style={{backgroundColor:"transparent"}}
            theme={customTheme}
            style={{ elevation: 0 }}
            horizontal={true}
            disablePan={true}
            disableWeekScroll={false}
            onDayPress={(day) => {
              changeDate(day.dateString);
            }}
            markedDates={{...trackedDates,
              [selectedDay]: { selected: true, selectedColor: theme.colorLightBlue },
            }}
          />
        </CalendarProvider>
      </View>
      <View style={styles.trackerContainer}>
        <View>
          <CustomPicker />
          <Text style={[fontStyles.header, { alignSelf: "center", color: theme.colorLightBlue }]}>How is the soil feeling today?</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: 30,
            paddingVertical: 10,
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
              updateWaterForm("watered", !waterFormData["watered"]);
            }}
          >
            <Ionicons name="water" size={32} color="white" />
          </CustomButton>
          <CustomButton
            label="Save"
            colorTheme="colorTheme1"
            pill={true}
            fontStyle="buttonBold"
            size={["100%"]}
            onPress={() => {
              submitData(selectedDay);
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
    // backgroundColor: theme.colorLightBlue,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
});
