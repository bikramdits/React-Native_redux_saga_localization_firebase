import { registerScreens } from "./screens";
import SplashScreenNative from "react-native-splash-screen";
import { ThrottleNavigation } from "../utils/ThrottleNavigation";
import {STORYBOOK} from "./names";


const setStorybookRoot = (): void => {
  registerScreens();
  ThrottleNavigation.setRoot({
    root: {
      component: {
        name: STORYBOOK,
      },
    },
  })
    .then(() => SplashScreenNative.hide())
    .catch();
};

export { setStorybookRoot };
