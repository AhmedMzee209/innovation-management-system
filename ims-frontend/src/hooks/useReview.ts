import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  reviewService, 
  SubmitReviewRequest, 
  AssignReviewerRequest 
} from '@/services/api/reviewService';

// Assignments
export const useMyAssignments = () => {
  return useQuery({
    queryKey: ['my-assignments'],
    queryFn: () => reviewService.getMyAssignments(),
  });
};

export const useInnovationAssignments = (innovationId: string) => {
  return useQuery({
    queryKey: ['assignments', 'innovation', innovationId],
    queryFn: () => reviewService.getAssignmentsByInnovation(innovationId),
    enabled: !!innovationId,
  });
};

export const useAssignReviewer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignReviewerRequest) => reviewService.assignReviewer(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['assignments', 'innovation', variables.innovationId] });
    },
  });
};

// Reviews
export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubmitReviewRequest) => reviewService.submitReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['my-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
};

export const useReviewDetails = (id: string) => {
  return useQuery({
    queryKey: ['review', id],
    queryFn: () => reviewService.getReviewById(id),
    enabled: !!id,
  });
};

export const useInnovationReviews = (innovationId: string) => {
  return useQuery({
    queryKey: ['reviews', 'innovation', innovationId],
    queryFn: () => reviewService.getReviewsByInnovation(innovationId),
    enabled: !!innovationId,
  });
};

// Criteria
export const useEvaluationCriteria = () => {
  return useQuery({
    queryKey: ['evaluation-criteria'],
    queryFn: () => reviewService.getAllCriteria(),
  });
};

export const useCriteriaDetails = (id: string) => {
  return useQuery({
    queryKey: ['evaluation-criteria', id],
    queryFn: () => reviewService.getCriteriaById(id),
    enabled: !!id,
  });
};

export const useReviewers = () => {
  return useQuery({
    queryKey: ['reviewers'],
    queryFn: () => reviewService.getAllReviewers(),
  });
};

export const useCreateReviewer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => reviewService.createReviewer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewers'] });
    },
  });
};
