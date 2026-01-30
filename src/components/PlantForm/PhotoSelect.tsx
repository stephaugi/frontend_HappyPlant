import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/Feather";
import ImageSelector from "./ImageSelector";

const PhotoSelect = () => {
  return (<>
    <ImageSelector />
    {/* <TouchableOpacity onPress={() => console.log("Select an image!")}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Select a Photo</Text>
        <Feather name="image" size={24} color={theme.colorTheme1} />
      </View>
    </TouchableOpacity> */}
    </>
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
    fontWeight: "800",
    minWidth: 300,
    textAlign: "center",
    color: theme.colorTheme1,
  },
});

export default PhotoSelect;
