import { configureStore, Store } from '@reduxjs/toolkit';
import basketSlice from './basketSlice';

const appStore: Store = configureStore({ reducer: { basketSlice: basketSlice.reducer } });

export default appStore;
