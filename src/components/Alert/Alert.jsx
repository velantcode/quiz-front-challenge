import React from 'react';

export default function Alert ({ msg, color }) {
  if (!msg) return <></>

  return (
    <div className={`alert alert-${color || 'info'} my-auto`} role="alert">
      {msg}
    </div>
  )
}
