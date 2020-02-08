require('dotenv').config();

/* eslint-disable quote-props */
const config = {
  'development': {
    username: 'root',
    password: null,
    database: 'comparison_database',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  'test': {
    username: 'root',
    password: null,
    database: 'comparison_database',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  'production': {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};

const currEnv = process.env.NODE_ENV;

module.exports = config[currEnv];
