import { View, Text, StyleSheet } from "react-native";

const WaterAgenda = ({ label, dateList, renderItem }) => {
  return (<>
    <Text style={styles.label}>{label}</Text>
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
