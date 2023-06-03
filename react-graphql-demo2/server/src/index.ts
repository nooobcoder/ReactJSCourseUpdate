import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import { animals, categories, mainCards } from './db';

const server = new ApolloServer({ typeDefs, resolvers, context: { animals, categories, mainCards } });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
