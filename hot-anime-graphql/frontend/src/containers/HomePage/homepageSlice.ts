import { createSlice } from '@reduxjs/toolkit';
import { IHomePageState } from '../../app/graphql/types';

const initialState: IHomePageState = {
  animePage: null,
};

const HomePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setAnimePage: (state, { payload }) => {
      state.animePage = payload;
    },
  },
});

export const { setAnimePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
