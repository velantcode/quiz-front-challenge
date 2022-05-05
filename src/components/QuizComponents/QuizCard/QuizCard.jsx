import React from 'react';
import { FiEdit2, FiHash, FiTrash2, FiUser } from 'react-icons/fi';

function QuizCard ({ item, own, handleEdit, handleDelete }) {

  if (!item) return <></>;

  return (
    <div className="row quiz-card mx-1">
      <div className="col-12 w-100">
        <div className="row align-items-center">
          <div className="col">
            <h5 className="text-break w-100">{item.title?.length > 20 ? `${item.title.substr(0, (20))} ...` : item.title}</h5>
          </div>
          {
            own &&
            <div className="col-auto">

              <button
                type="button"
                className="btn btn-secondary btn-sm mx-1"
                onClick={() => handleEdit ? handleEdit(item) : null}
              >
                <FiEdit2 className="small" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm m-1"
                onClick={() => handleDelete ? handleDelete(item._id) : null}
              >
                <FiTrash2 className="small" />
              </button>
            </div>
          }
        </div>
        <hr className="my-1"/>
        {
          item.description ?
            <span className="text-muted small">
              {item.description.length > 50 ? `${item.description.substr(0, (30))} ...` : item.description}
            </span>
            : ''
        }
      </div>
      <div className="col-12 my-1">
        <div className="row">
          <div className="col">
            <FiHash />{' '}<span>{item.totalQuestions || 0}</span>
          </div>
          {
            !own &&
            <div className="col col-sm-auto">
              <FiUser/>{' '}<span className="small">{item.user.fullname || ''}</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default React.memo(QuizCard);
