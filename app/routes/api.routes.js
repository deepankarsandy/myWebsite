export default async function (fastify, options){
  // fastify.get('/*', options, (request, reply) => (
  //   reply.send({ error: true, message: 'Unhandled route: get' })
  // ));

  // fastify.post('/*', options, (request, reply) => (
  //   reply.send({ error: true, message: 'Unhandled route: post' })
  // ));

  fastify.all('/*', options, (request, reply) => (
    reply.send({ error: true, message: 'Unhandled route: all' })
  ));
}
