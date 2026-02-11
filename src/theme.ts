import { StyleSheet } from "react-native";

export const theme = {
  colorWhite: "#fff",
  colorBlack: "#000",
  colorBlue: "#439178",
  colorLightBlue: "#58bd9d",
  colorLightBlue2: "#94f7d7",
  colorLightGrey: "#eee",
  colorGrey: "grey",
  colorOrange: "#ff7f2f",
  colorTheme1: "#c4cbc3",
  colorTheme1Light: "#ededed",
  waterColor: "#a8f3e5",
  moistureColor: "#e86c49",
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
  textInput: {
    // borderColor: theme.colorTheme1,
    // borderWidth: 1,
    // alignSelf: "center",
    backgroundColor: theme.colorTheme1Light,
    borderRadius: theme.cornerRound,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300,
  },
  onBoardingCard: {
    width: 300,
    height: 500,
    backgroundColor: "pink",
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
    color: theme.colorGrey,
  },
  selectedColorTheme1: {
    backgroundColor: theme.colorLightBlue,
    color: theme.colorWhite,
  },
  colorTheme3: {
    backgroundColor: theme.colorOrange,
    color: theme.colorWhite,
  },
});