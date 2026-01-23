import { View, Text, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";

type Props = {
  labelName: string;
  name: string;
  onChangeText: Function;
  placeholder?: string;
  value?: string;
  textAreaHeight?: number;
  textArea?: boolean;
};

const ControlledTextInput = ({
  labelName,
  name,
  onChangeText,
  placeholder,
  value,
  textAreaHeight,
  textArea,
}: Props) => (<View style={styles.textInputContainer}>
    <Text style={styles.label}>{labelName}</Text>
    <TextInput
      multiline={textArea}
      placeholder={placeholder}
      style={[styles.textInput, { height: textAreaHeight }]}
      value={value}
      onChangeText={(value: string) => onChangeText(name, value)}
    />
  </View>
);

const styles = StyleSheet.create({
  textInputContainer: {
    marginVertical: 10,
    // marginHorizontal: 10,
  },
  textInput: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: 15,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 20,
    minWidth: 300,
  },
  label: {
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default ControlledTextInput;
