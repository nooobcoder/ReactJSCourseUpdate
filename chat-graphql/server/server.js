import { GraphQLServer } from 'graphql-yoga';

const messages = [];

const typeDefs = `
  type Message{
    id: ID!
    user: String!
    content: String!
  }

  type Query{
    messages: [Message!]!
  }

  type Mutation{
    postMessage(user:String!, content:String!):ID!
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, args, ctx) => {
      const id = messages.length;
      messages.push({ id, ...args });
      return id;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(
  {
    port: 3000,
    subscriptions: '/subscriptions',
    playground: '/playground',
  },
  ({ port }) => console.log(`Server running @ [http://192.168.0.120:${port}]`)
);
