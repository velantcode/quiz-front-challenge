import React from 'react';
import { Modal } from 'react-bootstrap';
import { FiCheck, FiX } from 'react-icons/fi';

export default function ModalConfirm({ show, title, extra, handleConfirm, handleClose }) {
  return (
    <Modal
      className="w-100"
      show={show}
      size="md"
      onHide={() => (handleClose ? handleClose() : false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="p-4">
        <div className="row text-center">
          {
            title &&
            <div className="col-12 my-2">
              <h3 className="h5 d-none d-lg-inline">{title}</h3>
              <h4 className="h6 d-inline d-lg-none">{title}</h4>
            </div>
          }

          {
            extra &&
            <div className="col-12 mt-2 small">
              <p className="text-muted">{extra}</p>
            </div>
          }

          <div className="col-12">
            <hr className="mt-2" />
            <button className="btn btn-danger mx-1" type="button" onClick={() => (handleClose ? handleClose() : null)}>
              <FiX className="my-auto"/>{' '}Cancelar
            </button>
            <button className="btn btn-primary mx-1" type="button" onClick={() => (handleConfirm ? handleConfirm() : null)}>
              <FiCheck className="my-auto"/>{' '}Confirmar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
