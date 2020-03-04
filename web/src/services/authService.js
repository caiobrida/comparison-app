import api from './api';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

api.setJwt(getJwt());

async function login(email, password) {
  try{
    const response = await api.post('/auths', {
      email,
      password,
    });
    
    const { token } = response.data;
    localStorage.setItem(tokenKey, token);
    return {
      status: 200
    }
  } catch (err) {
    return {
      status: 400,
      message: err.response.data.message
    };
  }
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);  
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getJwt,
  getCurrentUser,
}