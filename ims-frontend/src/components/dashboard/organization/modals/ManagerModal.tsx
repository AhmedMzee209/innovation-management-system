import { X, Users, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_HUBS } from '@/data/mockOrganization';

const managerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  hubId: z.string().min(1, 'Hub assignment is required'),
});

type ManagerFormValues = z.infer<typeof managerSchema>;

interface ManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManagerModal = ({ isOpen, onClose }: ManagerModalProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ManagerFormValues>({
    resolver: zodResolver(managerSchema)
  });

  const onSubmit = async (data: ManagerFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Manager Data:', data);
    onClose();
  };

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assign Hub Manager</h2>
                  <p className="text-sm text-gray-500">Add a new manager to oversee a hub.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="manager-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input {...register('firstName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input {...register('lastName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                    <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input {...register('phone')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assign to Hub <span className="text-red-500">*</span></label>
                    <select {...register('hubId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                      <option value="">Select a Hub...</option>
                      {MOCK_HUBS.map(hub => (
                        <option key={hub.id} value={hub.id}>{hub.name}</option>
                      ))}
                    </select>
                    {errors.hubId && <p className="text-red-500 text-xs mt-1">{errors.hubId.message}</p>}
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="manager-form" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                Assign Manager
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
