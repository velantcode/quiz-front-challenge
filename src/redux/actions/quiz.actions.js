import {
  QUIZ_DETAILS,
  QUIZ_DETAILS_REMOVE,
  QUIZ_FORM,
  QUIZ_FORM_REMOVE,
  QUIZ_LIST,
  QUIZ_USER_LIST
} from '../types';

/* details */
const quizListData = (data) => ({ type: QUIZ_LIST, payload: data || [] });
const quizUserListData = (data) => ({ type: QUIZ_USER_LIST, payload: data || [] });
const quizDetailsData = (data) => ({ type: QUIZ_DETAILS, payload: data });
const quizDetailsRemoveData = () => ({ type: QUIZ_DETAILS_REMOVE, payload: null });

/* form quiz */
const quizFormData = (data) => ({ type: QUIZ_FORM, payload: data });
const quizRemoveFormData = (data) => ({ type: QUIZ_FORM_REMOVE, payload: data });

/* actions */
export function quizAddList (data) {
  return dispatch => dispatch(quizListData(data));
}

export function quizAddUserList (data) {
  return dispatch => dispatch(quizUserListData(data));
}

export function quizDetailsAction (data) {
  return dispatch => dispatch(quizDetailsData(data));
}

export function quizDetailsRemove () {
  return dispatch => dispatch(quizDetailsRemoveData());
}

export function quizFormAction (data) {
  return dispatch => dispatch(quizFormData(data));
}

export function quizRemoveFormAction () {
  return dispatch => dispatch(quizRemoveFormData());
}
