async function routes (fastify, options){
  fastify.get('/*', options, (request, reply) => (
    reply.sendFile('index.html')
  ));
}

module.exports = routes;
