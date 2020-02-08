const Sequelize = require('sequelize');

const dbConfig = require('../config/config');
const User = require('../models/User');
const Repository = require('../models/Repository');

const connection = new Sequelize(dbConfig);

User.init(connection);
Repository.init(connection);

User.associate(connection.models);
Repository.associate(connection.models);

module.exports = connection;
