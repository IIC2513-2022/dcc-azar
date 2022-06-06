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
  let countInitialUsers;
  let userId;
  let userDeleteId;
  let cookie;

  beforeAll(async () => {
    countInitialUsers = await app.context.orm.user.count();
    // Generamos un token válido
    const userTest = await app.context.orm.user.findOne({
      where: {
        username: 'GFreeman',
      },
    });
    userId = userTest.id;
    // logeamos al usuario
    const authResponse = await request
      .post('/session')
      .send({ username: 'GFreeman', password: 'DCCazar1!' });

    cookie = authResponse.headers['set-cookie'];

    // Obtenemos el user a eliminar
    const userDelete = await app.context.orm.user.findOne({
      where: {
        username: 'DeleteUser',
      },
    });
    userDeleteId = userDelete.id;
  });

  let response;
  describe('POST /users', () => {
    const createUser = async (body) => request
      .post('/users')
      .send(body);
    describe('Create user correctly', () => {
      const userData = {
        firstName: 'Node',
        lastName: 'JS',
        username: 'NodeJS',
        password: 'Web1234!',
        age: 25,
      };

      beforeAll(async () => {
        response = await createUser(userData);
      });
      it('should have status 201', async () => {
        expect(response.status).toBe(201);
      });
      // Separados para mayor granularidad
      it('should have created a user', async () => {
        const countUser = await app.context.orm.user.count();
        expect(countUser).toBe(countInitialUsers + 1);
        countInitialUsers = countUser;
        // Buscamos que el usuario se cree con sus valores
        const newUser = await app.context.orm.user.findOne({
          where: {
            username: 'NodeJS',
          },
        });
        // Solo verificamos su nombre
        expect(newUser.firstName).toBe('Node');
      });
    });

    describe('Fails to create user when a param is missing', () => {
      // No lastName
      const userData = {
        firstName: 'Koa',
        username: 'KoaUser',
        password: 'IIC2513',
      };

      beforeAll(async () => {
        response = await createUser(userData);
      });

      it('should not have created a user', async () => {
        expect(response.status).toBe(400);
        const countUser = await app.context.orm.user.count();
        expect(countUser).toBe(countInitialUsers);
        // Buscamos que no exista el usuario
        const newUser = await app.context.orm.user.findOne({
          where: {
            username: 'KoaUser',
          },
        });
        expect(newUser).toBe(null);
      });
    });
  });

  describe('Get /user/:id', () => {
    const getUser = async (id, Cookie) => request
      .get(`/users/${id}`)
      .set('Cookie', Cookie);

    describe('Obtain a user correctly', () => {
      beforeAll(async () => {
        response = await getUser(userId, cookie);
      });

      it('should have returned user correctly', async () => {
        expect(response.status).toBe(200);
        // Verificamos un solo parametro
        expect(response.body.id).toBe(userId);
      });
    });

    describe('Fails when no token is given', () => {
      beforeAll(async () => {
        response = await getUser(userId, '');
      });

      it('should have status 401', async () => {
        expect(response.status).toBe(401);
      });
    });
  });

  describe('DELETE /user/:id', () => {
    const deleteUser = async (id, Cookie) => request
      .delete(`/users/${id}`)
      .set('Cookie', Cookie);

    describe('Fails when no token is given', () => {
      beforeAll(async () => {
        response = await deleteUser(userDeleteId, '');
      });

      it('should not have status deleted user', async () => {
        expect(response.status).toBe(401);
        const deletedUser = await app.context.orm.user.findByPk(userDeleteId);
        expect(deletedUser).not.toBe(undefined);
      });
    });

    describe('Delete a user correctly', () => {
      beforeAll(async () => {
        response = await deleteUser(userDeleteId, cookie);
      });

      it('should have status 200 and removed user from DB', async () => {
        expect(response.status).toBe(200);
        const deletedUser = await app.context.orm.user.findByPk(userDeleteId);
        expect(deletedUser).toBe(null);
      });
    });
  });
});
