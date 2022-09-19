import {AuthActionCreators} from "./auth/action-creators";
import {UserActionCreators} from "./users/action-creators";

export const allActionsCreators = {
    ...AuthActionCreators,
    ...UserActionCreators

}