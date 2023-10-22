'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample data into the "users" table
    return queryInterface.bulkInsert('users', [
      {
        title: 'Task 1',
        description: 'Description for Task 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        description: 'Description for Task 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 3',
        description: 'Description for Task 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
