import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import WaterCalendar from "../../components/Calendar/WaterCalendar";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <WaterCalendar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    backgroundColor: theme.colorLightGrey,
  },
  agenda: {
    backgroundColor: theme.colorLightGrey,
    padding: 12,
  },
});
