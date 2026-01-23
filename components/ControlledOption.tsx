import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from "react-native";

import { theme } from "../theme";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  moistureLevel: string;
  onSelectOption: Function;
};

const optionsList = [
  {
    value: "Very Dry",
    label: "moisture_level1",
  },
  {
    value: "Dry",
    label: "moisture_level2",
  },
  {
    value: "Normal",
    label: "moisture_level3",
  },
  {
    value: "Damp",
    label: "moisture_level3",
  },
  {
    value: "Wet",
    label: "moisture_level3",
  },
  {
    value: "Very Wet",
    label: "moisture_level3",
  },
];
const ControlledOption = ({ moistureLevel, onSelectOption }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    return setExpanded((oldState) => !oldState);
  };
  type ItemProps = {
    title: string;
  };

  const Item = ({title}: ItemProps) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.optionItem}
      onPress={() => {
        toggleExpand();
        return onSelectOption("desiredMoistureLevel", title);
      }}
    >
      <Text style={styles.optionText}>{title}</Text>
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
          keyExtractor={(item) => item.value}
          data={optionsList}
          renderItem={({ item }) => <Item title={item.value} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.dropDownContainer}>
          <Item title={moistureLevel} />
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
    borderRadius: 15,
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: theme.colorBlue,
  },
});

export default ControlledOption;
