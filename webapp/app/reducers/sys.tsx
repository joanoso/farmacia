import { START_FETCHING, END_FETCHING, CHANGE_MENU} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    menuOpen: false
};

export interface Sys {
    fetching: boolean;
    menuOpen: boolean;
}

export type SysAction = { type: 'START_FETCHING' } | { type: 'END_FETCHING' } | { type: 'CHANGE_MENU' };

const reducer = (state = INITIAL_STATE, action: SysAction) => {
    switch (action.type) {
        case START_FETCHING:
            return { ...state, fetching: true };
        case END_FETCHING:
            return { ...state, fetching: false };
        case CHANGE_MENU:
            return { ...state, menuOpen: !state.menuOpen };
        default:
            return state;
    }
};

export default reducer;
