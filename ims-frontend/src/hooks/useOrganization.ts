import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '@/services/api/organizationService';
import {
  SchoolRequest,
  DepartmentRequest,
  InnovationHubRequest,
  HubManagerAssignmentRequest,
} from '@/types/organization';
import Swal from 'sweetalert2';

// ─────────────────────────────────────────────
// SCHOOL HOOKS
// ─────────────────────────────────────────────

export const useSchools = () => {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const res = await organizationService.getAllSchools();
      return res.data || [];
    },
  });
};

export const useSchool = (id?: string) => {
  return useQuery({
    queryKey: ['schools', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await organizationService.getSchoolById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SchoolRequest) => organizationService.createSchool(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'School created successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to create school',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SchoolRequest }) =>
      organizationService.updateSchool(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.invalidateQueries({ queryKey: ['schools', variables.id] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'School updated successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to update school',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.deleteSchool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'School deleted successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to delete school',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

// ─────────────────────────────────────────────
// DEPARTMENT HOOKS
// ─────────────────────────────────────────────

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await organizationService.getAllDepartments();
      return res.data || [];
    },
  });
};

export const useDepartmentsBySchool = (schoolId?: string) => {
  return useQuery({
    queryKey: ['departments', 'school', schoolId],
    queryFn: async () => {
      if (!schoolId) return [];
      const res = await organizationService.getDepartmentsBySchool(schoolId);
      return res.data || [];
    },
    enabled: !!schoolId,
  });
};

export const useDepartment = (id?: string) => {
  return useQuery({
    queryKey: ['departments', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await organizationService.getDepartmentById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentRequest) => organizationService.createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Department created successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to create department',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DepartmentRequest }) =>
      organizationService.updateDepartment(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['departments', variables.id] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Department updated successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to update department',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Department deleted successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to delete department',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

// ─────────────────────────────────────────────
// INNOVATION HUB HOOKS
// ─────────────────────────────────────────────

export const useInnovationHubs = () => {
  return useQuery({
    queryKey: ['hubs'],
    queryFn: async () => {
      const res = await organizationService.getAllHubs();
      return res.data || [];
    },
  });
};

export const useHubsBySchool = (schoolId?: string) => {
  return useQuery({
    queryKey: ['hubs', 'school', schoolId],
    queryFn: async () => {
      if (!schoolId) return [];
      const res = await organizationService.getHubsBySchool(schoolId);
      return res.data || [];
    },
    enabled: !!schoolId,
  });
};

export const useInnovationHub = (id?: string) => {
  return useQuery({
    queryKey: ['hubs', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await organizationService.getHubById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateInnovationHub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InnovationHubRequest) => organizationService.createHub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Innovation Hub created successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to create innovation hub',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useUpdateInnovationHub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InnovationHubRequest }) =>
      organizationService.updateHub(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
      queryClient.invalidateQueries({ queryKey: ['hubs', variables.id] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Innovation Hub updated successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to update innovation hub',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useDeleteInnovationHub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.deleteHub(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubs'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Innovation Hub deleted successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to delete innovation hub',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

// ─────────────────────────────────────────────
// HUB MANAGER ASSIGNMENT HOOKS
// ─────────────────────────────────────────────

export const useAssignmentsByHub = (hubId?: string) => {
  return useQuery({
    queryKey: ['hubAssignments', hubId],
    queryFn: async () => {
      if (!hubId) return [];
      const res = await organizationService.getAssignmentsByHub(hubId);
      return res.data || [];
    },
    enabled: !!hubId,
  });
};

export const useActiveManagersByHub = (hubId?: string) => {
  return useQuery({
    queryKey: ['hubAssignments', 'active', hubId],
    queryFn: async () => {
      if (!hubId) return [];
      const res = await organizationService.getActiveManagersByHub(hubId);
      return res.data || [];
    },
    enabled: !!hubId,
  });
};

export const useAssignManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HubManagerAssignmentRequest) => organizationService.assignManager(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubAssignments'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Manager assigned successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to assign manager',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};

export const useUnassignManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) => organizationService.unassignManager(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hubAssignments'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Manager unassigned successfully',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed to unassign manager',
        showConfirmButton: false,
        timer: 4000,
      });
    },
  });
};
