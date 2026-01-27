import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { DropdownMenu } from "../DropDownMenu/DropDownMenu";
import { MenuOption } from "../DropDownMenu/MenuOption";
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
  const [visible, setVisible] = useState(false);

  const caretToggle = <AntDesign name={visible ? "caret-up" : "caret-down"} />;
  const menuItems = optionsList.map((item, index) => {
    return (
      <MenuOption
        key={`${item.label}${index}`}
        onSelect={() => {
          setVisible((prevVisible) => !prevVisible);
          return onSelectOption("desiredMoistureLevel", item.value);
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.menuItemText}>{item.label}</Text>
          {item.value === 1 ? caretToggle : null}
        </View>
      </MenuOption>
    );
  });
  return (<>
      <View style={styles.dropDownContainer}>
        <DropdownMenu
          visible={visible}
          handleOpen={() => setVisible(true)}
          handleClose={() => setVisible(false)}
          trigger={
            <View style={[styles.menu, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
              <Text style={styles.menuItemText}>{moistureScales[moistureLevel - 1]}</Text>
              {caretToggle}
            </View>
          }
        >
          {menuItems}
        </DropdownMenu>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    alignItems: "left",
  },
  menu: {
    borderColor: theme.colorTheme1,
    borderWidth: 1,
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    padding: 10,
    elevation: 4,
    width: 300,
  },
  menuItemText: {
    fontSize: theme.formTextSize,
    fontWeight: "800",
  },
  label: {
    paddingBottom: 10,
    fontSize: 14,
  },
});

export default ControlledOption;
