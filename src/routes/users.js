const KoaRouter = require('koa-router');
const { isAuthenticated } = require('../middlewares/auth');

const router = new KoaRouter();

// http://localhost:3000/users/ (se agrega un usuario)
router.post('/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['firstName', 'lastName', 'username', 'age', 'password'] });
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    const errorMessage = error.errors.map((e) => e.message);
    ctx.body = errorMessage;
    ctx.status = 400;
  }
});

router.use(isAuthenticated);

// http://localhost:3000/users/ (se obtienen todos los usuarios)
router.get('/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  ctx.body = users;
  ctx.status = 200;
});

// http://localhost:3000/users/id (se obtienen un usuario)
router.get('/:id', async (ctx) => {
  const userId = ctx.params.id;
  const user = await ctx.orm.user.findOne({ where: { id: userId } });
  ctx.body = user;
  ctx.status = 200;
});

// http://localhost:3000/users/id (se elimina el usuario con un id especifico)
router.delete('/:id', async (ctx) => {
  // const { userId } = ctx.params;
  const userId = ctx.params.id;
  try {
    const user = await ctx.orm.user.findOne({ where: { id: userId } });
    await user.destroy();
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400);
    ctx.body = ValidationError;
  }
});

module.exports = router;
