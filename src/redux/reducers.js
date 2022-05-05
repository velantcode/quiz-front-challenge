import { combineReducers } from 'redux';
import loadingReducer from './reducers/loading.reducer';
import sessionReducer from './reducers/session.reducer';
import quizReducer from './reducers/quiz.reducer';

export default combineReducers({
  loading: loadingReducer,
  session: sessionReducer,
  quiz: quizReducer
});
