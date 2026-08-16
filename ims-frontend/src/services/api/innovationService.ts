import api from './axios';

export interface InnovationCategory {
  id: string;
  name: string;
  description: string;
}

export interface InnovationSummary {
  id: string;
  innovationCode: string;
  title: string;
  innovationLevel: string;
  innovationType: string;
  currentStatus: string;
  categoryName: string;
  ownerName: string;
  schoolName: string;
  submissionDate: string;
}

export interface InnovationStatusHistory {
  id: string;
  previousStatus: string;
  currentStatus: string;
  remarks: string;
  changedDate: string;
  changedByName: string;
}

export interface InnovationDocument {
  id: string;
  documentName: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  uploadDate: string;
}

export interface InnovationTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
}

export interface InnovationResponse {
  id: string;
  innovationCode: string;
  title: string;
  abstractText: string;
  problemStatement: string;
  proposedSolution: string;
  objectives: string;
  expectedImpact: string;
  targetBeneficiaries: string;
  innovationLevel: string;
  innovationType: string;
  currentStatus: string;
  submissionDate: string;
  approvalDate: string;
  remarks: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  school: any;
  department: any;
  hub: any;
  category: InnovationCategory;
  documents: InnovationDocument[];
  statusHistory: InnovationStatusHistory[];
  teamMembers: InnovationTeamMember[];
}

export interface CreateInnovationRequest {
  title: string;
  abstractText?: string;
  problemStatement: string;
  proposedSolution: string;
  objectives?: string;
  expectedImpact?: string;
  targetBeneficiaries?: string;
  innovationLevel: string;
  innovationType: string;
  categoryId: string;
  schoolId: string;
  departmentId: string;
  hubId: string;
}

export interface UpdateInnovationRequest extends CreateInnovationRequest {}

export const innovationService = {
  getInnovations: async (): Promise<InnovationSummary[]> => {
    const response = await api.get('/innovations');
    return response.data.data;
  },

  getMyInnovations: async (): Promise<InnovationSummary[]> => {
    const response = await api.get('/innovations/my');
    return response.data.data;
  },

  getInnovationById: async (id: string): Promise<InnovationResponse> => {
    const response = await api.get(`/innovations/${id}`);
    return response.data.data;
  },

  createInnovation: async (data: CreateInnovationRequest): Promise<InnovationResponse> => {
    const response = await api.post('/innovations', data);
    return response.data.data;
  },

  updateInnovation: async (id: string, data: UpdateInnovationRequest): Promise<InnovationResponse> => {
    const response = await api.put(`/innovations/${id}`, data);
    return response.data.data;
  },

  submitInnovation: async (id: string): Promise<void> => {
    await api.post(`/innovations/${id}/submit`);
  },

  deleteInnovation: async (id: string): Promise<void> => {
    await api.delete(`/innovations/${id}`);
  },

  getCategories: async (): Promise<InnovationCategory[]> => {
    const response = await api.get('/categories');
    return response.data.data;
  },

  createCategory: async (data: any): Promise<InnovationCategory> => {
    const response = await api.post('/categories', data);
    return response.data.data;
  },

  // Team Members
  addTeamMember: async (innovationId: string, data: { name: string; email: string; role: string }): Promise<InnovationTeamMember> => {
    const response = await api.post(`/innovations/${innovationId}/team-members`, data);
    return response.data.data;
  },

  getTeamMembers: async (innovationId: string): Promise<InnovationTeamMember[]> => {
    const response = await api.get(`/innovations/${innovationId}/team-members`);
    return response.data.data;
  },

  removeTeamMember: async (innovationId: string, memberId: string): Promise<void> => {
    await api.delete(`/innovations/${innovationId}/team-members/${memberId}`);
  },

  // Documents
  uploadDocument: async (innovationId: string, file: File, documentType: string): Promise<InnovationDocument> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    
    const response = await api.post(`/innovations/${innovationId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  getDocuments: async (innovationId: string): Promise<InnovationDocument[]> => {
    const response = await api.get(`/innovations/${innovationId}/documents`);
    return response.data.data;
  },

  deleteDocument: async (innovationId: string, documentId: string): Promise<void> => {
    await api.delete(`/innovations/${innovationId}/documents/${documentId}`);
  }
};
