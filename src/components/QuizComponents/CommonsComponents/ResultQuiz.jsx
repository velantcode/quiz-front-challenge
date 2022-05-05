import React from 'react';
import QuizAnswerBadge from '../QuizForm/QuizAnswerBadge';

export default function ResultQuiz ({ result, answers, questions }) {
  return (
    <>
      {
        result &&
        <div className="row">
          <div className="col-12 text-center">
            <img src={'/img/quiz.png'} alt="quiz-pic" className="img-fluid my-4" width="150"/>
            <h3>Se ha completado el Quiz exitosamente.</h3>
            <p className="text-muted">
              A continuación, le mostramos su resultado.
            </p>
          </div>
          <div className="col-6 text-center">
            <h3 className="font-monospace">{result?.totalCorrectAnswers || 0}</h3>
            <span className="text-muted small">Corectas</span>
          </div>
          <div className="col-6 text-center">
            <h3 className="font-monospace">{result?.totalIncorrectAnswers || 0}</h3>
            <span className="text-muted small">Incorrectas</span>
          </div>
          <div className="col-12">
            <hr/>
            <h3>Mis respuestas</h3>
            <hr/>
            <div className="row h-600">
              {
                questions.map((q, i) => (
                  <div className="col-12 py-2 border mb-2 rounded" key={`${q._id}-check-question`}>
                    <div className="row">
                      <div className='col-12'>
                        <h5>{q.question}</h5>
                        <hr/>
                      </div>
                      <div className='col-12 col-sm-6 mb-2'>
                        <span className="font-monospace">Mi respuesta: </span><br/>
                        <QuizAnswerBadge value={q.values[answers[i].answer]} />
                      </div>
                      <div className='col-12 col-sm-6'>
                        <span className="font-monospace">Respuesta correcta: </span><br/>
                        <QuizAnswerBadge value={q.values[result.allCorrectAnswer[i].answer]} />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}
