import {
    UsersActionEnum,
    SetErrorAction,
    SetIsLoadingAction,
    SetUsersAction,
} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../models/IUser";

export const UserActionCreators = {
    setError: (error: string): SetErrorAction => ({type: UsersActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: UsersActionEnum.SET_IS_LOADING, payload: isLoading}),
    setUsers: (users: IUser[]): SetUsersAction => ({type: UsersActionEnum.SET_USERS, payload: users}),
    getUsers: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const res = await axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            if (res.data) {
                dispatch(UserActionCreators.setUsers(res.data))
            } else {
                dispatch(UserActionCreators.setError('Incorrect Username or Password'))
            }
            dispatch(UserActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(UserActionCreators.setError('An error has occurred'))
        }
    }
}