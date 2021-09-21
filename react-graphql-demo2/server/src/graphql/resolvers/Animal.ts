const Animal = {
  category: ({ category }: any, _: any, { categories }: any) => categories.find((ctgry: any) => ctgry.id === category),
};

export default Animal;
