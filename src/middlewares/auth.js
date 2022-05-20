const jwtgenerator = require('jsonwebtoken');

// funcion para validar validez de cookie
const isAuthenticated = async (ctx, next) => {
  if (ctx.session.currentUserId) {
    // ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
    await next();
  } else {
    const error = 'User is not logged in';
    ctx.body = error;
    ctx.status = 401;
  }
};

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { sub: user.id, name: user.username, age: user.age },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

module.exports = { isAuthenticated, generateToken };
