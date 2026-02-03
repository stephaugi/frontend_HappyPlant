import { useState } from 'react';
import { Alert, Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { getFromStorage, saveToStorage } from '../../utils/storage';

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
      aspect: [4, 3],
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

  return (
    <View style={styles.container}>
      {selectedImage ? (<TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: selectedImage }}
          style={styles.image}
          resizeMode="cover"
        /></TouchableOpacity>
      ) : (<Button title="Pick an image from camera roll" onPress={pickImage} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  image: {
    // alignSelf: "center",
    width: 300,
    height: 190,
    borderRadius: 5,
  },
});
