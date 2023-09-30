// src/services/api.js

import axios from 'axios';

const baseURL = 'http://localhost:3000'; // URL base do servidor

const instance = axios.create({
  baseURL,
});

export default instance;
