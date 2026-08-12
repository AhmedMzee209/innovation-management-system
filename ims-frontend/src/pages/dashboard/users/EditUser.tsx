import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Key, Activity, Settings, Loader2, Save } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';
import { rbacService } from '@/services/api/rbacService';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'roles', label: 'Role & Permissions', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rbacService.getRoles(),
  });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        roleId: user.roles?.[0]?.id || '',
        enabled: user.enabled,
      });
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return userService.updateUser(id!, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        roleIds: [data.roleId],
        enabled: data.enabled === 'true' || data.enabled === true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'User updated successfully',
        showConfirmButton: false,
        timer: 3000,
        width: '18rem',
        padding: '1rem',
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100' }
      });
      navigate('/dashboard/users');
    },
    onError: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Update failed',
        showConfirmButton: false,
        timer: 3000,
        width: '18rem',
        padding: '1rem',
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100' }
      });
    }
  });

  const onSubmit = (data: any) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 size={40} className="text-[#0098c8] animate-spin mb-4" />
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  if (isError || !user) {
    return <div className="text-center py-24 text-red-500">User not found.</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/users" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-gray-700 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center space-x-4">
            <UserAvatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.profilePhoto} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email} • {user.roles?.[0]?.name.replace('ROLE_', '').replace(/_/g, ' ') || 'No Role'}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            type="button"
            className="px-6 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
            onClick={handleSubmit(onSubmit)}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex md:flex-col">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 md:flex-none flex items-center justify-center md:justify-start px-4 py-3 md:p-4 text-sm font-medium transition-colors border-b border-r md:border-r-0 border-gray-100 dark:border-gray-800 last:border-b-0 last:border-r-0",
                    isActive ? "bg-gray-50 dark:bg-gray-800/50 text-[#0098c8] border-l-2 md:border-l-[3px] border-l-[#0098c8]" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200 border-l-2 md:border-l-[3px] border-l-transparent"
                  )}
                >
                  <Icon size={18} className={cn("md:mr-3", isActive ? "text-[#0098c8]" : "text-gray-400 group-hover:text-gray-500")} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 min-h-[500px]">
            {activeTab === 'personal' && (
              <form id="edit-form" className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input {...register('firstName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input {...register('lastName')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input {...register('phoneNumber')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                </div>
              </form>
            )}
            
            {activeTab === 'roles' && (
              <form className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Role Assignment</h3>
                <p className="text-sm text-gray-500">Currently assigned role dictates the base permissions.</p>
                <div>
                  <select {...register('roleId')} className="w-full max-w-md px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                    <option value="">Select a role...</option>
                    {roles?.map(r => (
                      <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '').replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4 pt-4">Account Status</h3>
                <div>
                  <select {...register('enabled')} className="w-full max-w-md px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                    <option value="true">Active (Enabled)</option>
                    <option value="false">Inactive (Disabled)</option>
                  </select>
                </div>
              </form>
            )}

            {/* Other tabs would go here */}
            {['security', 'activity', 'settings'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                <Settings size={48} className="mb-4 opacity-50" />
                <p>This section is under construction.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
