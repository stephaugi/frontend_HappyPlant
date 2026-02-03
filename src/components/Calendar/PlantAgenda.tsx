import { View, Text, StyleSheet, Image } from "react-native";
import { theme, fontStyles } from "../../theme";
import { moistureScales } from "../../constants";


type Prop = {
  plant?: object;
  data?: object;
};
const PlantAgenda = ({ plant, upcomingWater=false, water=false, moisture=false, data }: Prop) => {
  const moistureDateLog = moisture ? (<><Text style={fontStyles.emphasis}>
        Moisture Check
      </Text>
      <Text>{`${data.plantName}'s Soil was feeling ${moistureScales[data.moistureLevel-1]} today!`}</Text>
  </>) : null;

  const nextWater = upcomingWater ? (<><Text style={fontStyles.emphasis}>
        {new Date(plant.nextWaterDate).toLocaleDateString("us-en", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        })}
      </Text>
      <Text>Time to water {plant.name}!</Text></>) : null;

  const waterDate = water ? (<><Text style={fontStyles.emphasis}>
        Watered
      </Text>
      <Text>{`${data.plantName} was watered today!`}</Text>
  </>) : null;

  return (
    <>
      <View style={[styles.plantCardContainer, upcomingWater ? styles.upcomingWater : (moisture ? styles.moistureColor : styles.waterColor )]}>
        <View style={styles.agendaItem}>
          {nextWater}
          {moistureDateLog}
          {waterDate}
        </View>
        {plant && plant.photo && (
          <View>
            <Image
              source={{ uri: plant.photo }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    </>
  );
};

export default PlantAgenda;

const styles = StyleSheet.create({
  plantCardContainer: {
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 300,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waterColor: {
    backgroundColor: theme.colorLightGrey,
  },
  moistureColor: {
    backgroundColor: theme.moistureColor,
  },
  upcomingWater: {
    backgroundColor: theme.waterColor,
  },
  agendaItem: {
    // backgroundColor: "#eee",
    // padding: 10,
    margin: 20,
  },
  image: {
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
