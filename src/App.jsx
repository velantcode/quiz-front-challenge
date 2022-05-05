import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import LoginComponent from './components/LoginComponent/LoginComponent';
import NavBar from './components/NavBar/NavBar';
import Page404 from './components/Page404/Page404'
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import QuizDetails from './components/QuizComponents/QuizDetails/QuizDetails';
import QuizList from './components/QuizComponents/QuizList/QuizList';
import QuizPublicList from './components/QuizComponents/QuizPublicList/QuizPublicList';
import { hideLoading, showLoading } from './redux/actions/loading.actions';
import { removeSession, saveSession } from './redux/actions/session.actions';
import { getStorage } from './Services/Storage';
import { getSessionData } from './Services/ApiServices/UserServices';

export default function App() {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const { loading } = useSelector(state => state);

  const getSession = async () => {
    dispatch(showLoading());
    const res = await getSessionData();

    if (res && !res.error) {
      dispatch(saveSession(res));
    }
    else if (res && res.error === 401) dispatch(removeSession);
    else dispatch(removeSession);

    dispatch(hideLoading());
  }

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      const login = !!getStorage('token');
      if (!login) dispatch(removeSession);
      else {
        const data = getStorage('session');
        if (typeof data !== 'string') dispatch(saveSession(data));
        else getSession();
      }
    }
  }, [isMounted]);

  return (
    <>
      <div className="mb-4">
        <NavBar />

        <main className="container">
          <Routes>
            <Route path="/" element={<QuizPublicList />} />
            <Route path="/acceder" element={<LoginComponent />}/>
            <Route path="/mis-quiz" element={<QuizList own />} />
            <Route path="/registro" element={<RegisterComponent />}/>
            <Route path="/quiz" element={<QuizPublicList />} />
            <Route path="/quiz/:id" element={<QuizDetails />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>

      </div>
      { loading && <Loader /> }
    </>
  )
}
