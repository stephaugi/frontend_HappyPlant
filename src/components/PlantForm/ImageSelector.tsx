import { useState } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { fontStyles, theme, uiStyles } from 'theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { LinearGradient } from "react-native-svg";
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient";

export default function ImageSelector({ onSelectImage, selectedImage }) {
  const [image, setImage] = useState<string | null>(selectedImage);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      getFromStorage("currentSelectedPlant").then((selectedPlant) => {
        const newData = { ...selectedPlant, photo: "result.assets[0].uri" };
        saveToStorage("currentSelectedPlant", newData);
        onSelectImage("photo", result.assets[0].uri);
      });
    }
  };

  return (<>
      <StatusBar style="light" />
    <View style={styles.container}>
      {selectedImage ? (<TouchableOpacity onPress={pickImage}>
          <ImageBackground source={{ uri: selectedImage }} style={styles.image} />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.8)", "transparent", "transparent"]}
              style={styles.gradStyle}
            />
          {/* </ImageBackground> */}
        </TouchableOpacity>
      ) : (<View style={styles.selectImageContainer}>
        <TouchableOpacity style={[uiStyles.centerAlign, {gap: 20}]} onPress={pickImage}>
          <View style={styles.button}>
            <MaterialCommunityIcons
              name="camera-plus"
              size={34}
              color={theme.colorWhite}
            />
          </View>
          <Text style={[{color: theme.colorWhite}, fontStyles.buttonLarge]}>Add a Photo</Text>
        </TouchableOpacity>
        </View>
      )}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    height: 300,
    backgroundColor: theme.colorBlue,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  selectImageContainer: {
    // width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    // alignSelf: "center",

    width: "100%",
    height: 300,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    // objectFit: "cover",
    overflow: "hidden",
  },
  button: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    // padding: 30,
    borderColor: theme.colorWhite,
    borderWidth: 2,
    borderRadius: 50,
  },
  gradStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
});
