const Sequelize = require('sequelize');

const dbConfig = require('../config/config');
const User = require('../models/User');
const Repository = require('../models/Repository');
const Comparison = require('../models/Comparison');

const connection = new Sequelize(dbConfig);

User.init(connection);
Repository.init(connection);
Comparison.init(connection);

User.associate(connection.models);
Repository.associate(connection.models);
Comparison.associate(connection.models);

module.exports = connection;
