export const SET_CURRENT_OBJECT = 'SET_CURRENT_OBJECT';

// Actions
export const setCurrentObject = (obj: object) => ({ type: SET_CURRENT_OBJECT, obj });

// State
export interface Form {
  currentObject: object;
}

const initialState = {
  currentObject: undefined
} as Form;

// REDUCER
export default function form(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_OBJECT:
      return { ...state, currentObject: action.obj };
    default:
      return state;
  }
}
