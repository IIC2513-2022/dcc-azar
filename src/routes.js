const KoaRouter = require('koa-router');

//const hello = require('./routes/hello');
//const index = require('./routes/index');
const users = require('./routes/users');
const waitingRooms = require('./routes/waitingRooms');
const sessions = require('./routes/session');
const {isAuthenticated} = require('./middlewares/auth');

const router = new KoaRouter();

//router.use('/', index.routes());
//router.use('/hello', hello.routes());

/*Unprotected routes*/
router.use('/session', sessions.routes());
/*Protected routes*/
router.use('/users', users.routes());
router.use(isAuthenticated);
router.use('/waitingRooms', waitingRooms.routes());

module.exports = router;
