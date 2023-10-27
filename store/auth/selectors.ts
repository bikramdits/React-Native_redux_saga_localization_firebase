import {createSelector} from "reselect";
import {AppState} from "../rootReducer";
import {IAuth} from "./reducer";

export const authSelector = createSelector(
    ({auth}: AppState): IAuth => auth,
    (auth): IAuth => auth
);
