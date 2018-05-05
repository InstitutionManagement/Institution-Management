import axios from 'axios';
// import { reporters } from 'mocha';

function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return {
      'x-access-token': user.token
    };
  } else {
    return {};
  }
}

function serverConfig() {
  let API_BASE_PATH = '';
  if (process.env.NODE_ENV === 'development') {
    API_BASE_PATH = process.env.PUBLIC_URL;
  } else if (process.env.NODE_ENV === 'production') {
    API_BASE_PATH = process.env.PUBLIC_URL;
  }
  return API_BASE_PATH;
}

const API_BASE_PATH = serverConfig();
const HEADER = authHeader();

const http = axios.create({
  baseURL: API_BASE_PATH,
  headers: HEADER
});

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;
