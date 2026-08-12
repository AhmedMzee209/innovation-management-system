import { useState, useEffect } from 'react';
import { User, Key, Settings, Loader2, Save, Camera } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { restoreSession } from '@/store/slices/authSlice';

export const Profile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<any>();
  const [activeTab, setActiveTab] = useState('personal');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const { data: userResponse, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
  });
  const user = userResponse?.data;

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
      });
      setPhotoPreview(user.profilePhoto || null);
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      // Send a PUT request using updateProfile. We pass the id and full payload.
      return authService.updateProfile(user!.id, {
        ...data,
        roleIds: user!.roles.map((r: any) => r.id),
        enabled: user!.enabled,
        profilePhoto: photoPreview
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      dispatch(restoreSession());
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Profile updated',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100' }
      });
    },
    onError: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Update failed',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100' }
      });
    }
  });

  const onSubmit = (data: any) => {
    updateMutation.mutate(data);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 size={40} className="text-[#0098c8] animate-spin mb-4" />
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (isError || !user) {
    return <div className="text-center py-24 text-red-500">Profile not found.</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <UserAvatar firstName={user.firstName} lastName={user.lastName} imageUrl={photoPreview || undefined} size="lg" />
            <label className="absolute bottom-0 right-0 p-1 bg-[#0098c8] text-white rounded-full cursor-pointer shadow-sm border border-white">
              <Camera size={12} />
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            type="button"
            className="px-6 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center"
            onClick={handleSubmit(onSubmit)}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
               <Save size={16} className="mr-2" />
            )}
            Save Profile
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 min-h-[400px]">
            {activeTab === 'personal' && (
              <form id="profile-form" className="space-y-6">
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

            {['security', 'settings'].includes(activeTab) && (
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
