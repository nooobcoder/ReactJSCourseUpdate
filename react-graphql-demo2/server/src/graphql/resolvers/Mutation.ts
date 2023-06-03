import { Animal } from '../../types';
import { v4 } from 'uuid';

const Mutation = {
  addAnimal: (parent: any, args: Animal, { animals }: any) => {
    const { image, title, rating, price, description, slug, stock, onSale, category } = args;
    const newAnimal = {
      id: v4(),
      image,
      title,
      rating,
      price,
      description,
      slug,
      stock,
      onSale,
      category,
    };

    animals.push(newAnimal);

    return newAnimal;
  },

  removeAnimal: (parent, { id }, { animals }) => {
    let index = animals.findIndex((animal) => {
      return animal.id === id;
    });

    animals.splice(index, 1);

    return true;
  },
};

export default Mutation;
