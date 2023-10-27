import {applyMiddleware, compose, createStore, Store} from "redux";
import createSagaMiddleware from "redux-saga";
import {Persistor} from "redux-persist/es/types";
import {persistStore} from "redux-persist";
import {rootSaga} from "./rootSaga";
import {AppState, rootReducer} from "./rootReducer";
import {BASE_URL, instance} from "../network/axiosBase";
import unprotectedPathes from "../network/unprotectedPathes";
import jwtDecode from "jwt-decode";
import {logintOut} from "./logout/actions";
import {REFRESH_TOKEN_PATH} from "../network/patches";
import showErrorNotification from "../utils/showErrorNotification";
import {refreshToken} from "./auth/actions";
import reactotron from "reactotron-react-native";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        showAsyncStorageContentInDev: any;
        AsyncStorage: any;
        auth: any;
        store: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store: Store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    addTokenExpiredListenerstoAxiosInstance(store);
    return store;
};

const store: Store<AppState> = configureStore();
const persistor: Persistor = persistStore(store);

type tokenType = {
    token_type: "string";
    exp: number;
    jti: string;
    user_id: number;
};

function addTokenExpiredListenerstoAxiosInstance(store: Store<AppState>) {
    const refreshTokenHelper = async () => {
        try {
            const auth = store.getState().auth;
            store.dispatch(refreshToken.request());
            const response = await fetch(`${BASE_URL}${REFRESH_TOKEN_PATH}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: auth.refresh }),
            });
            const responseBody: { access: string } = await response.json();
            store.dispatch(refreshToken.success({ access: responseBody.access }));
        } catch (error) {
            showErrorNotification(String(error.message));
            store.dispatch(refreshToken.failure(error));
        }
    }

    instance.interceptors.request.use(async (config) => {
        if (!unprotectedPathes[config.url]) {
            try{
                const auth = store.getState().auth;
                const decodedAccessToken: tokenType = jwtDecode(auth.access);
                if (Date.now() >= decodedAccessToken.exp * 1000) {
                    await refreshTokenHelper();
                }
                config.headers.Authorization = `Bearer ${store.getState().auth.access}`;
            } catch (e) {
                reactotron.log(e)
            }
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status) {
                if (401 === error.response.status) {
                    store.dispatch(logintOut.request())
                }
            }
            return await Promise.reject(error)
        }
    );
}


export {store, persistor};
