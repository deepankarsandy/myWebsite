async function routes (fastify, options){
  fastify.all('/api/*', options, (request, reply) => (
    reply.send({ error: true, message: 'Unhandled route' })
  ));
}

module.exports = routes;
