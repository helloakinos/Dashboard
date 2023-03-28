import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    loginFailure: (state) => {
      state.authenticated = false;
    },
    getName: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { login, logout, getName } = authSlice.actions;

export default authSlice.reducer;
