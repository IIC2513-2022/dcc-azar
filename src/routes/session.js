const KoaRouter = require('koa-router');

const router = new KoaRouter();

// endpoint para crear la sesión 
router.post('session.create', '/', async (ctx) => {
    // obtiene email y password del cuerpo de la request
    const { email, password } = ctx.request.body;
    // obtiene al usuario con ese email
    const user = await ctx.orm.user.findOne({ where: { email } });
    // si el usuario existe y la contraseña es correcta
    const authenticated = (user && await user.checkPassword(password));
    if (authenticated) {
    // se le asigna a session el id del usuario
      ctx.session.currentUserId = user.id;
    } else {
      //si usuario existe, falló la contraseña. Si no existe, el email no está registrado
      const error = user ? 'Wrong password' : 'The email is not registered';
      ctx.body = error;
      ctx.status = 401;
    }
  });

  module.exports = router;
