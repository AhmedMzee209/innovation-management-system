import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
  rememberMe: boolean;
  token: string | null; // For future real auth, mocking it for now
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
  rememberMe: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: UserProfile; token: string }>) => {
      state.status = 'success';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setRememberMe, clearError } = authSlice.actions;
export default authSlice.reducer;
