import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import homePageReducer from '../containers/HomePage/homepageSlice';
import ReduxLogger from 'redux-logger';

export const store = configureStore({
  reducer: { homePage: homePageReducer },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(ReduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
