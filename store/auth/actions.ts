import { ACTIONS_PACKAGE } from "../../appConstants";
import {
  ActionTypes,
  createActionTypes,
  makeActionByTypes,
} from "../reduxHelpers";

const GET_AUTH_TOKENS: ActionTypes = createActionTypes(
  `${ACTIONS_PACKAGE}.GET_AUTH_TOKENS`
);

const REFRESH_TOKEN: ActionTypes = createActionTypes(
  `${ACTIONS_PACKAGE}.REFRESH_TOKEN`
);
const REGISTRATION: ActionTypes = createActionTypes(
  `${ACTIONS_PACKAGE}.START_REGISTRATION`
);

const getAuthTokens = makeActionByTypes(GET_AUTH_TOKENS);
const refreshToken = makeActionByTypes(REFRESH_TOKEN);
const registration = makeActionByTypes(REGISTRATION);

export { GET_AUTH_TOKENS, REFRESH_TOKEN, REGISTRATION, getAuthTokens, refreshToken, registration };
