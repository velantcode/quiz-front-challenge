import { LOADING_HIDE, LOADING_SHOW } from '../types';

const paramsShowLoading = (show) => ({ type: LOADING_SHOW, payload: show });
const paramsHideLoading = () => ({ type: LOADING_HIDE, payload: false });

/* actions */
export function showLoading () {
  return dispatch => dispatch(paramsShowLoading(true));
}

export function hideLoading () {
  return dispatch => dispatch(paramsHideLoading());
}
