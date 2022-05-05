import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/actions/loading.actions';
import { saveSession } from '../../redux/actions/session.actions';
import { getStorage } from '../../Services/Storage';
import { login } from '../../Services/ApiServices/PublicService';
import { SweetAlert } from '../../Utils/SweetAlert';

export default function LoginComponent () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useSelector(state => state);

  const [form, setForm] = useState({
    password: '',
    username: '',
  });

  useEffect(() => {
    const token = getStorage('token');
    if (session || token) navigate('/');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.username && form.password) {
      dispatch(showLoading());

      const res = await login(form);

      if (res && !res.error) {
        dispatch(saveSession(res))
        navigate('/');
      }
      else {
        form.password = '';
        setForm({ ...form });
      }
      dispatch(hideLoading());
    }
    else
      SweetAlert({
        title: 'Campos incompletos',
        html: 'Debe indicar su usuario y su contraseña.',
        icon: 'error'
      });
  }

  const handleChange = ({ target }) => {
    const { name, value } = target || {};
    form[name] = value;
    setForm({ ...form });
  }

  return (
    <section className="row justify-content-center">
      <article className="col-11 col-sm-9 col-md-7 col-lg-6">
        <h2>Inicia sesión</h2>
        <hr/>

        <form onSubmit={handleSubmit} className={form}>
          <div className="mb-2">
            <input
              className="form-control"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
          </div>
          <div className="mb-2">
            <input
              className="form-control"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>
          <hr/>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Acceder
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}
