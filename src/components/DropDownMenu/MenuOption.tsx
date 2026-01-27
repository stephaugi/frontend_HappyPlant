import { TouchableOpacity, StyleSheet } from "react-native";
import { ReactNode } from "react";

export const MenuOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      {children}
    </TouchableOpacity>
  );
};

