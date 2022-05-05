import { removeStorage } from './Storage';
import { SweetAlert } from '../Utils/SweetAlert';

export function clearAllData () {
  removeStorage('token');
  removeStorage('session');
}

export async function altResponse (res) {
  SweetAlert({
    title: 'Alerta',
    html: res?.error || 'Error desconocido.'
  });

  if (res?.status === 401) {
    clearAllData();
    return { error: 401 };
  }

  return res;
}
