import { X, Building2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const schoolSchema = z.object({
  name: z.string().min(3, 'School name must be at least 3 characters'),
  shortName: z.string().min(2, 'Acronym must be at least 2 characters'),
  deanName: z.string().min(3, 'Dean name is required'),
  deanEmail: z.string().email('Valid email is required'),
  campus: z.string().min(2, 'Campus location is required'),
  establishedYear: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 1900, {
    message: 'Must be a valid year',
  }),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

interface SchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolModal = ({ isOpen, onClose }: SchoolModalProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema)
  });

  const onSubmit = async (data: SchoolFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('School Data:', data);
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New School</h2>
                  <p className="text-sm text-gray-500">Register a new school within the SUZA ecosystem.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="school-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full School Name <span className="text-red-500">*</span></label>
                    <input {...register('name')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. School of Computing and Communication Studies" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Acronym / Short Name <span className="text-red-500">*</span></label>
                    <input {...register('shortName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. SCCS" />
                    {errors.shortName && <p className="text-red-500 text-xs mt-1">{errors.shortName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Campus Location <span className="text-red-500">*</span></label>
                    <select {...register('campus')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                      <option value="">Select Campus...</option>
                      <option value="Tunguu">Tunguu</option>
                      <option value="Mbweni">Mbweni</option>
                      <option value="Chwaka">Chwaka</option>
                      <option value="Vuga">Vuga</option>
                      <option value="Nkrumah">Nkrumah</option>
                      <option value="Maruhubi">Maruhubi</option>
                      <option value="Kizimbani">Kizimbani</option>
                    </select>
                    {errors.campus && <p className="text-red-500 text-xs mt-1">{errors.campus.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dean's Full Name <span className="text-red-500">*</span></label>
                    <input {...register('deanName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Dr. Salum Abdullah" />
                    {errors.deanName && <p className="text-red-500 text-xs mt-1">{errors.deanName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dean's Official Email <span className="text-red-500">*</span></label>
                    <input {...register('deanEmail')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="dean.school@suza.ac.tz" />
                    {errors.deanEmail && <p className="text-red-500 text-xs mt-1">{errors.deanEmail.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Established Year <span className="text-red-500">*</span></label>
                    <input {...register('establishedYear')} type="number" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. 2002" />
                    {errors.establishedYear && <p className="text-red-500 text-xs mt-1">{errors.establishedYear.message}</p>}
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="school-form" disabled={isSubmitting} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                Save School
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
