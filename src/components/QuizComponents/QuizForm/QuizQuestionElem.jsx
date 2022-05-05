import React, { useState } from 'react';
import { FiArrowDown, FiArrowUp, FiEdit2, FiTrash2 } from 'react-icons/fi';
import QuizAnswerBadge from './QuizAnswerBadge';

function QuizQuestionElem ({ item, handleEdit, handleRemove }) {
  const [show, setShow] = useState(false);
  return (
    <>
      {
        item &&
        <div className="card rounded mb-2">
          <div className="card-header my-auto">
            <div className="row align-items-center">
              <div className="col-auto">
                <button type="button" className="btn btn-light" onClick={() => setShow(!show)}>
                  { show ? <FiArrowUp /> : <FiArrowDown />}
                </button>
              </div>
              <div className="col">
                <h5 className="card-title my-auto">{item.question}</h5>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary m-1"
                  onClick={() => handleEdit ? handleEdit() : null}
                >
                  <FiEdit2 />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger m-1"
                  onClick={() => handleRemove ? handleRemove() : null}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
          <div className={`card-body ${show ? '' : 'd-none'}`}>
            <div className="row">
              <div className="col-12">
                <span className="font-monospace">Opciones: </span><br/>
                { item.values.map((v, i) => (<QuizAnswerBadge value={v} key={`${i}-value-question`} />)) }
              </div>
              <div className="col-12">
                <span className="font-monospace">Respuesta correcta: </span><br/>
                <QuizAnswerBadge value={item.values[item.answer]} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(QuizQuestionElem);
