import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { cryptoAPI } from '../services/cryptoApi';
import { newsAPI } from '../services/newsApi';

const store = configureStore({
  reducer: { [cryptoAPI.reducerPath]: cryptoAPI.reducer, [newsAPI.reducerPath]: newsAPI.reducer },
  middleware: (mWares: any) => mWares().concat(logger),
});

export default store;
