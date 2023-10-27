import { IAction } from "../IAction";
import { GET_AUTH_TOKENS, REFRESH_TOKEN, REGISTRATION } from "./actions";

export interface IAuth {
  access: string;
  refresh: string;
  loading: boolean;
  error: any;
  isRegistration: boolean;
  justRegistered: boolean;
}

export const initStateAuth: IAuth = {
  access: null,
  refresh: null,
  loading: null,
  error: null,
  isRegistration: false,
  justRegistered: false,
};

function authReducer(
  state: IAuth = initStateAuth,
  { type, payload }: IAction
): IAuth {
  let newState;
  switch (type) {
    case GET_AUTH_TOKENS.start:
      newState = {
        ...state,
        loading: true,
      };
      break;
    case GET_AUTH_TOKENS.success:
      newState = {
        ...state,
        ...payload,
        loading: false,
      };
      break;
    case GET_AUTH_TOKENS.failure || REFRESH_TOKEN.failure:
      newState = {
        ...state,
        error: payload,
        loading: false,
      };
      break;
    case GET_AUTH_TOKENS.reset:
      newState = {
        ...initStateAuth,
        error: payload,
        loading: false,
      };
      break;
    case REFRESH_TOKEN.reset:
      newState = initStateAuth;
      break;
    case REFRESH_TOKEN.request:
      newState = {
        ...state,
      };
      break;
    case REFRESH_TOKEN.success:
      newState = {
        ...state,
        ...payload,
      };
      break;
    case REGISTRATION.start:
      newState = {
        ...state,
        isRegistration: true,
      };
      break;
    case REFRESH_TOKEN.reset:
      newState = initStateAuth;
      break;
  }
  return newState || state;
}

export default authReducer;
