/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('users', 'avatar', 
      { 
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('users', 'avatar');
  }
};
