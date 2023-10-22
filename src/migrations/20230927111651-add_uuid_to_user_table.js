'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'uuid', {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('users', 'uuid');
  }
};
