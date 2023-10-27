import { Navigation } from "react-native-navigation";
import SplashScreenNative from "react-native-splash-screen";

import colors from "../styles/colors";
import { ThrottleNavigation } from "../utils/ThrottleNavigation";
import imgs from "../assets/imgs/imgs";
import {SPLASH_SCREEN} from "./names";

const setDefaultOptions = (): void => {
  Navigation.setDefaultOptions({
    layout: {
      backgroundColor: "white",
      componentBackgroundColor: "white",
      orientation: ["portrait"],
    },
    topBar: {
      visible: true,
      drawBehind: false,
      animate: false,
      elevation: 0,
      noBorder: true,
      title: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
        alignment: "center",
      },
      backButton: {
        visible: true,
        color: colors.black,
        fontFamily: "Open Sans",
        icon: imgs.backVector,
      },
      background: {
        color: "white",
      },
    },
    statusBar: {
      style: "dark",
      backgroundColor: 'white'
    },
  });
};

const setRoot = (): void => {
  ThrottleNavigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: SPLASH_SCREEN,
            },
          },
        ],
      },
    },
  })
    .then(() => SplashScreenNative.hide())
    .catch();
};

export { setDefaultOptions, setRoot };
