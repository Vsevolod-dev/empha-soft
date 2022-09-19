import {
    UsersActionEnum,
    SetErrorAction,
    SetIsLoadingAction,
    SetUsersAction, AddUserAction, RemoveUserAction,
} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../@types/IUser";

export const UserActionCreators = {
    setError: (error: string): SetErrorAction => ({type: UsersActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
        type: UsersActionEnum.SET_IS_LOADING,
        payload: isLoading
    }),
    addUser: (user: IUser): AddUserAction => ({type: UsersActionEnum.ADD_USER, payload: user}), // add user to redux
    removeUser: (id: number): RemoveUserAction => ({type: UsersActionEnum.REMOVE_USER, payload: id}), // remove user from redux
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
    },
    deleteUser: (token: string, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const res = await axios.delete(`https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            if (res.status === 204) {
                dispatch(UserActionCreators.removeUser(id))
            }
            dispatch(UserActionCreators.setIsLoading(false))
            return true
        } catch (e) {
            console.log(e)
            dispatch(UserActionCreators.setError('An error has occurred'))
            return false
        }
    },
    getUser: (token: string, id: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(UserActionCreators.setIsLoading(true))
            const res = await axios.get(`https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })

            if (res.status === 200) {
                return res.data
            }
            dispatch(UserActionCreators.setIsLoading(false))
            return true
        } catch (e) {
            console.log(e)
            dispatch(UserActionCreators.setError('An error has occurred'))
            return false
        }
    },

}