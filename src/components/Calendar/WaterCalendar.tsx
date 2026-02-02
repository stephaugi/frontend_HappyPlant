import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {Calendar, LocaleConfig, Agenda, CalendarList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import WaterAgenda from './WaterAgenda';
import { theme, colorStyles, uiStyles, fontStyles } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const WaterCalendar = (plants, plantsToWater) => {
  const [selected, setSelected] = useState('');
  const [toWater, setToWater] = useState(plantsToWater);
  // console.log(toWater);
  const plantList = [
    {
      averageWaterCycle: 4,
      currentMoistureLevel: null,
      description: "Likes to live on the edge. It gets real dry",
      desiredMoistureLevel: 1,
      id: 1,
      name: "Danger",
      nextWaterDate: "2026-02-05",
      photo: "file:///Users/newstudent/Library/Developer/CoreSimulator/Devices/FED1B89F-E170-4BB7-8CEC-C1B8D70CE496/data/Containers/Data/Application/64BCDBE9-77A8-4005-BF56-2492A33F9614/Library/Caches/ExponentExperienceData/@anonymous/frontend_HappyPlant-294043c7-6e2e-4f22-80a6-44ad5e3d04c7/ImagePicker/8C62D3BB-A0E3-43F0-A593-D8EFBBEB2AC6.jpg"
    },
        {
      averageWaterCycle: 4,
      currentMoistureLevel: null,
      description: "Likes to live on the edge. It gets real dry",
      desiredMoistureLevel: 1,
      id: 1,
      name: "Danger",
      nextWaterDate: "2026-02-05",
      photo: "file:///Users/newstudent/Library/Developer/CoreSimulator/Devices/FED1B89F-E170-4BB7-8CEC-C1B8D70CE496/data/Containers/Data/Application/64BCDBE9-77A8-4005-BF56-2492A33F9614/Library/Caches/ExponentExperienceData/@anonymous/frontend_HappyPlant-294043c7-6e2e-4f22-80a6-44ad5e3d04c7/ImagePicker/8C62D3BB-A0E3-43F0-A593-D8EFBBEB2AC6.jpg"
    },
        {
      averageWaterCycle: 4,
      currentMoistureLevel: null,
      description: "Likes to live on the edge. It gets real dry",
      desiredMoistureLevel: 1,
      id: 1,
      name: "Danger",
      nextWaterDate: "2026-02-05",
      photo: "file:///Users/newstudent/Library/Developer/CoreSimulator/Devices/FED1B89F-E170-4BB7-8CEC-C1B8D70CE496/data/Containers/Data/Application/64BCDBE9-77A8-4005-BF56-2492A33F9614/Library/Caches/ExponentExperienceData/@anonymous/frontend_HappyPlant-294043c7-6e2e-4f22-80a6-44ad5e3d04c7/ImagePicker/8C62D3BB-A0E3-43F0-A593-D8EFBBEB2AC6.jpg"
    },
        {
      averageWaterCycle: 4,
      currentMoistureLevel: null,
      description: "Likes to live on the edge. It gets real dry",
      desiredMoistureLevel: 1,
      id: 1,
      name: "Danger",
      nextWaterDate: "2026-02-05",
      photo: "file:///Users/newstudent/Library/Developer/CoreSimulator/Devices/FED1B89F-E170-4BB7-8CEC-C1B8D70CE496/data/Containers/Data/Application/64BCDBE9-77A8-4005-BF56-2492A33F9614/Library/Caches/ExponentExperienceData/@anonymous/frontend_HappyPlant-294043c7-6e2e-4f22-80a6-44ad5e3d04c7/ImagePicker/8C62D3BB-A0E3-43F0-A593-D8EFBBEB2AC6.jpg"
    },
        {
      averageWaterCycle: 4,
      currentMoistureLevel: null,
      description: "Likes to live on the edge. It gets real dry",
      desiredMoistureLevel: 1,
      id: 1,
      name: "Danger",
      nextWaterDate: "2026-02-05",
      photo: "file:///Users/newstudent/Library/Developer/CoreSimulator/Devices/FED1B89F-E170-4BB7-8CEC-C1B8D70CE496/data/Containers/Data/Application/64BCDBE9-77A8-4005-BF56-2492A33F9614/Library/Caches/ExponentExperienceData/@anonymous/frontend_HappyPlant-294043c7-6e2e-4f22-80a6-44ad5e3d04c7/ImagePicker/8C62D3BB-A0E3-43F0-A593-D8EFBBEB2AC6.jpg"
    },


  ];
  const agenda = plantList.map((item, index) => {
    return (<View key={`${item.nextWateringDate}${item.name}${index}`} style={styles.plantCardContainer}>
            <View style={styles.agendaItem}>
              <Text style={fontStyles.emphasis}>{(new Date(item.nextWaterDate)).toLocaleDateString(
                'us-en',{
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }
                )}
              </Text>
              <Text>Time to water {item.name}!</Text>
              </View>
              {item.photo && <View>
              <Image source={{ uri: item.photo }}
                          style={styles.image}
                          resizeMode="cover"
                        />
              </View>}
            </View>)})

  const wateringDates = Object.fromEntries(plantList.map(plant => {
    return [plant.nextWateringDate, {marked: true}]
  }));

  const dateList = [
    {
      date: "2026-02-04",
      name: "Xiao mao",
      photo: null,
    },
    {
      date: "2026-02-04",
      name: "Xiao mao",
      photo: null,
    },
  ]


  return (<>
      {/* <Calendar
        onDayPress={day => {
          console.log('selected day', day);}}
        markedDates = {{
          '2026-01-27': {selected: false, marked: true, selectedColor: "blue"},
          '2026-01-02': {marked: true},
          '2026-02-03': {selected: true, marked: true, selectedColor: 'blue'}
        }}
      /> */}
      {/* <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
        horizontal={true}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={1}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
      /> */}
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Calendar
        style={{ width: 300, position: "relative", alignSelf: "center" }}
        headerStyle={{ justifyContent: "center" }}
        onDayPress={day => {
          console.log('selected day', day);}}
        markedDates = {wateringDates}
        // {{
        //   '2026-01-27': {selected: false, marked: true, selectedColor: "blue"},
        //   '2026-01-02': {marked: true},
        //   '2026-02-03': {selected: true, marked: true, selectedColor: 'blue'}
        // }}
      />
      <ScrollView >
      <View style={[{ backgroundColor: "#fff", alignItems: "center" }]}>
        <Text style={fontStyles.header}>Upcoming Waterings</Text>
        
        {agenda}
        
      </View>
      </ScrollView>
      </View>
    </>
  );
};

export default WaterCalendar;

const styles = StyleSheet.create({
  plantCardContainer: {
    padding: 22,
    backgroundColor: theme.colorLightGrey,
    height: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "800",
  },
  agendaItem: {
    // backgroundColor: "#eee",
    // padding: 10,
    margin: 20,
  },
  image: {
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});