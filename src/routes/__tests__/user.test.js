const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('User API routes', () => {
  beforeAll(async () => {
  });

  describe('POST /users', () => {
    beforeAll(async () => {
    });
  });
});