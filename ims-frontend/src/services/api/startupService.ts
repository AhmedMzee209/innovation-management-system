import api from './axios';

export interface StartupStageResponse {
  id: string;
  name: string;
  description: string;
  orderIndex: number;
}

export interface CreateStartupRequest {
  innovationId: string;
  startupName: string;
  tagline?: string;
  description?: string;
  vision?: string;
  mission?: string;
  logo?: string;
  website?: string;
  registrationNumber?: string;
  foundedDate?: string;
  stageId?: string;
  hubId?: string;
  schoolId?: string;
  founderUserId: string;
}

export interface UpdateStartupRequest extends Partial<CreateStartupRequest> {}

export interface StartupTeamMemberRequest {
  userId: string;
  role: string;
  joinDate: string;
  leaveDate?: string;
  ownershipPercentage?: number;
  isFounder?: boolean;
}

export interface StartupTeamMemberResponse {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: string;
  joinDate: string;
  leaveDate?: string;
  ownershipPercentage?: number;
  isFounder?: boolean;
  status: string;
}

export interface StartupMilestoneRequest {
  title: string;
  description?: string;
  targetDate: string;
  completionDate?: string;
  status?: string;
}

export interface StartupMilestoneResponse extends StartupMilestoneRequest {
  id: string;
}

export interface StartupAchievementRequest {
  title: string;
  description?: string;
  achievementDate: string;
  category: string;
}

export interface StartupAchievementResponse extends StartupAchievementRequest {
  id: string;
}

export interface StartupProgressRequest {
  progressDate?: string;
  progressPercentage: number;
  summary?: string;
  challenges?: string;
  nextSteps?: string;
}

export interface StartupProgressResponse extends StartupProgressRequest {
  id: string;
  createdAt: string;
}

export interface StartupSummaryResponse {
  id: string;
  startupCode: string;
  startupName: string;
  tagline?: string;
  logo?: string;
  status: string;
  stageName?: string;
  innovationId: string;
  innovationCode: string;
  innovationTitle: string;
  schoolName?: string;
  hubName?: string;
}

export interface StartupResponse {
  id: string;
  startupCode: string;
  startupName: string;
  tagline?: string;
  description?: string;
  vision?: string;
  mission?: string;
  logo?: string;
  website?: string;
  registrationNumber?: string;
  foundedDate?: string;
  status: string;
  
  innovationId: string;
  innovationCode: string;
  innovationTitle: string;
  
  hubId?: string;
  hubName?: string;
  
  schoolId?: string;
  schoolName?: string;
  
  managerId?: string;
  managerName?: string;
  
  currentStage?: StartupStageResponse;
  
  teamMembers: StartupTeamMemberResponse[];
  milestones: StartupMilestoneResponse[];
  achievements: StartupAchievementResponse[];
  progressRecords: StartupProgressResponse[];
  
  createdAt: string;
  updatedAt: string;
}

export const startupService = {
  // CORE
  createStartup: async (data: CreateStartupRequest): Promise<StartupResponse> => {
    const response = await api.post('/startups', data);
    return response.data.data;
  },

  updateStartup: async (id: string, data: UpdateStartupRequest): Promise<StartupResponse> => {
    const response = await api.put(`/startups/${id}`, data);
    return response.data.data;
  },

  getStartups: async (filters?: { schoolId?: string; hubId?: string; stageId?: string; status?: string }): Promise<StartupSummaryResponse[]> => {
    const params = new URLSearchParams();
    if (filters?.schoolId) params.append('schoolId', filters.schoolId);
    if (filters?.hubId) params.append('hubId', filters.hubId);
    if (filters?.stageId) params.append('stageId', filters.stageId);
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/startups?${params.toString()}`);
    return response.data.data;
  },

  getStartupById: async (id: string): Promise<StartupResponse> => {
    const response = await api.get(`/startups/${id}`);
    return response.data.data;
  },

  deleteStartup: async (id: string): Promise<void> => {
    await api.delete(`/startups/${id}`);
  },

  // STAGES
  getAllStages: async (): Promise<StartupStageResponse[]> => {
    const response = await api.get('/startups/stages');
    return response.data.data;
  },

  // TEAM
  addTeamMember: async (id: string, data: StartupTeamMemberRequest): Promise<StartupTeamMemberResponse> => {
    const response = await api.post(`/startups/${id}/team`, data);
    return response.data.data;
  },
  
  removeTeamMember: async (id: string, memberId: string): Promise<void> => {
    await api.delete(`/startups/${id}/team/${memberId}`);
  },

  // MILESTONES
  addMilestone: async (id: string, data: StartupMilestoneRequest): Promise<StartupMilestoneResponse> => {
    const response = await api.post(`/startups/${id}/milestones`, data);
    return response.data.data;
  },

  // ACHIEVEMENTS
  addAchievement: async (id: string, data: StartupAchievementRequest): Promise<StartupAchievementResponse> => {
    const response = await api.post(`/startups/${id}/achievements`, data);
    return response.data.data;
  },

  // PROGRESS
  addProgressRecord: async (id: string, data: StartupProgressRequest): Promise<StartupProgressResponse> => {
    const response = await api.post(`/startups/${id}/progress`, data);
    return response.data.data;
  }
};
