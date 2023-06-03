const Query = {
  mainCards: (_: any, __: any, { mainCards }: any) => mainCards,
  animals: (_: any, __: any, { animals }: any) => animals,
  animal: (parent: any, args: any, { animals }: any) => animals.find((animal: any) => animal.slug === args.slug),
  categories: (_: any, __: any, { categories }: any) => categories,
  category: (_: any, { slug }: any, { categories }: any) => categories.find((cat: any) => cat.slug === slug),
};

export default Query;
