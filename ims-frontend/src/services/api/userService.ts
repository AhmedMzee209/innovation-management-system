import api from './axios';
import { UserResponse } from '@/types/auth';

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetUsersParams {
  page?: number;
  size?: number;
  search?: string;
  roleId?: string;
  enabled?: boolean;
}

export const userService = {
  async getUsers(params: GetUsersParams = {}) {
    const { data } = await api.get<{ data: PageResponse<UserResponse> }>('/users', { params });
    return data.data;
  },

  async getUserById(id: string) {
    const { data } = await api.get<{ data: UserResponse }>(`/users/${id}`);
    return data.data;
  },

  async updateUser(id: string, payload: any) {
    const { data } = await api.put<{ data: UserResponse }>(`/users/${id}`, payload);
    return data.data;
  },

  async deleteUser(id: string) {
    await api.delete(`/users/${id}`);
  },

  async updateUserStatus(id: string, user: UserResponse, newStatus: boolean) {
    // Send full payload to avoid nullifying other fields
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      enabled: newStatus,
      roleIds: user.roles.map(r => r.id),
      profilePhoto: user.profilePhoto
    };
    const { data } = await api.put<{ data: UserResponse }>(`/users/${id}`, payload);
    return data.data;
  },

  // Note: Create User is usually handled via authService.register for now,
  // or a dedicated /users POST endpoint if added later.
};
