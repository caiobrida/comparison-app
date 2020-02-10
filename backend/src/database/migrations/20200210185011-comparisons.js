/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('comparisons', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img2: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        diff: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        owner_user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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
      return queryInterface.dropTable('comparisons');
  }
};
