import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { theme } from "../../theme";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  moistureLevel: number;
  onSelectOption: Function;
};

const optionsList = [
  {
    label: "Very Dry",
    value: 1,
  },
  {
    label: "Dry",
    value: 2,
  },
  {
    label: "Normal",
    value: 3,
  },
  {
    label: "Damp",
    value: 4,
  },
  {
    label: "Wet",
    value: 5,
  },
  {
    label: "Very Wet",
    value: 6,
  },
];
const moistureScales = ["Very Dry", "Dry", "Normal", "Damp", "Wet", "Very Wet"];

const ControlledOption = ({ moistureLevel, onSelectOption }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    return setExpanded((oldState) => !oldState);
  };
  type ItemProps = {
    label: string;
    value: number;
  };

  const Item = ({ label, value }: ItemProps) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.optionItem}
      onPress={() => {
        toggleExpand();
        return onSelectOption("desiredMoistureLevel", value);
      }}
    >
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <TouchableOpacity style={styles.dropDownButton} onPress={toggleExpand}>
        <Text style={styles.dropDownButtonText}>Select when to water</Text>
        <AntDesign name={expanded ? "caret-up" : "caret-down"} />
      </TouchableOpacity>
      {expanded ? (
        <FlatList
          style={styles.dropDownContainer}
          keyExtractor={(item, index) => index}
          data={optionsList}
          renderItem={({ item }) => (
            <Item label={item.label} value={item.value} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.dropDownContainer}>
          <Item
            label={moistureScales[moistureLevel - 1]}
            value={moistureLevel}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    fontSize: theme.formTextSize,
    fontWeight: "800",
    paddingLeft: 18,
    paddingVertical: 10,
    width: 200,
  },
  dropDownButton: {
    // backgroundColor: theme.colorLightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dropDownButtonText: {
    // backgroundColor: theme.colorGrey,
    paddingBottom: 10,
  },
  optionItem: {
    // paddingVertical: 10,
    paddingLeft: 20,
  },
  optionText: {
    fontSize: theme.formTextSize,
    fontWeight: "800",
  },
  separator: {
    backgroundColor: theme.colorBlue,
    height: 50,
  },
});

export default ControlledOption;
