import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheckSquare, FiChevronsRight, FiHome } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import Question from '../CommonsComponents/Question';
import ResultQuiz from '../CommonsComponents/ResultQuiz';
import Alert from '../../Alert/Alert';
import NavLink from '../../NavLink/NavLink';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import { quizDetailsAction } from '../../../redux/actions/quiz.actions';
import { hideLoading, showLoading } from '../../../redux/actions/loading.actions';
import { getQuizPublic, processQuizPublic } from '../../../Services/ApiServices/PublicService';
import { SweetAlert } from '../../../Utils/SweetAlert';

export default function QuizDetails () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector(state => state);
  const { quizDetails, quizList } = useSelector(state => state.quiz);

  const [form, setForm] = useState([]);
  const [result, setResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState( null);
  const [totalsQuestions, setTotalQuestions] = useState( null);
  const [startQuiz, setStartQuiz] = useState( false);
  const [showModalConfirm, setShowModalConfirm] = useState( false);

  const getQuizData = async () => {
    const res = await getQuizPublic(id);

    if (res && !res?.error) {
      setForm(res?.questions?.map(q => ({ _id: q._id, answer: null })));
      setCurrentQuestion(0);
      setTotalQuestions(res?.questions?.length - 1);
      dispatch(quizDetailsAction(res));
    }
    dispatch(hideLoading());
  }

  const sendQuestions = async () => {
    setShowModalConfirm(false);
    dispatch(showLoading());
    const res = await processQuizPublic(id, { answers: form });

    if (res && !res.error) setResult(res);
    dispatch(hideLoading());
  }

  useEffect(() => {
    if (id) {
      dispatch(showLoading());
      const d = quizList?.find(ql => ql._id === id);
      if (d) {
        setForm(d.questions?.map(q => ({ _id: q._id, answer: null })));
        setCurrentQuestion(0);
        setTotalQuestions(d.questions.length - 1);
        dispatch(quizDetailsAction(d));
        dispatch(hideLoading());
      }
      else getQuizData();
    }
  }, []);

  const handleSelect = (v) => {
    form[currentQuestion].answer = v;
    setForm([...form]);
  }

  const handleNext = () => {
    if (form[currentQuestion].answer !== null) {
      if (currentQuestion === totalsQuestions) setShowModalConfirm(true);
      else setCurrentQuestion(currentQuestion + 1);
    }
    else
      SweetAlert({
        title: 'Seleccione',
        html: 'Disculpe, pero debe seleccionar una respuesta.',
        icon: 'error'
      });
  };

  const handleStartQuiz = (start = false) => {
    setStartQuiz(start);
    setCurrentQuestion(0);
  }

  if (loading) return <></>;

  if (!quizDetails) return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <Alert msg='Disculpe, pero el Quiz seleccionado no existe.' color="danger" />
      </div>
      <div className="col-12"/>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
        <NavLink to="/">
          <div className="btn btn-secondary my-3">
            Regresar
          </div>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="row justify-content-center">
      <div className={`col-12 col-sm-10 col-md-8 col-lg-6 text-center ${!startQuiz ? '' : 'd-none'}`}>
        <div className="row">
          <div className="col-12 mb-3 text-break">
            <h4>{quizDetails.title}</h4>
            <hr/>
          </div>
          <div className="col-12 h-400">
            <p className="text-muted">{quizDetails.description}</p>
          </div>
        </div>
        <div className="col-12">
          <hr/>
          <button
            className={`btn btn-primary btn-lg mb-3`}
            type="button"
            onClick={() => handleStartQuiz(true)}
          >
            Empezar Quiz{' '}<FiChevronsRight className="my-auto"/>
          </button>
          <br/>
          <NavLink to="/">
            <div className="btn btn-link my-3">
              Regresar
            </div>
          </NavLink>
        </div>
      </div>
      <div className={`col-12 col-sm-10 col-md-8 col-lg-6 ${startQuiz ? '' : 'd-none'}`}>
        {
          !result && currentQuestion !== null && (
            <Question
              question={quizDetails?.questions[currentQuestion]}
              handleSelect={handleSelect}
              selected={form[currentQuestion].answer}
            />
          )
        }

        { !result &&
          <>
            <hr/>
            <div className="row text-center">
              <div className="col">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                >
                  <FiArrowLeft className="my-auto"/>{' '}Anterior
                </button>
              </div>
              <div className="col">
                <button
                  className={`btn btn-${currentQuestion === totalsQuestions ? 'success' : 'primary'}`}
                  type="button"
                  onClick={handleNext}
                >
                  {
                    currentQuestion !== totalsQuestions ?
                      <>Siguiente{' '}<FiArrowRight className="my-auto"/></>
                      :
                      <>Finalizar{' '}<FiCheckSquare className="my-auto"/></>
                  }
                </button>
              </div>
            </div>
          </>
        }

        {
          result && (
            <>
              <ResultQuiz result={result} answers={form} questions={quizDetails.questions || []}/>
              <hr/>
              <div className="w-100 text-center">
                <NavLink to="/">
                  <div className="btn btn-primary">
                    <FiHome className="my-auto" />{' '}Regresar al inicio
                  </div>
                </NavLink>
              </div>
            </>
          )}
      </div>

      <ModalConfirm
        show={showModalConfirm}
        title="¿Está seguro qué desea finalizar este Quiz y ver los resultados?"
        extra="Una vez finalizado no podrá cambiar sus respuestas."
        handleClose={() => setShowModalConfirm(false)}
        handleConfirm={sendQuestions}
      />
    </div>
  )
}
