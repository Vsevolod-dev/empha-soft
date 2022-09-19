import {
    UsersActionEnum,
    SetErrorAction,
    SetIsLoadingAction,
    SetUsersAction, AddUserAction,
} from "./types";
import {AppDispatch} from "../../index";
import axios, {AxiosError} from "axios";
import {IUser} from "../../../@types/IUser";

export const UserActionCreators = {
    setError: (error: string): SetErrorAction => ({type: UsersActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: UsersActionEnum.SET_IS_LOADING, payload: isLoading}),
    addUser: (user: IUser): AddUserAction => ({type: UsersActionEnum.ADD_USER, payload: user}),
    setUsers: (users: IUser[]): SetUsersAction => ({type: UsersActionEnum.SET_USERS, payload: users}),
    getUsers: (token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const res = await axios.get('https://emphasoft-test-assignment.herokuapp.com/api/v1/users', {
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
    },
    createNewUsers: (token: string, user: IUser) => async (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setError(''))
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const res = await axios.post('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
                ...user
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            if (res.status === 201) {
                dispatch(UserActionCreators.addUser(res.data))
            }
            dispatch(UserActionCreators.setIsLoading(false))
            return true
        } catch (e) {
            console.log(e) //Todo: Pull out message
            dispatch(UserActionCreators.setError('An error has occurred'))
            return false
        }
    }
}