const Slack = require('../routes/api/public/slack');

async function routes (fastify, options){
  fastify.post('/api/public/slack', options, (request, reply) => {
    Slack.send(JSON.parse(request.body));
    return reply.send({ success: true });
  });

  fastify.all('/api/*', options, (request, reply) => (
    reply.send({ error: true, message: 'Unhandled route' })
  ));
}

module.exports = routes;
