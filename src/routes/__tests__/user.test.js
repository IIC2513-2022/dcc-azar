const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app.callback());
const db = require('../../models');

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
      }
    });
    userId = userTest.id;
    // logeamos al usuario
    const authResponse = await request
      .post('/session')
      .send({username: 'GFreeman', password: 'DCCazar1!'});
    
    cookie = authResponse.headers['set-cookie'];

    // Obtenemos el user a eliminar
    const userDelete = await app.context.orm.user.findOne({
      where: {
        username: 'DeleteUser',
      }
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

    describe('Fails to create user', () => {
      // No lastName
      const userData = {
        firstName: 'Koa',
        username: 'KoaUser',
        password: 'IIC2513',
      };

      beforeAll(async () => {
        response = await createUser(userData);
      });
      
      it('should have status 2400', async () => {
        expect(response.status).toBe(400);
      });
      it('should have created a user', async () => {
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

    describe('Fails to create user', () => {
      // No lastName
      const userData = {
        firstName: 'Koa',
        username: 'KoaUser',
        password: 'IIC2513',
      };

      beforeAll(async () => {
        response = await createUser(userData);
      });

      it('should have status 200', async () => {
        expect(response.status).toBe(400);
      });
      it('should have created a user', async () => {
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
    const getUser = async (id, cookie) => request
      .get(`/users/${id}`)
      .set('Cookie', cookie);

    describe('Obtain a user correctly', () => {
      beforeAll(async () => {
        response = await getUser(userId, cookie);
      });

      it('should have status 200', async () => {
        expect(response.status).toBe(200);
      });
      it('should have returned a user', async () => {
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
    const deleteUser = async (id, cookie) => request
      .delete(`/users/${id}`)
      .set('Cookie', cookie);

    describe('Fails when no token is given', () => {
      beforeAll(async () => {
        response = await deleteUser(userDeleteId, '');
      });

      it('should have status 401', async () => {
        expect(response.status).toBe(401);
      });
      it('should not have deleted user', async () => {
        const deletedUser = await app.context.orm.user.findByPk(userDeleteId);
        expect(deletedUser).not.toBe(undefined);
      });
    });

    describe('Delete a user correctly', () => {
      beforeAll(async () => {
        response = await deleteUser(userDeleteId, cookie);
      });
      
      it('should have status 200', async () => {
        expect(response.status).toBe(200);
      });
      it('check if user does not exist', async () => {
        const deletedUser = await app.context.orm.user.findByPk(userDeleteId);
        expect(deletedUser).toBe(null);
      });
    });
  });
});
