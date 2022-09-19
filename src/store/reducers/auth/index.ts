import {AuthAction, AuthActionEnum, AuthState} from "./types";

const initialState: AuthState = {
    error: '',
    isLoading: false,
    token: ''
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case AuthActionEnum.SET_TOKEN:
            document.cookie = `token=${action.payload}`
            return {...state, token: action.payload}
        default:
            return state
    }
}