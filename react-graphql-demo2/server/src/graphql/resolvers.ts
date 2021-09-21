import { mainCards, animals, categories } from '../db';

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

export default resolvers;
