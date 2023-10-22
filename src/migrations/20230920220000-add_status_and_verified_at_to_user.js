'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'status', {
      type: Sequelize.DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'verified', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'status');
    await queryInterface.removeColumn('users', 'verified');
  }
};
