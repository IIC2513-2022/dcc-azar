const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const users = require('./users');

const router = new KoaRouter();

router.use('/users', users.routes());

router.get('/', async (ctx) => {
  await ctx.render('index', { appVersion: pkg.version });
});

module.exports = router;
