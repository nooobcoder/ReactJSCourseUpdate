import { ApolloServer, gql } from 'apollo-server';
import { animals, mainCards } from './db';

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }
  type Animal {
    image: String!
    title: String!
    rating: Float
    price: String!
    slug: String!
    description: [String!]!
    stock: Int!
    onSale: Boolean
  }
  type Query {
    animals: [Animal!]!
    animal(slug: String!): Animal
    mainCards: [MainCard]
  }
`;

const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
    animal: (parent: any, args: any, ctx: any) => animals.find((animal) => animal.slug === args.slug),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
