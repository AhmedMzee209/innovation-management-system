import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile, UserResponse } from '@/types/auth';
import { authService } from '@/services/auth/auth.service';

export const mapUserResponseToProfile = (user: UserResponse): UserProfile => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    // Safely get the first role or default to 'STUDENT'
    role: user.roles && user.roles.length > 0 ? user.roles[0].name : 'STUDENT',
    avatar: user.profilePhoto || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`,
  };
};

export const restoreSession = createAsyncThunk('auth/restoreSession', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const response = await authService.getCurrentUser();
    return { user: mapUserResponseToProfile(response.data as any), token };
  } catch (error: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return rejectWithValue(error.response?.data?.message || 'Session expired');
  }
});

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
  rememberMe: boolean;
  token: string | null; // For future real auth, mocking it for now
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
  status: 'idle',
  error: null,
  rememberMe: localStorage.getItem('rememberMe') === 'true',
  token: localStorage.getItem('token'),
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
  extraReducers: (builder) => {
    builder.addCase(restoreSession.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.status = 'success';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });
    builder.addCase(restoreSession.rejected, (state, action) => {
      state.status = 'failed';
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setRememberMe, clearError } = authSlice.actions;
export default authSlice.reducer;
