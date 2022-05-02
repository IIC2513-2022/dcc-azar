const KoaRouter = require('koa-router');

const router = new KoaRouter();

// index
router.get('/', async (ctx) => {
  const waitingRooms = await ctx.orm.waitingRoom.findAll();
  ctx.body = waitingRooms;
  ctx.status = 200;
});

// show
router.get('/:id', async (ctx) => {
  const waitingRoomId = ctx.params.id;
  const waitingRoom = await ctx.orm.waitingRoom.findOne({ where: { id: waitingRoomId } });
  const creator = await waitingRoom.getCreator();
  ctx.body = {
    waitingRoom,
    creator,
  };
  ctx.status = 200;
});

// create
router.post('/', async (ctx) => {
  const waitingRoom = await ctx.orm.waitingRoom.build(ctx.request.body);
  try {
    await waitingRoom.save({ fields: ['name', 'creatorId', 'status'] });
    ctx.body = waitingRoom;
    ctx.status = 201;
  } catch (error) {
    // const errorMessage = error.errors.map(e => e.message);
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
