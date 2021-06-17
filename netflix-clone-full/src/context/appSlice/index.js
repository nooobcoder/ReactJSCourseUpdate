import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: undefined,
  firebaseAuthState: null,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    toggleLoading(prevState) {
      return { ...prevState, loading: !prevState.loading };
    },
    setAuthState(prevState, { payload }) {
      return {
        loading: false,
        isAuthenticated: true,
        firebaseAuthState: payload,
      };
    },
  },
});

export const { toggleLoading, setAuthState } = appSlice.actions;
export default appSlice;
