import api from './axios';

export interface PermissionResponse {
  id: string;
  name: string;
  description: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  permissions: PermissionResponse[];
}

export const rbacService = {
  async getRoles() {
    const { data } = await api.get<{ data: RoleResponse[] }>('/roles');
    return data.data;
  },

  async createRole(payload: { name: string; description?: string; permissionIds: string[] }) {
    const { data } = await api.post<{ data: RoleResponse }>('/roles', payload);
    return data.data;
  },

  async updateRole(id: string, payload: { name: string; description?: string; permissionIds: string[] }) {
    const { data } = await api.put<{ data: RoleResponse }>(`/roles/${id}`, payload);
    return data.data;
  },

  async deleteRole(id: string) {
    await api.delete(`/roles/${id}`);
  },

  async getPermissions() {
    const { data } = await api.get<{ data: PermissionResponse[] }>('/permissions');
    return data.data;
  }
};
