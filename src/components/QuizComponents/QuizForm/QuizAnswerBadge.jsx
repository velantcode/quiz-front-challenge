import React from 'react';
import { FiX } from 'react-icons/fi'

export default function QuizAnswerBadge ({ value, handleRemove }) {
  return (
    <>
      {
        value &&
        <span className="badge bg-secondary m-1 align-items-center">
          {value}{' '}
          <span className='my-auto' onClick={() => handleRemove ? handleRemove() : null} aria-hidden="true">
            <FiX />
          </span>
        </span>
      }
    </>
  )
}
