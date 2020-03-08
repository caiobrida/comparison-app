import api from './api';

async function getRepos() {
  return await api.get('/repos');
}

export default {
  getRepos,
}
