import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../UI/CustomButton";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme, fontStyles, uiStyles } from "../../theme";
import React from "react";
import { usePlantsData } from "contexts/PlantsData/PlantsDataContext";
import { useTracker } from "contexts/Tracker";
import CustomPicker from "components/UI/CustomPicker";

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

  // const plantOptions = plantsData.map((plant, index) => {
  //   return (
  //     <Picker.Item
  //       key={`${index}${plant.id}`}
  //       label={plant.name}
  //       value={plant.id}
  //     />
  //   );
  // });

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
      <View style={{ height: 150, marginTop: 30 }}>
        <CalendarProvider
          date={selectedDay}
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
              changeDate(day.dateString);
            }}
            markedDates={{...trackedDates,
              [selectedDay]: { selected: true, selectedColor: theme.colorGrey },
            }}
          />
        </CalendarProvider>
      </View>
      <View style={styles.trackerContainer}>
        <View>
          <CustomPicker />
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
              updateWaterForm("watered", !waterFormData["watered"]);
            }}
          >
            <Ionicons name="water" size={32} color="white" />
          </CustomButton>
          <CustomButton
            label="Save"
            pill={true}
            fontStyle="buttonBold"
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
    backgroundColor: "white",
  },
});
