import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { startupService, CreateStartupRequest, UpdateStartupRequest, StartupTeamMemberRequest, StartupMilestoneRequest, StartupAchievementRequest, StartupProgressRequest } from '@/services/api/startupService';

export const STARTUP_KEYS = {
  all: ['startups'] as const,
  lists: () => [...STARTUP_KEYS.all, 'list'] as const,
  list: (filters: string) => [...STARTUP_KEYS.lists(), { filters }] as const,
  details: () => [...STARTUP_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...STARTUP_KEYS.details(), id] as const,
  stages: ['startupStages'] as const,
};

export const useStartups = (filters?: { schoolId?: string; hubId?: string; stageId?: string; status?: string }) => {
  return useQuery({
    queryKey: STARTUP_KEYS.list(JSON.stringify(filters || {})),
    queryFn: () => startupService.getStartups(filters),
  });
};

export const useStartup = (id: string) => {
  return useQuery({
    queryKey: STARTUP_KEYS.detail(id),
    queryFn: () => startupService.getStartupById(id),
    enabled: !!id,
  });
};

export const useStartupStages = () => {
  return useQuery({
    queryKey: STARTUP_KEYS.stages,
    queryFn: () => startupService.getAllStages(),
  });
};

export const useCreateStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStartupRequest) => startupService.createStartup(data),
    onSuccess: () => {
      toast.success('Startup created successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create startup');
    },
  });
};

export const useUpdateStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStartupRequest }) => startupService.updateStartup(id, data),
    onSuccess: (_, variables) => {
      toast.success('Startup updated successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update startup');
    },
  });
};

export const useDeleteStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => startupService.deleteStartup(id),
    onSuccess: () => {
      toast.success('Startup deleted successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.lists() });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete startup');
    },
  });
};

export const useAddStartupTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StartupTeamMemberRequest }) => startupService.addTeamMember(id, data),
    onSuccess: (_, variables) => {
      toast.success('Team member added successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add team member');
    },
  });
};

export const useRemoveStartupTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, memberId }: { id: string; memberId: string }) => startupService.removeTeamMember(id, memberId),
    onSuccess: (_, variables) => {
      toast.success('Team member removed successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to remove team member');
    },
  });
};

export const useAddStartupMilestone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StartupMilestoneRequest }) => startupService.addMilestone(id, data),
    onSuccess: (_, variables) => {
      toast.success('Milestone added successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add milestone');
    },
  });
};

export const useAddStartupAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StartupAchievementRequest }) => startupService.addAchievement(id, data),
    onSuccess: (_, variables) => {
      toast.success('Achievement added successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add achievement');
    },
  });
};

export const useAddStartupProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: StartupProgressRequest }) => startupService.addProgressRecord(id, data),
    onSuccess: (_, variables) => {
      toast.success('Progress record added successfully');
      queryClient.invalidateQueries({ queryKey: STARTUP_KEYS.detail(variables.id) });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add progress record');
    },
  });
};
