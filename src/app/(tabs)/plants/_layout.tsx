import { Stack, Link } from "expo-router";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getPlantsFromApi, createPlantFromApi } from "../../../utils/api/plantApiCalls";
import { convertToAPI } from "../../../utils/api/convertData";
import { MenuOption } from "../../../components/DropDownMenu/MenuOption";
import { DropdownMenu } from "../../../components/DropDownMenu/DropDownMenu";

export default function Layout() {
  const [visible, setVisible] = useState(false);
  // const [plantsData, setPlantsData] = useState([]);
  // const getPlants = async () => {
  //   setPlantsData(await getPlantsFromApi());
  // };

  // const handleCreatePlant = (inputData: object) => {
  //   const requestBody = convertToAPI(inputData);
  //   createPlantFromApi(requestBody).then(() => {
  //     getPlants();
  //   });
  // };

  // useEffect(() => {
  //   getPlants();
  // }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Plants",
          headerRight: () => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Link href="plants/newPlant" asChild>
                  <TouchableOpacity hitSlop={20}>
                    <AntDesign name="plus" size={24} color="black" />
                  </TouchableOpacity>
                </Link>
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name="plantProfile"
        options={{
          title: "My Plant",
          headerRight: () => {
            return (<TouchableOpacity hitSlop={20}>
                <FontAwesome6 name="trash" size={24} color="black" />
              </TouchableOpacity>)
          },
        }}
      />
    </Stack>
  );
}
