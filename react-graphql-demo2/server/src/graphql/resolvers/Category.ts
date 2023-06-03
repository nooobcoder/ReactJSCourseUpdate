const Category = {
  animals: ({ id }: any, _: any, { animals }: any) => animals.filter((animal: any) => animal.category === id),
};

export default Category;
