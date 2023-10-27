import React, { ReactElement, useEffect } from "react";
import { View } from "react-native";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";
import { NETWORK_ERROR } from "../utils/showErrorNotification";

import baseStyles from "../components/baseStyles";
import showErrorNotification from "../utils/showErrorNotification";

interface Props {
  children?: ReactElement;
}
const defaultProps: Props = {};

const NetworkConnectionProvider = ({ children }: Props): ReactElement<any> => {
  useEffect(() => {
    let subscription: NetInfoSubscription = NetInfo.addEventListener(
      ({ isConnected }: NetInfoState) => {
        if (!isConnected) {
          showErrorNotification(NETWORK_ERROR);
        }
      }
    );
    return () => subscription && subscription();
  }, []);
  return <View style={baseStyles.container}>{children}</View>;
};
NetworkConnectionProvider.defaultProps = defaultProps;

export default NetworkConnectionProvider;
