import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {Calendar } from 'react-native-calendars';
import PlantAgenda from './PlantAgenda';
import { theme, fontStyles } from '../../theme';
import { useAllMoistureData } from 'contexts/AllData/AllMoistureDataContext';
import { useAllWaterData } from 'contexts/AllData/AllWaterDataContext';
import { usePlantsData } from 'contexts/PlantsData/PlantsDataContext';

const WaterCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { allMoistureData, moistureDates } = useAllMoistureData();
  const { allWaterData } = useAllWaterData();
  const { plantsData, plantsToWater } = usePlantsData();

  const water_history = selectedDate && (selectedDate in allWaterData) ? allWaterData[selectedDate].map((waterLog, index) => {
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

  const moisture_history = selectedDate && (selectedDate in allMoistureData) ? allMoistureData[selectedDate].map((moistureLog, index) => {
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

  const agendas = selectedDate && (selectedDate in allMoistureData) ? moisture_history : upcomingWaterDates;

  const selectedDateWritten = new Date(selectedDate).toLocaleDateString("us-en", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });

  const waterDates = plantsToWater ? Object.fromEntries(plantsToWater.map(plant => {
    return [plant.nextWaterDate, {marked: true, selectedDotColor: theme.waterColor}]
  })) : null;

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
        <Text style={fontStyles.header}>{selectedDate && (selectedDate in allMoistureData) ? `${selectedDateWritten}` : "Upcoming Waterings"}</Text>
        {agendas}{water_history}
      </View>
      </ScrollView>
      </View>
    </>
  );
};

export default WaterCalendar;