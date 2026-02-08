const React = require("react");
const { View, TouchableOpacity, Text } = require("react-native");

const Picker = ({ children, onValueChange }) => (
  <View testID="picker">
    {React.Children.map(children, (child) => (
      <TouchableOpacity
        onPress={() => onValueChange(child.props.value)}
      >
        <Text>{child.props.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

Picker.Item = ({ label }) => <Text>{label}</Text>;

module.exports = { Picker };
