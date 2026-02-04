import { Stack, Link } from "expo-router";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getFromStorage } from "../../../utils/storage";
import { deletePlant } from "../../../utils/plantActions";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function Layout() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleDeletePlant = async () => {
    const fetchCurrentPlant = async () => {
      return await getFromStorage("currentSelectedPlant");
    };

    const plantData = await fetchCurrentPlant();
    const asyncDelete = () => {
      deletePlant(plantData.id).then(() => router.back());
    };
    Alert.alert("Delete a Plant", `Are you sure you want to delete ${plantData.name}?`,
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            asyncDelete();
          },
          style: "destructive",
        },
      ],
    );
  };
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
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                }}
              >
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
            return (<View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                }}
              >
                <TouchableOpacity hitSlop={20} onPress={handleDeletePlant}>
                  <FontAwesome6 name="trash" size={24} color="black" />
                </TouchableOpacity>
              </View>)
          },
        }}
      />
    </Stack>
  );
}
