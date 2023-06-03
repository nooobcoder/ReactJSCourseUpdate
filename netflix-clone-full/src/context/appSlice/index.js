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
    setLoading(prevState, { payload }) {
      return { ...prevState, loading: payload };
    },
    setAuthState(prevState, { payload }) {
      return {
        loading: false,
        isAuthenticated: true,
        firebaseAuthState: payload,
      };
    },
    setCurrentProfile: (prevState, { payload }) => {
      return { ...prevState, currentUserProfile: { ...payload } };
    },
  },
});

export const { toggleLoading, setAuthState, setLoading, setCurrentProfile } =
  appSlice.actions;
export default appSlice;
