import React from 'react';
import { NavLink as NavLinkRR } from 'react-router-dom';

export default function NavLink (props) {
  return (
    <NavLinkRR
      to={props.to || '/'}
      className={({ isActive }) => isActive ? 'is-active' : undefined}
    >
      {props.children}
    </NavLinkRR>
  )
}
