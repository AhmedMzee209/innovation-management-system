import { X, UserCheck, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCreateReviewer } from '@/hooks/useReview';
import { cn } from '@/lib/utils';
import { UserResponse } from '@/types/auth';

const schema = z.object({
  employeeNumber: z.string().min(1, 'Employee Number is required'),
  designation: z.string().min(1, 'Designation is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  yearsOfExperience: z.coerce.number().min(0, 'Experience must be positive'),
});

type FormValues = z.infer<typeof schema>;

interface CreateReviewerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserResponse;
}

export const CreateReviewerProfileModal = ({ isOpen, onClose, user }: CreateReviewerProfileModalProps) => {
  const { mutateAsync: createReviewer, isPending } = useCreateReviewer();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeNumber: '',
      designation: '',
      specialization: '',
      yearsOfExperience: 0,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createReviewer({
        userId: user.id,
        ...data,
      });
      toast.success('Reviewer profile created successfully!');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create reviewer profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <UserCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Register Reviewer</h2>
              <p className="text-xs text-gray-500">For {user.firstName} {user.lastName}</p>
            </div>
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
              Employee Number
            </label>
            <input 
              type="text"
              {...register('employeeNumber')}
              placeholder="e.g. EMP-2024-001"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all"
            />
            {errors.employeeNumber && <p className="text-red-500 text-xs mt-1">{errors.employeeNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Designation
            </label>
            <input 
              type="text"
              {...register('designation')}
              placeholder="e.g. Senior Lecturer"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all"
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Specialization
            </label>
            <input 
              type="text"
              {...register('specialization')}
              placeholder="e.g. Artificial Intelligence, Agriculture Tech"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all"
            />
            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Years of Experience
            </label>
            <input 
              type="number"
              {...register('yearsOfExperience')}
              min="0"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:text-white transition-all"
            />
            {errors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience.message}</p>}
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
              {isPending ? 'Registering...' : 'Register Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
