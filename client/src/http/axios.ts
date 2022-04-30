import axios from 'axios';

export const API_URL = 'http://194.87.98.26:5000';

export const $api = axios.create({
  withCredentials: true,
});
