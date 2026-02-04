import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {Calendar, LocaleConfig, Agenda, CalendarList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import PlantAgenda from './PlantAgenda';
import { theme, colorStyles, uiStyles, fontStyles } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const WaterCalendar = ({ plants, plantsToWater, allMoistureLogs, allWaterLogs }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [toWater, setToWater] = useState(plants);

  const water_history = selectedDate && (selectedDate in allWaterLogs) ? allWaterLogs[selectedDate].map((waterLog, index) => {
          return (
            <PlantAgenda
              key={`moistureLog${selectedDate}${index}`}
              upcomingWater={false}
              water={true}
              moisture={false}
              data={waterLog}
            />
          );
        })
      : null;

  const moisture_history = selectedDate && (selectedDate in allMoistureLogs) ? allMoistureLogs[selectedDate].map((moistureLog, index) => {
          return (
            <PlantAgenda
              key={`moistureLog${selectedDate}${index}`}
              upcomingWater={false}
              water={false}
              moisture={true}
              data={moistureLog}
            />
          );
        })
      : null;

  const upcomingWaterDates = plantsToWater ? plantsToWater.map((plant, index) => {
        return (
          <PlantAgenda
            key={`plantAgenda${index}`}
            upcomingWater={true}
            plant={plant}
            water={false}
          />
        );
      }) : null;

  const agendas = selectedDate && (selectedDate in allMoistureLogs) ? moisture_history : upcomingWaterDates;

  const selectedDateWritten = new Date(selectedDate).toLocaleDateString("us-en", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });

  const waterDates = Object.fromEntries(plantsToWater.map(plant => {
    return [plant.nextWaterDate, {marked: true, selectedDotColor: theme.waterColor}]
  }));

  const moistureDates = Object.fromEntries(Object.keys(allMoistureLogs).map(moistureDate => {
    return [moistureDate, {marked: true, dotColor: theme.moistureColor}]
  }));

  return (<>
      <View style={{ flex: 1, marginTop: 30 }}>
        <Calendar
          style={{ width: 300, height: 350, position: "relative", alignSelf: "center" }}
          headerStyle={{ justifyContent: "center" }}
          onDayPress={day => {
            const newDate = (day.dateString == selectedDate) ? null : day.dateString
            setSelectedDate(newDate)}}
          markedDates=
          {{...waterDates, ...moistureDates, [selectedDate]: {selected: true}}}
      />
      <ScrollView >
      <View style={[{ alignItems: "center" }]}>
        <Text style={fontStyles.header}>{selectedDate && (selectedDate in allMoistureLogs) ? `${selectedDateWritten}` : "Upcoming Waterings"}</Text>
        {agendas}{water_history}
      </View>
      </ScrollView>
      </View>
    </>
  );
};

export default WaterCalendar;

const styles = StyleSheet.create({

  label: {
    fontSize: 24,
    fontWeight: "800",
  },
});