import React, { useEffect, useState } from 'react';
import { FiDelete, FiCheck, FiPlus } from 'react-icons/fi';
import QuizAnswerBadge from './QuizAnswerBadge';
import Alert from '../../Alert/Alert';
import { copyObjectParse } from '../../../Utils/GlobalsFunctions';
import { SweetAlert } from '../../../Utils/SweetAlert';

export default function QuizQuestionElemForm ({ item, handleSave, handleCancel }) {
  const [formData, setFormData] = useState();
  const [answerInput, setAnswerInput] = useState('');

  useEffect(() => {
    const f = staticFormValues();
    if (item) {
      f.question = item.question || '';
      f.values = item.values || [];
      f.answer = item.answer ?? 0;
    }

    setFormData(f);
  }, [item])

  const handleSubmit = (e) => {
    e?.preventDefault();

    const { question, values, answer } = formData;
    const msg = {
      title: 'Campos incompletos',
      html: null,
      icon: 'error'
    };

    if (!question || values.length === 0 || answer === null)
      msg.html = 'Disculpe, pero debe completar los campos para la pregunta.';
    else if (values.length < 2)
      msg.html = 'Disculpe, pero debe indicar al menos 2 respuesta para la pregunta.';

    if (msg.html) SweetAlert(msg);
    else {
      if (handleSave) handleSave(copyObjectParse(formData));
      handleReset();
    }
  }

  const handleReset = () => {
    setFormData(staticFormValues());
    setAnswerInput('');
    if (handleCancel) handleCancel();
  }

  const handleChange = ({ target }) => {
    const { name, value } = target || {};
    formData[name] = name === 'answer' ? parseInt(value, 10) : value.toUpperCase();
    setFormData({ ...formData });
  }

  const handleAddAnswer = () => {
    if (answerInput) {
      if (formData.values.includes(answerInput.trim()))
        SweetAlert({
          title: 'Alerta',
          html: 'Disculpe, pero ya existe una respuesta similar.',
          icon: 'error'
        });
      else {
        formData.values.push(answerInput);
        setFormData({ ...formData });
        setAnswerInput('');
      }
    }
  }

  const handleRemoveAnswer = (index) => {
    formData.values.splice(index, 1);
    if (formData.answer === index) formData.answer = null;
    setFormData({ ...formData });
  }

  return (
    <div className="row">
      <div className="col-12">
        <h6>Agregar pregunta</h6>
      </div>

      {
        formData &&
        <div className="form col-12">
          <div className="row">
            <div className="col-12">
              <div className="mb-2">
                <input
                  className="form-control"
                  type="text"
                  name="question"
                  maxLength={60}
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Indique la pregunta"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  maxLength={50}
                  value={answerInput}
                  onChange={({ target }) => setAnswerInput(target.value.toUpperCase())}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      handleAddAnswer();
                    }
                  }}
                  placeholder="Indique una respuesta"
                  disabled={formData.values.length > 9}
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddAnswer}>
                  <FiPlus />
                </button>
              </div>
              <i className="text-muted small d-none d-md-block">Presione Enter para agregar</i>
              <div className="row mb-3">
                <div className="col-12 mb-2">
                  Respuestas: {formData.values.length} / 10
                </div>
                <div className="col-12">
                  {
                    formData.values.length > 0 ?
                      formData.values.map((v, i) => (
                        <QuizAnswerBadge
                          value={v}
                          handleRemove={() => handleRemoveAnswer(i)}
                          key={`${i}-value-question`}
                        />
                      ))
                      :
                      <Alert msg="Ingrese una respuesta" />
                  }
                </div>
              </div>
              <div className="mb-2">
                <select
                  value={formData.answer !== null ? formData.answer : ''}
                  className="form-select"
                  name="answer"
                  aria-label="Seleccione una respuesta correcta"
                  onChange={handleChange}
                >
                  <option value="">Seleccione una respuesta correcta</option>
                  {
                    formData.values?.map((v, i) => (
                      <option value={i} key={`${i}-item-answer-question`}>{v}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-12 text-center">
              <hr className="my-1"/>
              <button
                type="button"
                className="btn btn-light btn-sm m-1"
                onClick={handleReset}
              >
                <FiDelete className='my-auto'/>{' '}Reiniciar pregunta
              </button>
              <button
                className="btn btn-secondary btn-sm m-1"
                type="button"
                onClick={handleSubmit}
              >
                <FiCheck className='my-auto'/>
                {' '}
                {item ? 'Actualizar' : 'Agregar'} pregunta
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const staticFormValues = () => ({
  question: '',
  values: [],
  answer: null
});
