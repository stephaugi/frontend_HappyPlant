jest.mock("../../src/components/UI/CustomButton", () => {
  const React = require("react");
  const { TouchableOpacity, Text } = require("react-native");

  return ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
    );
});
