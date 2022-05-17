const KoaRouter = require('koa-router');

const users = require('./routes/users');
const waitingRooms = require('./routes/waitingRooms');
const sessions = require('./routes/session');
const {isAuthenticated} = require('./middlewares/auth');

const router = new KoaRouter();

/*Unprotected routes*/
router.use('/session', sessions.routes());
/*Protected routes*/
router.use('/users', users.routes());
router.use(isAuthenticated);
router.use('/waitingRooms', waitingRooms.routes());

module.exports = router;
