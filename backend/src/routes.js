const express = require('express');

const userController = require('./controllers/userController');

const routes = express.Router();

routes.post('/users', userController.store);

module.exports = routes;