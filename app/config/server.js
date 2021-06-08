#!/usr/bin/env node
const fastify = require('fastify')({ logger: true });
const path = require('path');
require('dotenv').config();
const fastifyStatic = require('fastify-static');
const BG_TASKS = require('./bg_tasks');

const ROOT = path.join(__dirname, '../../');

const start = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await fastify.listen(PORT, '0.0.0.0');
    fastify.log.info(`server listening on port ${PORT}`);
    BG_TASKS.init();
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

fastify.register(require('./api_routes'));
fastify.register(require('./routes'));

start();
