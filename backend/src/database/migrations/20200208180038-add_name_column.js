/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('repositories', 'name', 
      { 
        type: Sequelize.STRING,
        allowNull: false,
        after: 'owner_user_id',
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('repositories', 'name');
  }
};
