import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Text>Calendar</Text>
      </View>
      <View style={styles.agenda}>
        <Text>Agenda</Text>
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
