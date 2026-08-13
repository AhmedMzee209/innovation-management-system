import api from './axios';
import {
  SchoolRequest,
  SchoolResponse,
  DepartmentRequest,
  DepartmentResponse,
  InnovationHubRequest,
  InnovationHubResponse,
  HubManagerAssignmentRequest,
  HubManagerAssignmentResponse,
} from '@/types/organization';

export const organizationService = {
  // ─── SCHOOLS ──────────────────────────────
  async getAllSchools() {
    const res = await api.get<{ success: boolean; data: SchoolResponse[] }>('/schools');
    return res.data;
  },

  async getSchoolById(id: string) {
    const res = await api.get<{ success: boolean; data: SchoolResponse }>(`/schools/${id}`);
    return res.data;
  },

  async createSchool(data: SchoolRequest) {
    const res = await api.post<{ success: boolean; data: SchoolResponse }>('/schools', data);
    return res.data;
  },

  async updateSchool(id: string, data: SchoolRequest) {
    const res = await api.put<{ success: boolean; data: SchoolResponse }>(`/schools/${id}`, data);
    return res.data;
  },

  async deleteSchool(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/schools/${id}`);
    return res.data;
  },

  // ─── DEPARTMENTS ──────────────────────────
  async getAllDepartments() {
    const res = await api.get<{ success: boolean; data: DepartmentResponse[] }>('/departments');
    return res.data;
  },

  async getDepartmentsBySchool(schoolId: string) {
    const res = await api.get<{ success: boolean; data: DepartmentResponse[] }>(`/departments/school/${schoolId}`);
    return res.data;
  },

  async getDepartmentById(id: string) {
    const res = await api.get<{ success: boolean; data: DepartmentResponse }>(`/departments/${id}`);
    return res.data;
  },

  async createDepartment(data: DepartmentRequest) {
    const res = await api.post<{ success: boolean; data: DepartmentResponse }>('/departments', data);
    return res.data;
  },

  async updateDepartment(id: string, data: DepartmentRequest) {
    const res = await api.put<{ success: boolean; data: DepartmentResponse }>(`/departments/${id}`, data);
    return res.data;
  },

  async deleteDepartment(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/departments/${id}`);
    return res.data;
  },

  // ─── INNOVATION HUBS ──────────────────────
  async getAllHubs() {
    const res = await api.get<{ success: boolean; data: InnovationHubResponse[] }>('/hubs');
    return res.data;
  },

  async getHubsBySchool(schoolId: string) {
    const res = await api.get<{ success: boolean; data: InnovationHubResponse[] }>(`/hubs/school/${schoolId}`);
    return res.data;
  },

  async getHubById(id: string) {
    const res = await api.get<{ success: boolean; data: InnovationHubResponse }>(`/hubs/${id}`);
    return res.data;
  },

  async createHub(data: InnovationHubRequest) {
    const res = await api.post<{ success: boolean; data: InnovationHubResponse }>('/hubs', data);
    return res.data;
  },

  async updateHub(id: string, data: InnovationHubRequest) {
    const res = await api.put<{ success: boolean; data: InnovationHubResponse }>(`/hubs/${id}`, data);
    return res.data;
  },

  async deleteHub(id: string) {
    const res = await api.delete<{ success: boolean; message: string }>(`/hubs/${id}`);
    return res.data;
  },

  // ─── HUB MANAGERS ─────────────────────────
  async assignManager(data: HubManagerAssignmentRequest) {
    const res = await api.post<{ success: boolean; data: HubManagerAssignmentResponse }>('/hub-assignments', data);
    return res.data;
  },

  async unassignManager(assignmentId: string) {
    const res = await api.put<{ success: boolean; data: HubManagerAssignmentResponse }>(`/hub-assignments/${assignmentId}/unassign`);
    return res.data;
  },

  async getAssignmentsByHub(hubId: string) {
    const res = await api.get<{ success: boolean; data: HubManagerAssignmentResponse[] }>(`/hub-assignments/hub/${hubId}`);
    return res.data;
  },

  async getActiveManagersByHub(hubId: string) {
    const res = await api.get<{ success: boolean; data: HubManagerAssignmentResponse[] }>(`/hub-assignments/hub/${hubId}/active`);
    return res.data;
  },
};
