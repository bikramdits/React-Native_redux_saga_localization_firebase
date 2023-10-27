import { Navigation } from "react-native-navigation";
import { getStorybookUI } from "@storybook/react-native";

import Welcome from "./splash/Welcome";
import {
  WELCOME,
} from "./names";

const StoryBookScreen = getStorybookUI({
  asyncStorage: require("@react-native-community/async-storage").default,
});

const screens: { id: string; screen: any }[] = [
  { id: WELCOME, screen: Welcome },
];

export const registerScreens = (): void =>
  screens.forEach(({ id, screen }) =>
    Navigation.registerComponent(
      id,
      () => AppProvider(screen),
      () => screen
    )
  );
