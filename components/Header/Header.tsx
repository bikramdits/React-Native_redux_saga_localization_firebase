import React from "react";
import { View, GestureResponderEvent } from "react-native";
import FastImage from "react-native-fast-image";

import styles, { Style } from "./styles";
import Button from "../Button/Button";
import imgs from "../../assets/imgs/imgs";
import Title from "../Title/Title";
import {useReadNotifications} from "./hooks";

interface IProps {
  title: string;
  styles: Style;
  onProfilePress: (event: GestureResponderEvent) => void;
  onNotificationPress: (event: GestureResponderEvent) => void;
}

function Header({
  title,
  styles,
  onProfilePress,
  onNotificationPress,
  ...rest
}: IProps) {

  const isNotification = useReadNotifications()
  return (
    <View style={styles.style} {...rest}>
      <Title>{title}</Title>
      <View style={styles.buttonsContainer}>
        <Button onPress={onNotificationPress} style={styles.notificationButton}>
          <FastImage
            source={
              isNotification ? imgs.activeNotification : imgs.notification
            }
            style={
              isNotification
                ? styles.activeNotificationIcon
                : styles.notificationIcon
            }
            resizeMode={FastImage.resizeMode.contain}
          />
        </Button>
        <View style={styles.profileButtonContainer}>
          <Button onPress={onProfilePress} style={styles.profileButton}>
            <FastImage
              source={imgs.profile}
              style={styles.profileIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Button>
        </View>
      </View>
    </View>
  );
}

Header.defaultProps = {
  title: "",
  isNotification: false,
  styles,
  onProfilePress: () => {},
  onNotificationPress: () => {},
};
export default Header;
