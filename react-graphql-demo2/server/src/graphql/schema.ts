import { gql } from 'apollo-server';

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

export default typeDefs;
