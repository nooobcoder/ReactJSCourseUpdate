import { configureStore } from '@reduxjs/toolkit';
import { cryptoAPI } from '../services/cryptoApi';

const store = configureStore({ reducer: { [cryptoAPI.reducerPath]: cryptoAPI.reducer } });

export default store;
