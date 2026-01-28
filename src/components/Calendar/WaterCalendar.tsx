import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, LocaleConfig, Agenda, CalendarList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import WaterAgenda from './WaterAgenda';

const WaterCalendar = () => {
  const [selected, setSelected] = useState('');

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
      <Calendar
        style={{ width: 300, position: "relative", justifyContent: "flex-start" }}
        headerStyle={{ justifyContent: "flex-start" }}
        onDayPress={day => {
          console.log('selected day', day);}}
        markedDates = {{
          '2026-01-27': {selected: false, marked: true, selectedColor: "blue"},
          '2026-01-02': {marked: true},
          '2026-02-03': {selected: true, marked: true, selectedColor: 'blue'}
        }}
      />
      <View style={{ backgroundColor: "#fff" }}>
        <WaterAgenda
          label="Upcoming Waterings"
          dateList={[
            {
              date: "2026-01-28", 
              name: "water jimmy",
            },
            {
              date: "2026-01-30", 
              name: "water xiaomao",
            },
          ]}
          renderItem={(item, index) => {
            return (
              <View key={`${item.date}${index}`} style={styles.agendaItem}>
                <Text>Date:{item.date}</Text>
                <Text>Name:{item.name}</Text>
              </View>
            );
          }}
        />
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
  agendaItem: {
    backgroundColor: "#eee",
    padding: 10,
    margin: 20,
  },
});