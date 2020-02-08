const express = require('express');

const auth = require('./middlewares/auth');

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const repoController = require('./controllers/repoController');

const routes = express.Router();

routes.get('/me', auth.default, userController.show);
routes.post('/users', userController.store);

routes.post('/auths', authController.store);

routes.get('/repos', auth.verify, repoController.index);
routes.get('/myrepos', auth.default, repoController.show);
routes.post('/repos', auth.default, repoController.store);
routes.delete('/repos/:repo_id', auth.default, repoController.destroy);

module.exports = routes;
