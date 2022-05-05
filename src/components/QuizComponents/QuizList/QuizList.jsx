import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../QuizCard/QuizCard';
import QuizForm from '../QuizForm/QuizForm';
import Alert from '../../Alert/Alert';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import { hideLoading, showLoading } from '../../../redux/actions/loading.actions';
import { quizAddUserList, quizFormAction, quizRemoveFormAction } from '../../../redux/actions/quiz.actions'
import { deleteQuizUser, getQuizUser } from '../../../Services/ApiServices/UserServices';
import { copyObjectParse } from '../../../Utils/GlobalsFunctions';
import { SweetAlert } from '../../../Utils/SweetAlert';

export default function QuizList (props) {
  const dispatch = useDispatch();
  const { quizUserList, quizForm } = useSelector(state => state.quiz);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [itemId, setItemId] = useState(null);

  const getQuizList = async () => {
    dispatch(showLoading());
    const res = await getQuizUser();
    if (res && !res.error) {
      dispatch(quizAddUserList(res));
    }
    else if (res?.error === 401) navigate('/acceder');
    dispatch(hideLoading());
  }

  const removeQuiz = async () => {
    dispatch(showLoading());
    setShowModalConfirm(false);
    const res = await deleteQuizUser(itemId);

    if (res && !res.error) {
      dispatch(quizAddUserList(quizUserList.filter(p => p._id !== itemId)));
      setItemId(null);
      SweetAlert({
        title: 'Éxito',
        html: 'Se ha eliminado el Quiz exitosamente',
        icon: 'success'
      });
    }
    else if (res?.error === 401) navigate('/acceder');
    dispatch(hideLoading());
  }

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) getQuizList();
  }, [isMounted]);

  const handleRemove = (elemId = null) => {
    if (elemId) {
      setItemId(elemId);
      setShowModalConfirm(true);
    }
  }

  const handleEdit = (item = null) => {
    const f = item ? copyObjectParse(item) : { title: '', description: '', questions: [] }
    dispatch(quizFormAction(f));
    setItemSelected(copyObjectParse(item));
    setShowForm(!showForm);
  }

  const handleUpdate = (item = null) => {
    if (item) {
      if (itemSelected) {
        const index = quizUserList.findIndex(l => l._id === itemSelected._id);

        if (index > -1) {
          quizUserList[index].title = item.title;
          quizUserList[index].description = item.description;
          quizUserList[index].questions = item.questions;
          quizUserList[index].totalQuestions = item.questions.length;
        }
      }
      else quizUserList.unshift(item);

      dispatch(quizAddUserList(quizUserList));
      setShowForm(false);
      setItemSelected(null);
    }
  }

  const handleCloseForm = () => {
    dispatch(quizRemoveFormAction());
    setShowForm(false);
    setItemSelected(null);
  }

  return (
    <div className="row">
      {
        showForm ?
          <div className="col-12">
            <QuizForm
              data={itemSelected}
              handleCancel={handleCloseForm}
              handleUpdate={handleUpdate}
            />
          </div>
          :
          <div className="col-12 justify-content-end">
            <div className="row">
              <div className="col">
                <h3>Mis Quiz</h3>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={() => handleEdit()}>
                  <FiPlus className='my-auto'/>{' '}Agregar
                </button>
              </div>
            </div>
            <hr/>
          </div>
      }

      <div className="col-12">
        <div className="row">
          { quizUserList?.map(l => (
            <div
              className={`col-12 col-md-6 col-xl-4 mb-1 ${!showForm && quizUserList?.length > 0 ? '' : 'd-none'}`}
              key={`${l._id}-item-quiz`}
            >
              <QuizCard
                item={l}
                own={props.own}
                handleEdit={handleEdit}
                handleDelete={handleRemove}
              />
            </div>
          ))}
        </div>
      </div>

      { !showForm && (!quizUserList || quizUserList?.length === 0) && <Alert msg="No tiene Quiz registrados."/> }

      <ModalConfirm
        show={showModalConfirm}
        title={`¿Está seguro qué desea eliminar este Quiz?`}
        handleClose={() => setShowModalConfirm(false)}
        handleConfirm={removeQuiz}
      />
    </div>
  )
}
