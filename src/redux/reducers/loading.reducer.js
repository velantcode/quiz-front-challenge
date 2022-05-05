import { LOADING_HIDE, LOADING_SHOW } from '../types';

const initialState = false;
const defaultAction = { type: '', payload: false };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case LOADING_SHOW:
      return action.payload;
    case LOADING_HIDE:
      return false;
    default:
      return state;
  }
}
