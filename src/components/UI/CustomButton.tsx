import { TouchableOpacity, Text } from "react-native";
import { theme, uiStyles, colorStyles, fontStyles } from "../../theme";

type Props = {
  label?: string;
  colorTheme?: string;
  selected?: boolean;
  selectedColorTheme?: string;
  fontStyle?: string;
  size?: any[];
  pill?: boolean;
  onPress?: Function;
  children?: any;
};

const CustomButton = ({
  label,
  colorTheme = "colorTheme1",
  selected = false,
  selectedColorTheme = "selectedColorTheme1",
  fontStyle = "buttonLarge",
  size,
  pill = false,
  children,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        uiStyles.buttons,
        uiStyles.centerAlign,
        pill ? uiStyles.pill : uiStyles.roundCorner,
        selected ? colorStyles[selectedColorTheme] : colorStyles[colorTheme],
        size ? { width: size[0], height: size[1] } : null,
      ]}
      onPress={onPress}
    >
      {children}
      <Text
        style={[
          fontStyles[fontStyle],
          fontStyles.spacing,
          {textAlign: "center"},
          selected ? colorStyles[selectedColorTheme] : colorStyles[colorTheme]
          ]}>
          {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
