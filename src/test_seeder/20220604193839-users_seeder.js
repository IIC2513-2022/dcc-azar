'use strict';

const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

let usersArray;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    usersArray = [];
    usersArray.push(
      {
        firstName: 'Gordon',
        lastName: 'Freeman',
        username: 'GFreeman',
        age: 27,
        password: bcrypt.hashSync('DCCazar1!', PASSWORD_SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Mario',
        lastName: 'Mario',
        username: 'Mario',
        age: 25,
        password: bcrypt.hashSync('azar', PASSWORD_SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Delete',
        lastName: 'User',
        username: 'DeleteUser',
        age: 99,
        password: bcrypt.hashSync('DCCazar', PASSWORD_SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
    return queryInterface.bulkInsert('users', usersArray);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', usersArray);
  },
};
