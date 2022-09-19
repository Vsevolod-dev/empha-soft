import {IUser} from "../../../@types/IUser";

export interface UsersState {
    isLoading: boolean
    error: string,
    users: IUser[]
}

export enum UsersActionEnum {
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_USERS = "SET_USERS",
    ADD_USER = "ADD_USER",
    REMOVE_USER = "REMOVE_USER"
}

export interface SetUsersAction {
    type:  UsersActionEnum.SET_USERS
    payload: IUser[]
}

export interface SetErrorAction {
    type:  UsersActionEnum.SET_ERROR
    payload: string
}

export interface SetIsLoadingAction {
    type:  UsersActionEnum.SET_IS_LOADING
    payload: boolean
}

export interface AddUserAction {
    type:  UsersActionEnum.ADD_USER
    payload: IUser
}

export interface RemoveUserAction {
    type:  UsersActionEnum.REMOVE_USER
    payload: number
}

export type UsersAction =
    SetErrorAction |
    SetIsLoadingAction |
    SetUsersAction |
    AddUserAction |
    RemoveUserAction