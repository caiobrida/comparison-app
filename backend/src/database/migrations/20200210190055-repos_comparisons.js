/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('repo_comparisons', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        comparison_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'comparisons',
            key: 'id',
          },
        },
        repo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'repositories',
            key: 'id'
          },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
       });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('repo_comparisons');
  }
};
