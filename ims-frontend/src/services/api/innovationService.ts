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
  status: string;
  remarks: string;
  changedAt: string;
  changedByName: string;
}

export interface InnovationDocument {
  id: string;
  fileName: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
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
  }
};
