import { useEffect } from 'react';
import { X, Building2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateSchool, useUpdateSchool } from '@/hooks/useOrganization';
import { SchoolResponse } from '@/types/organization';

const schoolSchema = z.object({
  code: z.string().min(2, 'School code is required (e.g. SCCS)'),
  name: z.string().min(3, 'School name must be at least 3 characters'),
  shortName: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email('Valid email is required').or(z.literal('')),
  phoneNumber: z.string().optional(),
  website: z.string().optional(),
  physicalAddress: z.string().optional(),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

interface SchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  school?: SchoolResponse | null;
}

export const SchoolModal = ({ isOpen, onClose, school }: SchoolModalProps) => {
  const createMutation = useCreateSchool();
  const updateMutation = useUpdateSchool();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema)
  });

  useEffect(() => {
    if (school) {
      reset({
        code: school.code || '',
        name: school.name || '',
        shortName: school.shortName || '',
        description: school.description || '',
        email: school.email || '',
        phoneNumber: school.phoneNumber || '',
        website: school.website || '',
        physicalAddress: school.physicalAddress || '',
      });
    } else {
      reset({
        code: '',
        name: '',
        shortName: '',
        description: '',
        email: '',
        phoneNumber: '',
        website: '',
        physicalAddress: '',
      });
    }
  }, [school, reset, isOpen]);

  const onSubmit = async (data: SchoolFormValues) => {
    if (school) {
      await updateMutation.mutateAsync({ id: school.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onClose();
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {school ? 'Edit School' : 'Create New School'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {school ? 'Update school details and metadata.' : 'Register a new school within the SUZA ecosystem.'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="school-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Code <span className="text-red-500">*</span></label>
                    <input {...register('code')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. SCCS" />
                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Acronym / Short Name</label>
                    <input {...register('shortName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. SCCS" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full School Name <span className="text-red-500">*</span></label>
                    <input {...register('name')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. School of Computing and Communication Studies" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Official Email</label>
                    <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="dean.sccs@suza.ac.tz" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input {...register('phoneNumber')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="+255..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
                    <input {...register('website')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="https://..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Campus / Physical Address</label>
                    <input {...register('physicalAddress')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Tunguu Campus" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea {...register('description')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="Brief overview of the school..." />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="school-form" disabled={isLoading} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                {school ? 'Update School' : 'Save School'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
