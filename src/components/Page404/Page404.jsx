import React from 'react'
import { FiHome } from 'react-icons/fi';
import NavLink from '../NavLink/NavLink';

export default function Page404 () {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <h2 className="h1 my-5">404</h2>
        <h4 className="my-3">No se encontró lo que buscaba.</h4>
        <hr/>
        <div className="w-100 text-center">
          <NavLink to="/">
            <div className="btn btn-primary">
              <FiHome />{' '}Ir al inicio
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
