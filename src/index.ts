const Koa = require('koa');
const winston = require('winston'); 
const config = require('config'); 


const Router = require('@koa/router'); 
const cinema = require('./service/cinema');
const koaCors = require('@koa/cors');
const installMiddlewares = require('./core/installMiddlewares'); // 👈
const app = new Koa();
const router = new Router(); 

const bodyParser = require('koa-bodyparser');
const { initializeLogger, getLogger } = require('./core/logging');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORIGINS = config.get('cors.origins'); 
const CORS_MAX_AGE = config.get('cors.maxAge'); 
const { initializeData } = require('./data'); 


async function main() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  })
  installMiddlewares(app);
  await initializeData();

  app.use(
    koaCors({
      origin: (ctx) => { // 👈 4
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'], // 👈 5
      maxAge: CORS_MAX_AGE, // 👈 6
    })
  );

  app.use(router.routes()) // 
   .use(router.allowedMethods()); //


  console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`); 
  app.use(bodyParser()); 
  
  router.get('/api/cinemas', async (ctx) => { 
    ctx.body = cinema.getAll();
    });

  
app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://localhost:9000');
})

}
main();






