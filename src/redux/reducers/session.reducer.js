import { ADD_SESSION, REMOVE_SESSION } from '../types';

const initialState = null;
const defaultAction = { type: '', payload: null };

export default function sessionReducer (state = initialState, action = defaultAction) {
  switch (action?.type) {
    case ADD_SESSION:
      return { ...state, ...action.payload };
    case REMOVE_SESSION:
      return null;
    default:
      return state;
  }
}
