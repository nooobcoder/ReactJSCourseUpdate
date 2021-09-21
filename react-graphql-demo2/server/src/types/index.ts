/* eslint-disable */
export type MainCard = {
  title: String;
  image: String;
};
export type Animal = {
  image: String;
  title: String;
  rating: Number;
  price: String;
  slug: String;
  description: Array<String>;
  stock: Number;
  onSale?: Boolean;
  category?: Category;
};
export type Category = {
  id: String;
  image: String;
  category: String;
  slug: String;
  animals: Array<Animal>;
};
