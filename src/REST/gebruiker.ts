const Router = require('@koa/router');
const gebruikerservice = require('../service/gebruikerService');

const getAllGebruikers = async (ctx) => {
  ctx.body = gebruikerservice.getAll();
};

const createGebruiker = async (ctx) => {
  const newgebruiker = gebruikerservice.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newgebruiker;
};

const getGebruikerById = async (ctx) => {
  ctx.body = gebruikerservice.getById(Number(ctx.params.id));
};

const updateGebruiker = async (ctx) => {
  ctx.body = gebruikerservice.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};

const deleteGebruiker = async (ctx) => {
  gebruikerservice.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

/**
 * Install gebruiker routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/gebruikers',
  });

  router.get('/', getAllGebruikers);
  router.post('/', createGebruiker);
  router.get('/:id', getGebruikerById);
  router.put('/:id', updateGebruiker);
  router.delete('/:id', deleteGebruiker);

  app.use(router.routes())
     .use(router.allowedMethods());
};