import api from './axios';

// DTO Interfaces matching Spring Boot Backend

export interface ReviewAssignmentResponse {
  id: string;
  assignmentDate: string;
  deadline: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  innovationId: string;
  innovationTitle: string;
  innovationCode: string;
  reviewerId: string;
  reviewerName: string;
  assignedById: string;
  assignedByName: string;
}

export interface ReviewerResponse {
  id: string;
  employeeNumber: string;
  designation: string;
  specialization: string;
  yearsOfExperience: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'RETIRED';
  userId: string;
  userFullName: string;
  userEmail: string;
}

export interface AssignReviewerRequest {
  innovationId: string;
  reviewerId: string;
  deadline: string;
}

export interface EvaluationCriteriaResponse {
  id: string;
  name: string;
  description: string;
  maximumScore: number;
  weight: number;
}

export interface EvaluationScoreRequest {
  criteriaId: string;
  score: number;
  remarks: string;
}

export interface ReviewCommentRequest {
  comment: string;
}

export interface SubmitReviewRequest {
  assignmentId: string;
  decision: 'APPROVE' | 'REJECT' | 'REVISION_REQUIRED' | 'RECOMMEND_INCUBATION';
  overallScore: number;
  strengths: string;
  weaknesses: string;
  recommendations: string;
  remarks: string;
  scores: EvaluationScoreRequest[];
  comments: ReviewCommentRequest[];
}

export interface EvaluationScoreResponse {
  id: string;
  criteriaId: string;
  criteriaName: string;
  score: number;
  remarks: string;
}

export interface ReviewCommentResponse {
  id: string;
  comment: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

export interface ReviewResponse {
  id: string;
  decision: 'APPROVE' | 'REJECT' | 'REVISION_REQUIRED' | 'RECOMMEND_INCUBATION';
  overallScore: number;
  strengths: string;
  weaknesses: string;
  recommendations: string;
  remarks: string;
  reviewDate: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'COMPLETED';
  assignment: ReviewAssignmentResponse;
  evaluationScores: EvaluationScoreResponse[];
  comments: ReviewCommentResponse[];
}

export const reviewService = {
  // Assignments
  assignReviewer: async (data: AssignReviewerRequest): Promise<ReviewAssignmentResponse> => {
    const response = await api.post('/reviews/assign', data);
    return response.data.data;
  },

  getAssignmentsByInnovation: async (innovationId: string): Promise<ReviewAssignmentResponse[]> => {
    const response = await api.get(`/reviews/assignments?innovationId=${innovationId}`);
    return response.data.data;
  },

  getMyAssignments: async (): Promise<ReviewAssignmentResponse[]> => {
    const response = await api.get('/reviews/my');
    return response.data.data;
  },

  // Reviews
  submitReview: async (data: SubmitReviewRequest): Promise<ReviewResponse> => {
    const response = await api.post('/reviews', data);
    return response.data.data;
  },

  getReviewById: async (id: string): Promise<ReviewResponse> => {
    const response = await api.get(`/reviews/${id}`);
    return response.data.data;
  },

  getReviewsByInnovation: async (innovationId: string): Promise<ReviewResponse[]> => {
    const response = await api.get(`/reviews/innovation/${innovationId}`);
    return response.data.data;
  },

  // Evaluation Criteria
  getAllCriteria: async (): Promise<EvaluationCriteriaResponse[]> => {
    const response = await api.get('/evaluation-criteria');
    return response.data.data;
  },

  getCriteriaById: async (id: string): Promise<EvaluationCriteriaResponse> => {
    const response = await api.get(`/evaluation-criteria/${id}`);
    return response.data.data;
  },

  // Reviewers
  getAllReviewers: async (): Promise<ReviewerResponse[]> => {
    const response = await api.get('/reviewers/active'); // Or just /reviewers
    return response.data.data;
  },

  createReviewer: async (data: any): Promise<ReviewerResponse> => {
    const response = await api.post('/reviewers', data);
    return response.data.data;
  }
};
