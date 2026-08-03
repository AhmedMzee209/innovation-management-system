import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null; // Will define type later
  token: string | null;
  roles: string[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  roles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string; roles: string[] }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
