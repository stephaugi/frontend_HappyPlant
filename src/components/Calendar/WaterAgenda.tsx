import { View, Text, StyleSheet } from "react-native";
import { fontStyles } from "../../theme";

const WaterAgenda = ({ label, dateList, renderItem }) => {

  return (<>
    <Text style={fontStyles.header}>{label}</Text>
    {dateList.map((item, index) => renderItem(item,index))}
  </>);
};

export default WaterAgenda;

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    fontWeight: "800",
  },
});
