// funcion para validar validez de cookie
const isAuthenticated = async (ctx, next) => {
    if (ctx.session.currentUserId) {
        //ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
        await next();
    } else {
        const error = 'User is not logged in';
        ctx.body = error;
        ctx.status = 401;
    }
}


module.exports = {isAuthenticated};
