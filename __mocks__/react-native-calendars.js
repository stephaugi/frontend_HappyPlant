const React = require("react");
const { View, Text, TouchableOpacity } = require("react-native");

const ExpandableCalendar = ({ onDayPress }) => (
  <TouchableOpacity
    testID="calendar"
    onPress={() => onDayPress({ dateString: "2026-02-01" })}
  >
    <Text>MockCalendar</Text>
  </TouchableOpacity>
);

ExpandableCalendar.navigationTypes = {
  MONTH_SCROLL: "MONTH_SCROLL",
  MONTH_ARROWS: "MONTH_ARROWS",
  WEEK_SCROLL: "WEEK_SCROLL",
  WEEK_ARROWS: "WEEK_ARROWS",
};

module.exports = {
  CalendarProvider: ({ children }) => children,
  ExpandableCalendar,
};
