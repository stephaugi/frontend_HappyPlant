import { View, Text, StyleSheet, TextInput } from "react-native";
import { fontStyles, theme } from "../../theme";

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
    <Text style={fontStyles.emphasis}>{labelName}</Text>
    <TextInput
      multiline={textArea}
      placeholder={placeholder}
      style={[styles.textInput, fontStyles.label, { height: textAreaHeight, alignSelf: "center" }]}
      value={value}
      onChangeText={(value: string) => onChangeText(name, value)}
    />
  </View>
);

const styles = StyleSheet.create({
  // textInputContainer: {
  //   marginVertical: 10,
  // },
  textInput: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    // fontSize: theme.formTextSize,
    // fontWeight: "800",
    paddingHorizontal: 18,
    paddingVertical: 10,
    minWidth: 300,
  },
  label: {
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default ControlledTextInput;
