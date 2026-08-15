import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { innovationService, CreateInnovationRequest, UpdateInnovationRequest } from '../services/api/innovationService';

// Innovations
export const useInnovations = () => {
  return useQuery({
    queryKey: ['innovations'],
    queryFn: innovationService.getInnovations,
  });
};

export const useMyInnovations = () => {
  return useQuery({
    queryKey: ['innovations', 'my'],
    queryFn: innovationService.getMyInnovations,
  });
};

export const useInnovation = (id: string) => {
  return useQuery({
    queryKey: ['innovation', id],
    queryFn: () => innovationService.getInnovationById(id),
    enabled: !!id,
  });
};

export const useCreateInnovation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInnovationRequest) => innovationService.createInnovation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['innovations'] });
    },
  });
};

export const useUpdateInnovation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInnovationRequest }) =>
      innovationService.updateInnovation(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['innovations'] });
      queryClient.invalidateQueries({ queryKey: ['innovation', variables.id] });
    },
  });
};

export const useDeleteInnovation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => innovationService.deleteInnovation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['innovations'] });
    },
  });
};

// Categories
export const useInnovationCategories = () => {
  return useQuery({
    queryKey: ['innovation-categories'],
    queryFn: innovationService.getCategories,
  });
};

export const useCreateInnovationCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => innovationService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['innovation-categories'] });
    },
  });
};
