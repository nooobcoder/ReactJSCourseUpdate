import { createSlice } from '@reduxjs/toolkit';

interface BasketState {
  [key: string]: any;
  items: Array<any>;
}

const initialState: BasketState = {
  items: []
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {},
    removeFromBasket: (state, action) => {}
  }
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export default basketSlice;
