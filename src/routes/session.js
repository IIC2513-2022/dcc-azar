const KoaRouter = require('koa-router');

const router = new KoaRouter();

// endpoint para crear la sesión 
router.post('session.create', '/', async (ctx) => {
    // obtiene email y password del cuerpo de la request
    const { username, password } = ctx.request.body;
    // obtiene al usuario con ese email
    const user = await ctx.orm.user.findOne({ where: { username } });
    // si el usuario existe y la contraseña es correcta
    const authenticated = (user && user.password == password);
    if (authenticated) {
    // se le asigna a session el id del usuario
      ctx.session.currentUserId = user.id;
      ctx.status = 200;
    } else {
      //si usuario existe, falló la contraseña. Si no existe, el email no está registrado
      const error = user ? 'Wrong password' : 'The email is not registered';
      ctx.body = error;
      ctx.status = 401;
    }
  });

router.delete('session.destroy', '/', async (ctx) => {
    // se elimina la sesión
    ctx.session = null;
    ctx.status = 200;
  });
  module.exports = router;
