// function for checking if session.currentUserId is set
const isAuthenticated = async (ctx, next) => {
    if (ctx.session.currentUserId) {
        ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
        await next();
        console.log(ctx.session.currentUserId)
        console.log(ctx.state.currentUser)
        console.log(ctx.session)
    } else {
        const error = 'User is not logged in';
        ctx.body = error;
        ctx.status = 401;
    }
}

module.exports = {isAuthenticated};
