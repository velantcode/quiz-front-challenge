import React, { useEffect, useState } from 'react';
import { FiCheck, FiHome, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import NavLink from '../NavLink/NavLink';
import { hideLoading, showLoading } from '../../redux/actions/loading.actions';
import { saveSession } from '../../redux/actions/session.actions';
import { getStorage } from '../../Services/Storage';
import { register } from '../../Services/ApiServices/PublicService';
import { SweetAlert } from '../../Utils/SweetAlert'

export default function RegisterComponent () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useSelector(state => state);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [form, setForm] = useState({
    fullname: '',
    password: '',
    username: '',
  });

  useEffect(() => {
    const token = getStorage('token');
    if (session || token) navigate('/');
  }, []);

  const registerData = async () => {
    setShowModalConfirm(false);
    dispatch(showLoading());

    const res = await register(form);

    if (res && !res.error) {
      dispatch(saveSession(res))
      navigate('/');
    }
    dispatch(hideLoading());
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username && form.password && form.fullname)
      setShowModalConfirm(true);
    else
      SweetAlert({
        title: 'Campos incompletos',
        html: 'Debe todos los campos del formulario.',
        icon: 'error'
      });
  }

  const handleChange = ({ target }) => {
    const { name, value } = target || {};
    if (name === 'fullname') form[name] = value.toUpperCase();
    else if (name === 'username') form[name] = value.trim();
    else form[name] = value;
    setForm({ ...form });
  }

  return (
    <section className="row justify-content-center">
      <article className="col-11 col-sm-9 col-md-7 col-lg-6">
        <h2>Registrarme</h2>
        <hr/>

        <form onSubmit={handleSubmit} className={form}>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Indica tu nombre"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Indica tu nombre de usuario"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Indica tu contraseña"
            />
          </div>
          <hr/>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              <FiCheck /> Registrarme
            </button>

            <div className="my-4"/>
            <NavLink to="/acceder">
              <div className="btn btn-link">
                Acceder{' '}<FiLogIn className="my-auto" />
              </div>
            </NavLink>
          </div>
        </form>
      </article>
      <ModalConfirm
        show={showModalConfirm}
        title="¿Está seguro qué desea registrarse con estos datos?"
        handleClose={() => setShowModalConfirm(false)}
        handleConfirm={registerData}
      />
    </section>
  )
}
