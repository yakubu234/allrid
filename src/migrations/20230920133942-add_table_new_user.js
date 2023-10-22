'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nick_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
