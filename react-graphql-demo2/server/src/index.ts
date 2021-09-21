import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
