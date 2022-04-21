'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersArray = [];
    usersArray.push({
      firstname: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstname: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstname: 'Jack',
      lastName: 'Doe',
      username: 'jackdoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstname: 'Jill',
      lastName: 'Doe',
      username: 'jilldoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
