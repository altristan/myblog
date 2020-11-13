import {createContext} from "react";
import {ActionTypes} from "./auth-actions";

interface AuthState {
    // user: string;
    token: string;
    isAuthenticated: boolean;
}

export const INITIAL_STATE = {
    // user: '',
    token: '',
    isAuthenticated: false,
}

export interface Action {
    type: ActionTypes;
    payload?: any;
}

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: (action: Action) => void;
}>({
    state: INITIAL_STATE, dispatch: () => {
    }
});

function checkAuth() {
    const token = window.localStorage.getItem('token');
    let isAuthenticated = false;
    if (token){
        isAuthenticated = true;
    }
    return {token, isAuthenticated}
}

export const authReducer: (state: any, action: any) => ({ isAuthenticated: boolean; token: string}) = (state, action) => {
    const {type} = action;
    switch (type) {
        case ActionTypes.AUTHORIZED:
            const authValues = checkAuth();
            return {
                ...state,
                token: authValues.token,
                isAuthenticated: authValues.isAuthenticated
            };
        case ActionTypes.UNAUTHORIZED:
            return {
                ...state,
                // user: '',
                token: localStorage.setItem('token', ''),
                isAuthenticated: false
            };
        default:
            return state;
    }
}