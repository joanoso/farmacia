import {
    AUTH_USER,
    AUTH_ERROR,
    ME_FROM_TOKEN,
    ME_FROM_TOKEN_SUCCESS,
    ME_FROM_TOKEN_FAILURE
} from '../actions/types';
import { User } from '../common/model/User';
import { Reducer } from 'redux';

const INITIAL_STATE = {
    authenticated: false,
    user: undefined,
    errorMessage: '',
    error: undefined
};

export interface Auth {
    authenticated: boolean;
    user?: User;
    error: string;
    errorMessage: string;
}

interface MeFromTokenFailure {
    data: any;
    message: string;
}

export type AuthAction =
    | { type: 'AUTH_USER'; user: User }
    | { type: 'AUTH_ERROR'; errorMessage: string }
    | { type: 'ME_FROM_TOKEN' }
    | { type: 'ME_FROM_TOKEN_SUCCESS'; user: User }
    | { type: 'ME_FROM_TOKEN_FAILURE'; payload: MeFromTokenFailure };

const reducer: Reducer<Auth> = (state = INITIAL_STATE, action: AuthAction) => {
    let error;
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: action.user ? true : false,
                user: action.user
            };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.errorMessage };
        case ME_FROM_TOKEN: // loading currentUser("me") from jwttoken in local/session storage storage,
            return { ...state, user: undefined, error: null, loading: true };
        case ME_FROM_TOKEN_SUCCESS: // return user, status = authenticated and make loading = false
            return {
                ...state,
                user: action.user,
                error: null,
                loading: false
            }; // <-- authenticated
        case ME_FROM_TOKEN_FAILURE: // return error and make loading = false
            error = action.payload.data || { message: action.payload.message }; // 2nd one is network or server down errors
            return { ...state, user: undefined, error, loading: false };
        default:
            return state;
    }
};

export default reducer;
