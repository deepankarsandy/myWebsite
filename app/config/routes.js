async function routes (fastify, options){
  fastify.get('/*', options, (request, reply) => (
    reply.sendFile('index.html')
  ));
}

export default routes;
