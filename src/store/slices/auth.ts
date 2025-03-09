import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import type { User } from "../api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
