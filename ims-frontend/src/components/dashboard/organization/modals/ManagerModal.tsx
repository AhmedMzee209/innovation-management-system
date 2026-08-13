import { useEffect, useState } from 'react';
import { X, Users, Save, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssignManager, useInnovationHubs } from '@/hooks/useOrganization';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';
import { authService } from '@/services/auth/auth.service';
import Swal from 'sweetalert2';

const assignManagerSchema = z.object({
  hubId: z.string().min(1, 'Please select an innovation hub'),
  managerId: z.string().min(1, 'Please select a user to assign as manager'),
  roleTitle: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

const createManagerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  hubId: z.string().min(1, 'Please select an innovation hub'),
  roleTitle: z.string().optional(),
});

type AssignFormValues = z.infer<typeof assignManagerSchema>;
type CreateFormValues = z.infer<typeof createManagerSchema>;

interface ManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'assign' | 'create';
}

export const ManagerModal = ({ isOpen, onClose, mode = 'assign' }: ManagerModalProps) => {
  const [activeTab, setActiveTab] = useState<'assign' | 'create'>(mode);
  const queryClient = useQueryClient();
  const assignMutation = useAssignManager();
  const { data: hubs = [] } = useInnovationHubs();

  const { data: usersData } = useQuery({
    queryKey: ['users', 'all-managers-select'],
    queryFn: () => userService.getUsers({ size: 100 }),
    enabled: isOpen,
  });
  const users = usersData?.content || [];

  const assignForm = useForm<AssignFormValues>({
    resolver: zodResolver(assignManagerSchema),
    defaultValues: {
      startDate: new Date().toISOString().split('T')[0],
      roleTitle: 'Innovation Hub Manager',
    }
  });

  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createManagerSchema),
    defaultValues: {
      roleTitle: 'Innovation Hub Manager',
    }
  });

  useEffect(() => {
    setActiveTab(mode);
    if (isOpen) {
      assignForm.reset({
        hubId: hubs.length > 0 ? hubs[0].id : '',
        managerId: users.length > 0 ? users[0].id : '',
        roleTitle: 'Innovation Hub Manager',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
      });
      createForm.reset({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        hubId: hubs.length > 0 ? hubs[0].id : '',
        roleTitle: 'Innovation Hub Manager',
      });
    }
  }, [isOpen, mode, assignForm, createForm]);

  const onAssignSubmit = async (data: AssignFormValues) => {
    await assignMutation.mutateAsync({
      hubId: data.hubId,
      managerId: data.managerId,
      roleTitle: data.roleTitle || 'Innovation Hub Manager',
      startDate: data.startDate,
      endDate: data.endDate ? data.endDate : undefined,
    });
    onClose();
  };

  const onCreateSubmit = async (data: CreateFormValues) => {
    try {
      // 1. Register user
      const registerRes = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        userCategory: 'STAFF',
      });

      const newUserId = registerRes.data.user.id;

      // 2. Assign to Hub
      await assignMutation.mutateAsync({
        hubId: data.hubId,
        managerId: newUserId,
        roleTitle: data.roleTitle || 'Innovation Hub Manager',
        startDate: new Date().toISOString().split('T')[0],
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['hub-assignments'] });

      Swal.fire({
        icon: 'success',
        title: 'Manager Created & Assigned',
        text: `Manager ${data.firstName} ${data.lastName} created and assigned successfully!`,
        timer: 2500,
        showConfirmButton: false,
      });

      onClose();
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: err.response?.data?.message || err.message || 'Failed to create manager user.',
      });
    }
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
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {activeTab === 'assign' ? 'Assign Hub Manager' : 'Create & Assign New Manager'}
                  </h2>
                  <p className="text-sm text-gray-500">Manage personnel assignments for SUZA innovation hubs.</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 px-6 bg-gray-50 dark:bg-gray-800/30">
              <button
                type="button"
                onClick={() => setActiveTab('assign')}
                className={`py-3 px-4 text-sm font-semibold border-b-2 flex items-center space-x-2 transition-colors ${
                  activeTab === 'assign'
                    ? 'border-[#0098c8] text-[#0098c8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Users size={16} />
                <span>Assign Existing User</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`py-3 px-4 text-sm font-semibold border-b-2 flex items-center space-x-2 transition-colors ${
                  activeTab === 'create'
                    ? 'border-[#0098c8] text-[#0098c8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <UserPlus size={16} />
                <span>Create New Manager</span>
              </button>
            </div>

            {/* Tab 1: Assign Existing User Form */}
            {activeTab === 'assign' && (
              <div className="p-6 overflow-y-auto">
                <form id="assign-manager-form" onSubmit={assignForm.handleSubmit(onAssignSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Innovation Hub <span className="text-red-500">*</span></label>
                      <select {...assignForm.register('hubId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                        <option value="">Select Innovation Hub...</option>
                        {hubs.map(hub => (
                          <option key={hub.id} value={hub.id}>{hub.name} ({hub.code})</option>
                        ))}
                      </select>
                      {assignForm.formState.errors.hubId && <p className="text-red-500 text-xs mt-1">{assignForm.formState.errors.hubId.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select User <span className="text-red-500">*</span></label>
                      <select {...assignForm.register('managerId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                        <option value="">Select User...</option>
                        {users.map(u => (
                          <option key={u.id} value={u.id}>
                            {u.firstName} {u.lastName} ({u.email})
                          </option>
                        ))}
                      </select>
                      {assignForm.formState.errors.managerId && <p className="text-red-500 text-xs mt-1">{assignForm.formState.errors.managerId.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                      <input {...assignForm.register('roleTitle')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" placeholder="e.g. Lead Hub Manager" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date <span className="text-red-500">*</span></label>
                      <input {...assignForm.register('startDate')} type="date" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                      {assignForm.formState.errors.startDate && <p className="text-red-500 text-xs mt-1">{assignForm.formState.errors.startDate.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date (Optional)</label>
                      <input {...assignForm.register('endDate')} type="date" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                    </div>

                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Create New Manager Form */}
            {activeTab === 'create' && (
              <div className="p-6 overflow-y-auto">
                <form id="create-manager-form" onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name *</label>
                      <input {...createForm.register('firstName')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="First Name" />
                      {createForm.formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{createForm.formState.errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name *</label>
                      <input {...createForm.register('lastName')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="Last Name" />
                      {createForm.formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{createForm.formState.errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                    <input {...createForm.register('email')} type="email" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="manager@suza.ac.tz" />
                    {createForm.formState.errors.email && <p className="text-red-500 text-xs mt-1">{createForm.formState.errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input {...createForm.register('phoneNumber')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="+255 777 123 456" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Password *</label>
                      <input {...createForm.register('password')} type="password" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="••••••••" />
                      {createForm.formState.errors.password && <p className="text-red-500 text-xs mt-1">{createForm.formState.errors.password.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Hub *</label>
                    <select {...createForm.register('hubId')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]">
                      <option value="">Select Innovation Hub...</option>
                      {hubs.map(hub => (
                        <option key={hub.id} value={hub.id}>{hub.name} ({hub.code})</option>
                      ))}
                    </select>
                    {createForm.formState.errors.hubId && <p className="text-red-500 text-xs mt-1">{createForm.formState.errors.hubId.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                    <input {...createForm.register('roleTitle')} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]" placeholder="e.g. Head Innovation Manager" />
                  </div>
                </form>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Cancel
              </button>
              {activeTab === 'assign' ? (
                <button type="submit" form="assign-manager-form" disabled={assignMutation.isPending} className="px-5 py-2.5 text-sm font-medium bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg transition-colors shadow-sm flex items-center disabled:opacity-70 disabled:cursor-not-allowed">
                  {assignMutation.isPending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
                  Assign Manager
                </button>
              ) : (
                <button type="submit" form="create-manager-form" className="px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-sm flex items-center">
                  <UserPlus size={16} className="mr-2" /> Create & Assign
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
