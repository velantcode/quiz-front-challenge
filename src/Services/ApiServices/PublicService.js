import { getData, postData } from '../AxiosService';
import { altResponse } from '../GlobalService';

const pt = '/quiz';

/* Login */

export async function login (form = {}) {
  const res = await postData('/login', form);
  if (res && res.success) return res.data?.data || null;
  return altResponse(res);
}

export async function register (form = {}) {
  const res = await postData('/register', form);
  if (res && res.success) return res.data?.data || null;
  return altResponse(res);
}

/* PUBLIC QUIZ */

export async function listQuizPublic () {
  const res = await getData(`${pt}/`);
  if (res && res.success) return res.data?.data || [];
  return altResponse(res);
}

export async function getQuizPublic (id) {
  const res = await getData(`${pt}/${id}`);
  if (res && res.success) return res.data?.data || null;
  return altResponse(res);
}

export async function processQuizPublic (id, form = {}) {
  const res = await postData(`${pt}/${id}`, form);
  if (res && res.success) return res.data?.data || null;
  return altResponse(res);
}
