const Sequelize = require('sequelize');

const dbConfig = require('../config/config');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;