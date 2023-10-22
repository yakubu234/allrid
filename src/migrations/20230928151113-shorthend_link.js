'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('shorthend_link', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      original_link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      short_link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      redirect_link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      link_type: {
        type: Sequelize.DataTypes.ENUM('web', 'mobile'),
        defaultValue: 'web',
        allowNull: false,
      },
      link_expiry: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: null
      },
      total_click: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('shorthend_link');
  }
};
