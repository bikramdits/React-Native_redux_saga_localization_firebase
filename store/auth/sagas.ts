import {call, put, takeLatest} from "redux-saga/effects";
import auth from "@react-native-firebase/auth";

import {GET_AUTH_TOKENS, getAuthTokens} from "./actions";
import {IAuth} from "./reducer";
import {authAPI} from "../../network/AuthApi";
import {getUser} from "../user/actions";
import showErrorNotification from "../../utils/showErrorNotification";
import {getInitMeasurements} from "../measurements/actions";

function* getAuthTokensSaga() {
  try {
    const idToken: string = yield auth().currentUser.getIdToken();
    console.log('idToken', idToken)

    const response: IAuth = yield authAPI.getAuthToken({ token: idToken });
    console.log('response', response)
  

    yield put(getAuthTokens.success(response));
    yield put(getUser.request());
    yield put(getInitMeasurements.request())
  } catch (error) {
    console.log('error getAuthTokensSaga', error)
    yield put(getAuthTokens.failure({ error: error.message }));
    yield call(showErrorNotification, String(error.message));
  }
}

export function* watchGetAuthTokenRequestSaga() {
  yield takeLatest(GET_AUTH_TOKENS.request, getAuthTokensSaga);
}
