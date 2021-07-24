#!/usr/bin/env node

/*
modification history
--------------------
01a,09aug2020,deepankar created
...
02a,04jul2021,deepankar added websocket
*/

import path, { dirname } from 'path';
import fastifyStatic from 'fastify-static';
import dotenv from 'dotenv';
import fastifyBuilder from 'fastify';
import { fileURLToPath } from 'url';

import WS from './websocket.js';
import BG_TASKS from './bg_tasks.js';
import MessageService from './message_service.js';
import apiRoutes from './api_routes.js';
import routes from './routes.js';

dotenv.config();

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));
const fastify = fastifyBuilder({ logger: true });
const ROOT = path.join(__dirname, '../../');
MessageService.init(WS.init(fastify.server));

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await fastify.listen(PORT, '0.0.0.0');
    fastify.log.info(`server listening on port ${PORT}`);
    BG_TASKS.lightening();
  } catch (err){
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.register(fastifyStatic, {
  root:          path.join(ROOT, 'dist'),
  prefix:        '/dist',
});

fastify.register(fastifyStatic, {
  root:          path.join(ROOT, 'app/assets'),
  decorateReply: false,
  prefix:        '/assets',
});

fastify.register(apiRoutes);
fastify.register(routes);

start();
