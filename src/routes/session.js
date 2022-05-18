const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');
const {generateToken} = require('../middlewares/auth');

const router = new KoaRouter();

// endpoint para crear la sesión, login
router.post('session.create', '/', async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await ctx.orm.user.findOne({ where: { username } });
    const authenticated = (user && user.password == password);
    if (authenticated) {
      try{
        ctx.session.currentUserId = user.id;
        const token = await generateToken(user);
        ctx.body = {
            access_token: token,
            token_type: 'Bearer',
        };
        ctx.status = 200;
      } catch(err){
        ctx.body = err;
      }
    } else {
      const error = user ? 'Wrong password' : 'The username is not registered';
      ctx.body = error;
      ctx.status = 401;
    }
  });

// endpoint para destruir la sesión, logout
router.delete('session.destroy', '/', async (ctx) => {
    ctx.session = null;
    ctx.status = 200;
  });
  module.exports = router;
