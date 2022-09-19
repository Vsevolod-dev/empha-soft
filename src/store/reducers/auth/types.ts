export interface AuthState {
    isLoading: boolean
    error: string,
    token: string
}

export enum AuthActionEnum {
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_TOKEN = "SET_TOKEN"
}

export interface SetTokenAction {
    type:  AuthActionEnum.SET_TOKEN
    payload: string
}

export interface SetErrorAction {
    type:  AuthActionEnum.SET_ERROR
    payload: string
}

export interface SetIsLoadingAction {
    type:  AuthActionEnum.SET_IS_LOADING
    payload: boolean
}

export type AuthAction =
    SetErrorAction |
    SetIsLoadingAction |
    SetTokenAction