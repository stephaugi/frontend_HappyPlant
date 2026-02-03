import { StyleSheet } from "react-native";

export const theme = {
  colorWhite: "#fff",
  colorBlack: "#000",
  colorBlue: "#2a8692",
  colorLightBlue: "#a8f3e5",
  colorLightGrey: "#eee",
  colorGrey: "grey",
  colorTheme1: "#c4cbc3",
  colorTheme1Light: "#ededed",
  waterColor: "#a8f3e5",
  moistureColor: "#ffc286",
  cornerRound: 10,
  subtitleSize: 12,
  formTextSize: 16,
  formTextWeight: 800,
};

export const uiStyles = StyleSheet.create({
  buttons: {
    padding: 12,
    maxWidth: "100%",
    alignSelf: "center",
  },
  txtInput: {
    padding: 12,
    maxWidth: "100%",
    alignSelf: "center",
  },
  roundCorner: {
    borderRadius: 15,
  },
  pill: {
    borderRadius: 50,
  },
  centerAlign: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export const fontStyles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "800",
  },
  tinyDescription: {
    fontSize: 12,
    fontWeight: "300",
  },
  emphasis: {
    fontSize: 12,
    fontWeight: "600",
  },
  buttonLarge: {
    fontSize: 16,
    fontWeight: "400",
  },
  buttonBold: {
    fontSize: 16,
    fontWeight: "800",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  spacing: {
    letterSpacing: 1,
  }
});

export const colorStyles = StyleSheet.create({
  colorTheme1: {
    backgroundColor: theme.colorBlue,
    color: theme.colorWhite,
  },
  colorTheme2: {
    backgroundColor: theme.colorLightGrey,
    color: theme.colorBlack,
  },
  selectedColorTheme1: {
    backgroundColor: theme.colorLightBlue,
    color: theme.colorBlack,
  },
});