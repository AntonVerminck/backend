const Router = require('@koa/router');
const filmservice = require('../service/film');

const getAllFilms = async (ctx) => {
  ctx.body = filmservice.getAll();
};

const createFilm = async (ctx) => {
  const newfilm = filmservice.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newfilm;
};

const getFilmById = async (ctx) => {
  ctx.body = filmservice.getById(Number(ctx.params.id));
};

const updateFilm = async (ctx) => {
  ctx.body = filmservice.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};

const deleteFilm = async (ctx) => {
  filmservice.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

/**
 * Install film routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/films',
  });

  router.get('/', getAllFilms);
  router.post('/', createFilm);
  router.get('/:id', getFilmById);
  router.put('/:id', updateFilm);
  router.delete('/:id', deleteFilm);

  app.use(router.routes())
     .use(router.allowedMethods());
};