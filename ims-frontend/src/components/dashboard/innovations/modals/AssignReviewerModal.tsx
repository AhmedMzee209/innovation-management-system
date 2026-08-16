import { useState } from 'react';
import { X, UserPlus, Loader2, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAssignReviewer, useReviewers } from '@/hooks/useReview';
import { cn } from '@/lib/utils';

const schema = z.object({
  reviewerId: z.string().min(1, 'Please select a reviewer'),
  deadline: z.string().min(1, 'Please select a deadline'),
});

type FormValues = z.infer<typeof schema>;

interface AssignReviewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovationId: string;
}

export const AssignReviewerModal = ({ isOpen, onClose, innovationId }: AssignReviewerModalProps) => {
  const { data: reviewers = [], isLoading: isLoadingReviewers } = useReviewers();
  const { mutateAsync: assignReviewer, isPending } = useAssignReviewer();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      reviewerId: '',
      deadline: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await assignReviewer({
        innovationId,
        reviewerId: data.reviewerId,
        // Format to ISO string for backend
        deadline: new Date(data.deadline).toISOString(),
      });
      toast.success('Reviewer assigned successfully');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to assign reviewer');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assign Reviewer</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Select Reviewer
            </label>
            {isLoadingReviewers ? (
              <div className="flex items-center text-sm text-gray-500 py-2">
                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading reviewers...
              </div>
            ) : (
              <select 
                {...register('reviewerId')}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all appearance-none"
              >
                <option value="">Choose an expert...</option>
                {reviewers.map(reviewer => (
                  <option key={reviewer.id} value={reviewer.id}>
                    {reviewer.userFullName} {reviewer.specialization ? `(${reviewer.specialization})` : ''}
                  </option>
                ))}
              </select>
            )}
            {errors.reviewerId && <p className="text-red-500 text-xs mt-1">{errors.reviewerId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Review Deadline
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input 
                type="date"
                {...register('deadline')}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all"
              />
            </div>
            {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "px-5 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center shadow-sm",
                isPending && "opacity-70 cursor-not-allowed"
              )}
            >
              {isPending && <Loader2 size={16} className="animate-spin mr-2" />}
              {isPending ? 'Assigning...' : 'Assign Reviewer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
