// src/index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'; // 👈 1
import { getLogger } from './core/logging';

import * as cinemaService from './service/cinemaService'; // 👈 1

const app = new Koa();

app.use(bodyParser());

const router = new Router(); // 👈 2

// 👇 3
router.get('/api/cinema', async (ctx) => {
  ctx.body = {
    items: cinemaService.getAll(),
  };
});
app
  .use(router.routes()) // 👈 4
  .use(router.allowedMethods()); // 👈 4

app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://127.0.0.1:9000');
});