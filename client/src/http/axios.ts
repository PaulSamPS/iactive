import axios from 'axios';

export const API_URL = 'http://176.113.83.209:5005';

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
