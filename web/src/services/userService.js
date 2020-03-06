import api from './api';

async function register(user) {
  try{
    await api.post('/users', user);
    return {
      status: 200,
    }
  } catch (err) {
    return {
      status: 400,
      message: err.response.data.message,
    }
  }

}

async function getUser() {
  try {
    const response = await api.get('/me');
    return {
      status: 200,
      response,
    };
  } catch (err) {
    return {
      status: 400,
      message: err.response.data.message,
    }
  }
}

async function updateUser(user) {
  try {
    const response = await api.put('/users', user);
    const { token } = response.data;
    return {
      status: 200,
      token,
    }
  } catch (err) {
    return {
      status: 400,
      message: err.response.data.message,
    }
  }
}

export default {
  register,
  getUser,
  updateUser,
}
