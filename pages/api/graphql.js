import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import Cors from 'micro-cors';

const cors = Cors();

const server = new ApolloServer({ typeDefs, resolvers });
const startServer = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
});

// module.exports = apolloServer.start().then(() => {
//   const handler = apolloServer.createHandler();
//   return cors((req, res) =>
//     req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res)
//   );
// });

// export default apolloServer.createHandler({ path: '/api/graphql' });
