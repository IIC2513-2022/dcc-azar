const supertest = require('supertest');
const app = require('../app');

const request = supertest(app.callback());

describe('GET /hello', () => {
  test('responds correctly', async () => {
    const response = await request.get('/hello');

    expect(response.status).toBe(404);
  });
});

describe('POST /hello', () => {
  test('responds correctly', async () => {
    const response = await request.post('/hello');
    expect(response.status).toBe(404);
  });
});
describe('GET /hello/:name', () => {
  test('responds correctly', async () => {
    const response = await request.get('/hello/my-name');

    expect(response.status).toBe(404);
  });
});
