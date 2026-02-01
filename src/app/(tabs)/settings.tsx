import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export default function SettingsScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notifications permission for Expo Go in settings",
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text>user settings</Text>
      <CustomButton
        label="Request permission for Push notifications?"
        onPress={scheduleNotification}
      />
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
});
