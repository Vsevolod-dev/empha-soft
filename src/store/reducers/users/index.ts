import {UsersAction, UsersActionEnum, UsersState} from "./types";

const initialState: UsersState = {
    error: '',
    isLoading: false,
    users: []
}

export default function authReducer(state = initialState, action: UsersAction): UsersState {
    switch (action.type) {
        case UsersActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case UsersActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case UsersActionEnum.SET_USERS:
            return {...state, users: action.payload}
        case UsersActionEnum.ADD_USER:
            return {...state, users: [...state.users, action.payload]}
        case UsersActionEnum.REMOVE_USER:
            return {...state, users: state.users.filter(user => user.id !== action.payload)}
        default:
            return state
    }
}