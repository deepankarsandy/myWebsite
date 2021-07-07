export default async function (fastify, options){
  fastify.get('/*', options, (request, reply) => (
    // REF for options: https://www.fastify.io/docs/latest/Routes/#shorthand-declaration
    reply.sendFile('index.html')
  ));
}
