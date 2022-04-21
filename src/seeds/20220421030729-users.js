'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersArray = [];
    usersArray.push({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Jack',
      lastName: 'Doe',
      username: 'jackdoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'Jill',
      lastName: 'Doe',
      username: 'jilldoe',
      age: 25,
      password: 'azar',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('users', usersArray);
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
