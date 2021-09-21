import { ApolloServer, gql } from 'apollo-server';
import { animals, categories, mainCards } from './db';

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
    category: Category
  }
  type Category {
    id: String!
    image: String!
    category: String!
    slug: String!
    animals: [Animal!]!
  }
  type Query {
    mainCards: [MainCard]
    animals: [Animal!]!
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }
`;

const resolvers = {
  Query: {
    mainCards: () => mainCards,
    animals: () => animals,
    animal: (parent: any, args: any, ctx: any) => animals.find((animal) => animal.slug === args.slug),
    categories: () => categories,
    category: (_: any, { slug }: any) => categories.find((cat) => cat.slug === slug),
  },
  Category: {
    animals: ({ id }: any) => animals.filter((animal) => animal.category === id),
  },
  Animal: {
    category: ({ category }: any) => categories.find((ctgry) => ctgry.id === category),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
