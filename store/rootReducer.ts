import { Reducer } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCombineReducers, createTransform } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { PersistConfig } from "redux-persist/es/types";
import measurements, { MeasurementsType } from "./measurements/reducer";
import restoreModelInstance from "../utils/restoreModelInstance";
//@ts-ignore
import createEncryptor from "redux-persist-transform-encrypt";

export type AppState = Api;

export interface Api {
  measurements: MeasurementsType;
}

const ModelsTransform = createTransform(
  (state: MeasurementsType): MeasurementsType => state,
  (outboundState: MeasurementsType): MeasurementsType => {
    const restored = Object.entries(outboundState)
      .filter(([type]) => type !== "error")
      .reduce(
        (state: MeasurementsType, [type, measurements]): MeasurementsType => {
          const restoredMeasurements = measurements.map((measurement) => {
            return {
              ...measurement,
              data: restoreModelInstance(type as DeviceType, measurement.data),
            };
          });
          state[type] = restoredMeasurements;
          return state;
        },
        {}
      );
    return restored;
  },
  // define which reducers this transform gets called for.
  { whitelist: ["measurements"] }
);

const encryptor = createEncryptor({
  secretKey: "hA3pwnZikEVl6MsJPGXwo6HpaEnqBEq1",
  onError: () => {
    // Handle the error.
  },
});

export interface Other {}

// @ts-ignore
const persistConfig: PersistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["measurement", "phoneNumber", "firebase"],
  stateReconciler: autoMergeLevel2,
  transforms: [ModelsTransform, encryptor],
};

export const rootReducer: Reducer<AppState> = persistCombineReducers<AppState>(
  persistConfig,
  {
    measurements,
  }
);
