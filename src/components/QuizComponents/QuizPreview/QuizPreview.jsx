import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheckSquare, FiChevronsRight } from 'react-icons/fi';
import Question from '../CommonsComponents/Question';
import Alert from '../../Alert/Alert';
import ModalConfirm from '../../ModalConfirm/ModalConfirm';
import { SweetAlert } from '../../../Utils/SweetAlert';

function QuizPreview ({ data, handleClose }) {
  const [currentQuestion, setCurrentQuestion] = useState( null);
  const [totalsQuestions, setTotalQuestions] = useState( 0);
  const [form, setForm] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  useEffect(() => {
    if (data) {
      const listAnswer = [];
      data.questions?.forEach(q => {
        listAnswer.push({ _id: q._id, answer: null });
      });
      setForm(listAnswer);
      setTotalQuestions(listAnswer.length - 1);
      setCurrentQuestion(0);
    }
    else {
      setTotalQuestions(data.questions?.length || 0);
      setCurrentQuestion(null);
    }
  }, [data]);

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
  }

  const handleSelect = (v) => {
    setForm(prevState => {
      prevState[currentQuestion].answer = v;
      return [...new Set([...prevState])];
    });
  }

  const handleStartQuiz = (start = false) => {
    setStartQuiz(start);
    setCurrentQuestion(0);
  }

  if (!data) return (
    <div className="row">
      <div className="col-12">
        <Alert msg='Cargando previzualización del Quiz ...' />
      </div>
    </div>
  )

  return (
    <div className="row justify-content-center">
      <div className={`col-12 col-sm-10 col-md-8 col-lg-6 text-center ${!startQuiz ? '' : 'd-none'}`}>
        <div className="row">
          <div className="col-12 text-break">
            <h4>{data.title}</h4>
          </div>
          <div className="col-12">
            <hr/>
            <div className="text-muted" dangerouslySetInnerHTML={{ __html: data.description?.replace(/\n/g, '<br/>') }} />
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
            <button
              className={`btn btn-link my-3`}
              type="button"
              onClick={() => handleClose ? handleClose() : null}
            >
              Cerrar preview
            </button>
          </div>
        </div>
        <hr className="d-block d-md-none"/>
      </div>
      <div className={`col-12 col-sm-10 col-md-8 col-lg-6 ${startQuiz ? '' : 'd-none'}`}>
        {
          currentQuestion !== null ?
            <Question
              question={data.questions[currentQuestion]}
              handleSelect={handleSelect}
              selected={form[currentQuestion].answer}
            />
            :
            <Alert msg="No existen pregunta que resolver."/>
        }
        <hr/>
        <div className="row text-center">
          <div className={`col ${startQuiz && currentQuestion === 0 ? '' : 'd-none'}`}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => handleStartQuiz(false)}
            >
              <FiArrowLeft className="my-auto"/>{' '}Regresar
            </button>
          </div>
          <div className={`col ${currentQuestion > 0 ? '' : 'd-none'}`}>
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
      </div>

      <ModalConfirm
        show={showModalConfirm}
        title={`¿Está seguro qué desea finalizar este Quiz?`}
        handleClose={() => setShowModalConfirm(false)}
        handleConfirm={() => handleClose ? handleClose() : null}
      />
    </div>
  )
}

export default React.memo(QuizPreview);
