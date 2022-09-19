import {
    AuthActionEnum,
    SetErrorAction,
    SetIsLoadingAction,
    SetTokenAction,
} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
    setError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: isLoading}),
    setToken: (token: string): SetTokenAction => ({type: AuthActionEnum.SET_TOKEN, payload: token}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            const res = await axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
                username,
                password
            })
            if (res.data.token) {
                dispatch(AuthActionCreators.setToken(res.data.token))
            } else {
                dispatch(AuthActionCreators.setError('Incorrect Username or Password'))
            }
            dispatch(AuthActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(AuthActionCreators.setError('An error has occurred'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setToken(''))
    },
}