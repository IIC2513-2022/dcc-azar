const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['firstName', 'lastName', 'username', 'age', 'password'] });
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    const errorMessage = error.errors.map(e => e.message);
    ctx.body = errorMessage;
    ctx.status = 400;
  }
});

router.get('/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  ctx.body = users;
  ctx.status = 200;
});

module.exports = router;
