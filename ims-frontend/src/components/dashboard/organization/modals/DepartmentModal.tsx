import { useEffect } from 'react';
import { X, BookOpen, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateDepartment, useUpdateDepartment, useSchools } from '@/hooks/useOrganization';
import { DepartmentResponse } from '@/types/organization';

const departmentSchema = z.object({
  code: z.string().min(2, 'Department code is required (e.g. DEP-CS)'),
  name: z.string().min(3, 'Department name must be at least 3 characters'),
  description: z.string().optional(),
  officeLocation: z.string().optional(),
  email: z.string().email('Valid email is required').or(z.literal('')),
  phone: z.string().optional(),
  schoolId: z.string().min(1, 'Please select a parent school'),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department?: DepartmentResponse | null;
}

export const DepartmentModal = ({ isOpen, onClose, department }: DepartmentModalProps) => {
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const { data: schools = [] } = useSchools();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema)
  });

  useEffect(() => {
    if (department) {
      reset({
        code: department.code || '',
        name: department.name || '',
        description: department.description || '',
        officeLocation: department.officeLocation || '',
        email: department.email || '',
        phone: department.phone || '',
        schoolId: department.school?.id || '',
      });
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        officeLocation: '',
        email: '',
        phone: '',
        schoolId: schools.length > 0 ? schools[0].id : '',
      });
    }
  }, [department, reset, isOpen, schools]);

  const onSubmit = async (data: DepartmentFormValues) => {
    if (department) {
      await updateMutation.mutateAsync({ id: department.id, data });
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {department ? 'Edit Department' : 'Create New Department'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {department ? 'Update department details.' : 'Add a new department under a SUZA school.'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="department-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department Code <span className="text-red-500">*</span></label>
                    <input {...register('code')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. DEP-CS" />
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department Name <span className="text-red-500">*</span></label>
                    <input {...register('name')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Department of Computer Science" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Office Location</label>
                    <input {...register('officeLocation')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Room 204, SCCS Block" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Official Email</label>
                    <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="cs.dep@suza.ac.tz" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input {...register('phone')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="+255..." />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea {...register('description')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="Overview of the department..." />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" form="department-form" disabled={isLoading} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                {department ? 'Update Department' : 'Save Department'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
