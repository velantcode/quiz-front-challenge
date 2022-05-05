import { ADD_SESSION, REMOVE_SESSION } from '../types';
import { clearAllData } from '../../Services/GlobalService';
import { setStorage } from '../../Services/Storage';

const addSession = (session) => ({ type: ADD_SESSION, payload: session });
const deleteSession = () => ({ type: REMOVE_SESSION, payload: null });

/* actions */
export function saveSession (data) {
  if (data?.token) setStorage('token', data.token);
  setStorage('session', data?.user);
  return dispatch => dispatch(addSession(data?.user));
}

export function removeSession () {
  clearAllData();
  return dispatch => dispatch(deleteSession());
}
