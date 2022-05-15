const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const users = require('./routes/users');
const waitingRooms = require('./routes/waitingRooms');
const session = require('./routes/session');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/users', users.routes());
router.use('/waitingRooms', waitingRooms.routes());

module.exports = router;
