export const getStorage = (key) => {
  if (window) {
    const ret = window?.localStorage.getItem(key);
    if (ret?.indexOf('{') > -1) return JSON.parse(ret);
    return ret;
  }
  console.error('Error al leer localStorage.');
  return null;
};

export const removeStorage = (key) => {
  if (window) window?.localStorage.removeItem(key);
  else console.error('Error al leer localStorage.');
};

export const setStorage = (key, value) => {
  if (window) {
    const data = typeof value === 'object' ? JSON.stringify(value || {}) : value;
    window.localStorage.setItem(key, data);
  } else console.error('Error al leer localStorage.');
};
