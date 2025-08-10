const Router = require('@koa/router');
const cinemaservice = require('../service/cinema');

const getAllCinemas = async (ctx) => {
  ctx.body = await cinemaservice.getAll();
};

const createCinema = async (ctx) => {
  const newcinema = cinemaservice.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newcinema;
};

const getCinemaById = async (ctx) => {
  ctx.body = cinemaservice.getById(Number(ctx.params.id));
};

const updateCinema = async (ctx) => {
  ctx.body = cinemaservice.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};

const deleteCinema = async (ctx) => {
  cinemaservice.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

/**
 * Install cinema routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  
  const router = new Router({
    prefix: '/cinemas',
  });
  
  router.get('/', getAllCinemas);
  router.post('/', createCinema);
  router.get('/:id', getCinemaById);
  router.put('/:id', updateCinema);
  router.delete('/:id', deleteCinema);

  app.use(router.routes())
     .use(router.allowedMethods());
};