import React, { useEffect, useState } from 'react';
import QuizCard from '../QuizCard/QuizCard';
import Alert from '../../Alert/Alert';
import NavLink from '../../NavLink/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/actions/loading.actions';
import { quizAddList, quizDetailsRemove } from '../../../redux/actions/quiz.actions';
import { listQuizPublic } from '../../../Services/ApiServices/PublicService';

export default function QuizPublicList () {
  const dispatch = useDispatch();
  const { quiz } = useSelector(state => state);
  const [isMounted, setIsMounted] = useState(false);

  const getQuizList = async () => {
    dispatch(showLoading());
    const res = await listQuizPublic();
    if (res && !res.error) {

      dispatch(quizDetailsRemove());
      dispatch(quizAddList(res || []));
    }
    // setList(res || []);
    dispatch(hideLoading());
  }

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) getQuizList();
  }, [isMounted]);

  return (
    <div className="row">
      <div className="col-12">
        <h3>Quiz públicos</h3>
        <hr/>
      </div>

      {
        quiz?.quizList?.map(l => (
          <div className="col-12 col-md-6 col-xl-4 mb-2" key={`${l._id}-link-quiz`}>
            <NavLink to={`/quiz/${l._id}`}>
              <QuizCard item={l} key={`${l._id}-item-quiz`} />
            </NavLink>
          </div>
        ))
      }

      { (!quiz || quiz?.quizList?.length === 0) && <Alert msg="No existen Quiz en estos momentos."/> }
    </div>
  )
}
