import { all } from "redux-saga/effects";

import {
  watchSetMeasurementsRequestSaga,
} from "./measurements/sagas";
import { watchGetMeasurementRequestSaga } from "./measurement/sagas";

export function* rootSaga() {
  yield all([
    watchSetMeasurementsRequestSaga(),
    watchGetMeasurementRequestSaga(),
    
  ]);
}
