import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return config;
});
