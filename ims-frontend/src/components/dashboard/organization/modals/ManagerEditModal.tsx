import { useEffect } from 'react';
import { X, Save, Edit3 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { userService } from '@/services/api/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const editManagerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  enabled: z.boolean(),
});

type EditManagerFormValues = z.infer<typeof editManagerSchema>;

interface ManagerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager: any | null;
}

export const ManagerEditModal = ({ isOpen, onClose, manager }: ManagerEditModalProps) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditManagerFormValues>({
    resolver: zodResolver(editManagerSchema),
  });

  useEffect(() => {
    if (isOpen && manager) {
      reset({
        firstName: manager.firstName || '',
        lastName: manager.lastName || '',
        email: manager.email || '',
        phoneNumber: manager.phoneNumber || manager.phone || '',
        enabled: manager.enabled ?? true,
      });
    }
  }, [isOpen, manager, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: EditManagerFormValues) => {
      return userService.updateUser(manager.id, {
        ...data,
        roleIds: manager.roles?.map((r: any) => r.id) || [],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['hub-assignments'] });
      Swal.fire({
        icon: 'success',
        title: 'Manager Updated',
        text: 'Manager user details updated successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update manager profile.',
      });
    },
  });

  const onSubmit = (data: EditManagerFormValues) => {
    updateMutation.mutate(data);
  };

  if (!manager) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0098c8] dark:bg-blue-500/10 flex items-center justify-center">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Manager Profile</h2>
                  <p className="text-sm text-gray-500">Update personal and account information.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form id="edit-manager-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                    <input {...register('firstName')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                    <input {...register('lastName')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                  <input {...register('email')} type="email" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input {...register('phoneNumber')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="+255 777 123 456" />
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <input {...register('enabled')} type="checkbox" id="enabled" className="w-4 h-4 rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]" />
                  <label htmlFor="enabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Enabled / Active</label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="edit-manager-form" disabled={updateMutation.isPending} className="px-5 py-2 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors flex items-center">
                <Save size={16} className="mr-2" /> Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
