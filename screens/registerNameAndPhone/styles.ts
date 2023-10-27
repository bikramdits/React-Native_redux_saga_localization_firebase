import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ImageStyle } from "react-native-fast-image";

export interface Style {
  keyboard: ViewStyle;
  container: ViewStyle;
  logo: ImageStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  phoneInputContainer: ViewStyle;
  inputText: TextStyle;
  buttonContainer: ViewStyle;
  buttonText: TextStyle;
  backButton: ViewStyle;
  backButtonImage: ImageStyle;
  inputContainer: ViewStyle;
  textInput: TextStyle;
  separator: ViewStyle;
  subTitlePhoneInput: TextStyle;
}

export default StyleSheet.create<Style>({
  keyboard: { flex: 1 },
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
    marginBottom: 5,
  },
  logo: {
    alignSelf: "center",
    height: 78,
    width: 138,
  },
  titleContainer: {
    flexGrow: 0,
    justifyContent: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    width: 196,
    marginTop: 60,
    color: "black",
  },
  phoneInputContainer: {
    flex: 3,
    marginTop: 15,
  },
  inputText: {
    textAlignVertical: "center",
    fontSize: 18,
    lineHeight: 29,
    fontWeight: "600",
    color: "black",
  },
  buttonContainer: {
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 45,
    height: 150,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  backButton: {
    position: "absolute",
    top: 5,
    height: 50,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 10,
  },
  backButtonImage: {
    height: 17,
    width: 15,
  },
  inputContainer: {
    marginTop: 48,
  },
  textInput: {
    padding: 0,
    fontSize: 18,
    height: 25,
    color: 'black'
  },
  separator: {
    marginTop: 12,
    backgroundColor: "#DFE0E1",
    height: 1,
    width: "100%",
  },
  subTitlePhoneInput: {
    color: "#a5a5a5",
    fontSize: 12,
  },
});
