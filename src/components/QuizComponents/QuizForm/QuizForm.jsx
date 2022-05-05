import React, { useEffect, useState } from 'react';
import { FiEye, FiSave, FiX } from 'react-icons/fi'
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizQuestionElem from './QuizQuestionElem';
import QuizPreview from '../QuizPreview/QuizPreview';
import QuizQuestionElemForm from './QuizQuestionElemForm';
import Alert from '../../Alert/Alert';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import { quizFormAction } from '../../../redux/actions/quiz.actions';
import { saveQuizUser, updateQuizUser } from '../../../Services/ApiServices/UserServices';
import { copyObjectParse } from '../../../Utils/GlobalsFunctions';
import { SweetAlert } from '../../../Utils/SweetAlert';

export default function QuizForm ({ data, handleCancel, handleUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizForm } = useSelector(state => state.quiz);

  const [indexQuestionSelected, setIndexQuestionSelected] = useState(null);
  const [previewQuiz, setPreviewQuiz] = useState(false);
  const [questionSelected, setQuestionSelected] = useState(null);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const addQuiz = async () => {
    const res = !data ? await saveQuizUser(quizForm) : await updateQuizUser(data._id, quizForm);

    if (res && !res.error) {
      if (handleUpdate) handleUpdate(res.data);
      SweetAlert({
        title: 'Éxito',
        html: `Se ha ${data ? 'actualizado' : 'agregado'} el Quiz exitosamente.`,
        icon: 'success'
      });
    }
    else if (res && res.error === 401) navigate('/acceder');
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    const {title, description, questions} = quizForm;
    const msg = {
      title: 'Campos incompletos',
      html: null,
      icon: 'error'
    }

    if (!title || !description || questions.length === 0) {
      msg.html = 'Disculpe, pero debe completar el formulario.';
      SweetAlert(msg);
    }
    else {
      const { length } = questions;
      let error = false;

      for (let i = 0; i < length; i++) {
        if (!questions[i].question || questions[i].answer === null || questions[i].values?.length < 2) {
          error = true;
          break;
        }
      }

      if (msg.html) SweetAlert(msg);
      else setShowModalConfirm(true);
    }
  }

  const handleChange = ({ target }) => {
    const { name, value } = target || {};
    quizForm[name] = value.toUpperCase();
    dispatch(quizFormAction(quizForm));
  }

  const handleAddQuestion = (q = null) => {
    if (q) {
      if (indexQuestionSelected !== null) {
        quizForm.questions[indexQuestionSelected] = { ...q };
        setQuestionSelected(null);
        setIndexQuestionSelected(null);
      }
      else quizForm.questions.push(q);

      dispatch(quizFormAction(quizForm));
    }
  }

  const handleEditQuestion = (index) => {
    const q = copyObjectParse(quizForm.questions[index]);
    if (q) {
      setQuestionSelected(q);
      setIndexQuestionSelected(index);
      setShowQuestions(false);
    }
  }

  const handleRemoveQuestion = (index) => {
    quizForm.questions.splice(index, 1);
    dispatch(quizFormAction(quizForm));
    setQuestionSelected(null);
    setIndexQuestionSelected(null);
  }

  const handleCancelEditQuestion = () => {
    setQuestionSelected(null);
    setIndexQuestionSelected(null);
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="row align-items-center">
          <div className={`col-auto ${!previewQuiz ? 'd-none' : 'd-block d-md-none'}`}>
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={() => setPreviewQuiz(false)}
            >
              <FiX />
            </button>
          </div>
          <div className="col">
            <h4 className="my-auto">
              {previewQuiz ? 'Preview del' : (data ? 'Editar' : 'Agregar')} Quiz
            </h4>
          </div>
          <div className={`col-auto ${previewQuiz ? 'd-none' : 'd-block d-md-none'}`}>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-1"
              onClick={() => setShowQuestions(!showQuestions)}
            >
              {showQuestions ? 'Ocultar' : 'Ver'} preguntas ({ quizForm?.questions?.length || 0 })
            </button>
          </div>

          <div className="col-12 my-auto"><hr/></div>
        </div>
      </div>

      {
        quizForm &&
        <div className={`col-12 ${previewQuiz ? 'd-none' : ''}`}>
          <form onSubmit={handleSubmit} className="form col-12">
            <div className="row">
              <div className={`col-12 col-md-6 ${showQuestions ? 'd-none d-md-block' : ''}`}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    maxLength={50}
                    value={quizForm.title}
                    onChange={handleChange}
                    placeholder="Título para el Quiz"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    name="description"
                    rows={4}
                    maxLength={2000}
                    value={quizForm.description}
                    onChange={handleChange}
                    placeholder="Descripción sobre el Quiz"
                  />
                </div>

                <hr/>

                <QuizQuestionElemForm
                  item={questionSelected}
                  handleSave={handleAddQuestion}
                  handleCancel={handleCancelEditQuestion}
                />
              </div>
              <div className={`col-12 col-md-6 mt-2 h-600 ${!showQuestions ? 'd-none d-md-block' : ''}`}>
                <h6>Preguntas del Quiz</h6>
                <hr/>
                {
                  quizForm.questions?.length > 0 ?
                    quizForm.questions?.map((q, i) => (
                      <QuizQuestionElem
                        item={q}
                        key={`${i}-question-item-form`}
                        handleEdit={() => handleEditQuestion(i)}
                        handleRemove={() => handleRemoveQuestion(i)}
                      />
                    ))
                    :
                    <Alert msg="Debe indicar las preguntas para el Quiz." />
                }
              </div>
              <div className={`col-12 text-center ${showQuestions ? 'd-none' : ''}`}>
                <hr/>
                <button
                  type="button"
                  className="btn btn-light m-1"
                  onClick={() => handleCancel ? handleCancel() : null}
                >
                  <FiX className="my-auto"/>{' '}Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-info m-1"
                  onClick={() => setPreviewQuiz(true)}
                >
                  <FiEye className="my-auto"/>{' '}Previsualizar
                </button>
                <button className="btn btn-success m-1" type="submit">
                  <FiSave className="my-auto"/>{' '}{data ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      }

      { previewQuiz && <QuizPreview data={quizForm} handleClose={() => setPreviewQuiz(false)} /> }

      <ModalConfirm
        show={showModalConfirm}
        title={`¿Está seguro qué desea ${data ? 'actualizar' : 'agregar'} este Quiz?`}
        handleClose={() => setShowModalConfirm(false)}
        handleConfirm={addQuiz}
      />
    </div>
  )
}
