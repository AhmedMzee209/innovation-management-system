import { useEffect } from 'react';
import { X, Globe, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateInnovationHub, useUpdateInnovationHub, useSchools } from '@/hooks/useOrganization';
import { InnovationHubResponse } from '@/types/organization';

const hubSchema = z.object({
  code: z.string().min(2, 'Hub code is required (e.g. HUB-SCCS)'),
  name: z.string().min(3, 'Hub name must be at least 3 characters'),
  description: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  officeLocation: z.string().optional(),
  email: z.string().email('Valid email is required').or(z.literal('')),
  phone: z.string().optional(),
  schoolId: z.string().min(1, 'Please select a parent school'),
});

type HubFormValues = z.infer<typeof hubSchema>;

interface HubModalProps {
  isOpen: boolean;
  onClose: () => void;
  hub?: InnovationHubResponse | null;
}

export const HubModal = ({ isOpen, onClose, hub }: HubModalProps) => {
  const createMutation = useCreateInnovationHub();
  const updateMutation = useUpdateInnovationHub();
  const { data: schools = [] } = useSchools();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HubFormValues>({
    resolver: zodResolver(hubSchema)
  });

  useEffect(() => {
    if (hub) {
      reset({
        code: hub.code || '',
        name: hub.name || '',
        description: hub.description || '',
        vision: hub.vision || '',
        mission: hub.mission || '',
        officeLocation: hub.officeLocation || '',
        email: hub.email || '',
        phone: hub.phone || '',
        schoolId: hub.school?.id || '',
      });
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        vision: '',
        mission: '',
        officeLocation: '',
        email: '',
        phone: '',
        schoolId: schools.length > 0 ? schools[0].id : '',
      });
    }
  }, [hub, reset, isOpen, schools]);

  const onSubmit = async (data: HubFormValues) => {
    if (hub) {
      await updateMutation.mutateAsync({ id: hub.id, data });
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
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {hub ? 'Edit Innovation Hub' : 'Create Innovation Hub'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {hub ? 'Update innovation hub details.' : 'Register a new innovation hub within the SUZA ecosystem.'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="hub-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hub Code <span className="text-red-500">*</span></label>
                    <input {...register('code')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. HUB-SCCS" />
                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent School <span className="text-red-500">*</span></label>
                    <select {...register('schoolId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                      <option value="">Select a School...</option>
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                      ))}
                    </select>
                    {errors.schoolId && <p className="text-red-500 text-xs mt-1">{errors.schoolId.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hub Name <span className="text-red-500">*</span></label>
                    <input {...register('name')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. SCCS Tech & AI Innovation Hub" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Office Location</label>
                    <input {...register('officeLocation')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Tunguu Campus, Lab 3" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Official Email</label>
                    <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="hub.sccs@suza.ac.tz" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input {...register('phone')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="+255..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vision</label>
                    <input {...register('vision')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="Hub vision statement..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mission</label>
                    <input {...register('mission')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="Hub mission statement..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea {...register('description')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="Overview of the innovation hub..." />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="hub-form" disabled={isLoading} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                {hub ? 'Update Hub' : 'Save Hub'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
