import {
  QUIZ_DETAILS,
  QUIZ_DETAILS_REMOVE,
  QUIZ_FORM,
  QUIZ_FORM_REMOVE,
  QUIZ_LIST,
  QUIZ_USER_LIST
} from '../types';

const initialState = {
  quizDetails: null,
  quizForm: null,
  quizList: null,
  quizUserList: null,
  error: null
};
const defaultAction = { type: '', payload: null };

export default function (state = initialState, action = defaultAction) {
  switch (action.type) {
    case QUIZ_DETAILS:
      return {
        ...state,
        quizDetails: action.payload || null
      };
    case QUIZ_DETAILS_REMOVE:
      return {
        ...state,
        quizDetails: null
      };
    case QUIZ_FORM:
      return {
        ...state,
        quizForm: { ...action.payload }
      };
    case QUIZ_FORM_REMOVE:
      return {
        ...state,
        quizForm: null
      };
    case QUIZ_LIST:
      return { ...state, quizList: action.payload || [], quizDetails: null };
    case QUIZ_USER_LIST:
      return { ...state, quizUserList: action.payload || [], quizDetails: null };
    default:
      return state;
  }
}
