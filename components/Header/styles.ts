import { StyleSheet, ViewStyle } from "react-native";

export interface Style {
  style: ViewStyle;
  notificationButton: ViewStyle;
  activeNotificationIcon: ViewStyle;
  notificationIcon: ViewStyle;
  profileButton: ViewStyle;
  profileButtonContainer: ViewStyle;
  profileIcon: ViewStyle;
  buttonsContainer: ViewStyle;
}

export default StyleSheet.create<Style>({
  style: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  notificationButton: {
    paddingRight: 27,
  },
  notificationIcon: {
    width: 19,
    height: 25,
  },
  activeNotificationIcon: {
    width: 25,
    height: 27.6,
  },
  profileButton: {
    flex: 1,
    width: 55,
    left: -7,
    top: -10,
    bottom: -10,
    position: "absolute",
  },
  profileButtonContainer: {
    paddingLeft: 21,
    flex: 1,
  },
  profileIcon: {
    width: 19,
    height: 25,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 10,
  },
});
