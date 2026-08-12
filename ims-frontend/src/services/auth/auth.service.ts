import api from '../api/axios';
import { UserProfile } from '@/types/auth';

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
  };
  message: string;
}

export interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface UserResponse {
  data: UserProfile;
  message: string;
}

export const authService = {
  async register(data: any): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: any): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore error on logout
    }
  },

  async forgotPassword(email: string): Promise<any> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data: any): Promise<any> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  async changePassword(data: any): Promise<any> {
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },

  async updateProfile(id: string, data: any): Promise<any> {
    const response = await api.put('/auth/me', data);
    return response.data;
  }
};
