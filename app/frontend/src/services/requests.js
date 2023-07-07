import axios from 'axios';

// const HOST = process.env.REACT_APP_API_HOST || "localhost:3001";
// const HOST = process.env.REACT_APP_API_HOST || "localhost:3001";
// const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || "http";
const HOST = 'trybe-futebol-clube-backend.up.railway.app';
const PROTOCOL = 'https';

const api = axios.create({
  baseURL: `${PROTOCOL}://${HOST}`,
  // baseURL: 'https://trybe-futebol-clube-backend.up.railway.app/',
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
