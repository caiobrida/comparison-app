const express = require('express');

const auth = require('./middlewares/auth');

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

const routes = express.Router();

routes.get('/me', auth, userController.show);
routes.post('/users', userController.store);

routes.post('/auths', authController.store);

module.exports = routes;
