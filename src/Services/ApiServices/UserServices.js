import { deleteData, getData, postData, putData } from '../AxiosService';
import { altResponse } from '../GlobalService';

const pt = '/user';

export async function getSessionData () {
  const res = await getData(`${pt}/`);
  if (res && res.success) return res.data?.data || [];
  return altResponse(res);
}

export async function updateSessionData (form = {}) {
  const res = await putData(`${pt}/`, form);
  if (res && res.success) return res.data || null;
  return altResponse(res);
}

export async function changePassword (form = {}) {
  const res = await putData(`${pt}/change-password`, form);
  if (res && res.success) return res.data || null;
  return altResponse(res);
}

/* Quiz */
export async function getQuizUser () {
  const res = await getData(`${pt}/quiz`);
  if (res && res.success) return res.data?.data || [];
  return altResponse(res);
}

export async function getHistoricalQuizUser () {
  const res = await getData(`${pt}/quiz/historical`);
  if (res && res.success) return res.data?.data || [];
  return altResponse(res);
}

export async function getDataQuizUser (id) {
  const res = await getData(`${pt}/quiz/${id}`);
  if (res && res.success) return res.data?.data || {};
  return altResponse(res);
}

export async function saveQuizUser (form = {}) {
  const res = await postData(`${pt}/quiz`, form);
  if (res && res.success) return res.data || null;
  return altResponse(res);
}

export async function updateQuizUser (id, form = {}) {
  const res = await putData(`${pt}/quiz/${id}`, form);
  if (res && res.success) return res.data || null;
  return altResponse(res);
}

export async function deleteQuizUser (id) {
  const res = await deleteData(`${pt}/quiz/${id}`);
  if (res && res.success) return res.data || null;
  return altResponse(res);
}
