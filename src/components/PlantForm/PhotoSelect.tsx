import { View, Text, StyleSheet, TextInput } from "react-native";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/Feather";

const PhotoSelect = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Select a Photo</Text>
      <Feather name="image" size={24} color={theme.colorTheme1} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.formTextSize,
    fontWeight: theme.formTextWeight,
    minWidth: 300,
    textAlign: "center",
    color: theme.colorTheme1,
  },
});

export default PhotoSelect;
