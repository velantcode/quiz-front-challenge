import React  from 'react';

export default function Question ({ question, selected, handleSelect }) {
  const handleClickSelect = (v) => handleSelect ? handleSelect(v) : null;
  return (
    <>
      {
        question &&
        <div className="row">
          <div className="col-12">
            <h4 className="my-auto">{question.question}</h4>
            <hr/>
          </div>
          <div className="col-12">
            <div className="mt-3">
              {
                question.values?.map((v, i) =>
                  <div className="border my-2 question-select w-100 px-2" key={`${question._id}-${i}-item-question`}>
                    <div className="d-flex d-table-row align-items-center form-check">
                      <div className="mx-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={i}
                          id={`${question._id}-${i}-item-question`}
                          checked={selected === i}
                          onChange={({ target }) => handleClickSelect(parseInt(target.value, 10))}
                        />
                      </div>
                      <label className="form-check-label w-100 py-4" htmlFor={`${question._id}-${i}-item-question`}>
                        <h5 className="my-auto">{v}</h5>
                      </label>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}
