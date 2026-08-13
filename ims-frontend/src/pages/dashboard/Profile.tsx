import { useState, useEffect } from 'react';
import { 
  User, Key, Settings, Loader2, Save, Camera, Mail, Phone, 
  ShieldCheck, GraduationCap, Hash, Calendar, Sparkles, CheckCircle2, Lock
} from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth/auth.service';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { restoreSession } from '@/store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

export const Profile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<any>();
  const [activeTab, setActiveTab] = useState('personal');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Identity & Institution', icon: GraduationCap },
    { id: 'security', label: 'Security & Password', icon: Key },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  const { data: userResponse, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
  });
  const user = userResponse?.data;

  const { register, handleSubmit, reset, watch } = useForm();
  const selectedUserType = watch('userType');

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || 'MALE',
        userType: user.userType || 'STUDENT',
        registrationNumber: user.registrationNumber || '',
        graduationYear: user.graduationYear || '',
      });
      setPhotoPreview(user.profilePhoto || null);
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return authService.updateProfile(user!.id, {
        ...data,
        graduationYear: data.graduationYear ? parseInt(data.graduationYear, 10) : undefined,
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
        title: 'Profile updated successfully',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100 dark:border-gray-800' }
      });
    },
    onError: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update profile',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100 dark:border-gray-800' }
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
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 size={44} className="text-[#0098c8] animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-sm">Loading your profile details...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-center py-24 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800/40 p-8 max-w-lg mx-auto">
        <p className="text-red-600 dark:text-red-400 font-bold">Unable to load profile data.</p>
        <p className="text-xs text-gray-500 mt-2">Please ensure backend server is active and try logging in again.</p>
      </div>
    );
  }

  const roleName = user.roles?.[0]?.name.replace('ROLE_', '').replace(/_/g, ' ') || 'Innovator';

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* ─── Hero Header & Banner ───────────────────────────── */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-44 md:h-52 bg-gradient-to-r from-[#0d2137] via-[#005e7d] to-[#0098c8] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute right-6 top-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold border border-white/20">
            <Sparkles size={14} className="text-amber-300" />
            <span>SUZA Ecosystem Member</span>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 md:px-8 pb-6 relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
            {/* Avatar upload */}
            <div className="relative group shrink-0">
              <div className="p-1.5 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
                <UserAvatar firstName={user.firstName} lastName={user.lastName} imageUrl={photoPreview || undefined} size="xl" className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover" />
              </div>
              <label className="absolute bottom-2 right-2 p-2.5 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-xl cursor-pointer shadow-md border-2 border-white dark:border-gray-900 transition-transform group-hover:scale-105">
                <Camera size={16} />
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>

            {/* Name and Meta */}
            <div className="text-center sm:text-left space-y-1 pb-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {user.firstName} {user.middleName ? `${user.middleName} ` : ''}{user.lastName}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0098c8]/10 text-[#0098c8] dark:bg-[#0098c8]/20 border border-[#0098c8]/20">
                  <ShieldCheck size={13} className="mr-1" /> {roleName}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                {user.userType && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    <GraduationCap size={13} className="mr-1.5 text-[#0098c8]" />
                    {user.userType === 'STUDENT' ? `Student (Reg: ${user.registrationNumber || 'N/A'})` : ''}
                    {user.userType === 'ALUMNI' ? `Alumni (Class of ${user.graduationYear || 'N/A'})` : ''}
                    {user.userType === 'EXTERNAL' ? 'External Innovator' : ''}
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  <CheckCircle2 size={13} className="mr-1" /> Active Profile
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center md:justify-end pb-1">
            <button 
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={updateMutation.isPending}
              className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-[#0098c8] to-[#0d2137] hover:from-[#007aa3] hover:to-[#0a192b] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {updateMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content Grid ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2.5 shadow-sm space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all gap-3",
                    isActive 
                      ? "bg-gradient-to-r from-[#0098c8] to-[#0d2137] text-white shadow-md" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick info box */}
          <div className="mt-6 bg-gradient-to-br from-[#0098c8]/5 to-[#0d2137]/5 dark:from-[#0098c8]/10 dark:to-gray-900 border border-[#0098c8]/15 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black text-[#0098c8] uppercase tracking-wider">Account Tip</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Keep your contact details up to date so mentor requests and opportunity notifications reach you without delay.
            </p>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm min-h-[460px]">
            
            <AnimatePresence mode="wait">
              
              {/* TAB 1: Personal Info */}
              {activeTab === 'personal' && (
                <motion.div key="personal" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Personal Details</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your public information and primary contact details.</p>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register('firstName')} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Middle Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register('middleName')} placeholder="Optional" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register('lastName')} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register('email')} type="email" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input {...register('phoneNumber')} placeholder="+255..." className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Gender</label>
                      <select {...register('gender')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all">
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: Academic & Institutional Identity */}
              {activeTab === 'academic' && (
                <motion.div key="academic" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Institutional & Category Details</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Specify whether you are a Student, Alumni, or External Innovator.</p>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">User Category</label>
                      <select {...register('userType')} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all">
                        <option value="STUDENT">Current Student</option>
                        <option value="ALUMNI">Alumni</option>
                        <option value="EXTERNAL">External / Other</option>
                      </select>
                    </div>

                    {selectedUserType === 'STUDENT' && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Registration Number (Student)</label>
                        <div className="relative">
                          <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input {...register('registrationNumber')} placeholder="e.g. 2024-00123" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                        </div>
                      </motion.div>
                    )}

                    {selectedUserType === 'ALUMNI' && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Graduation Year (Alumni)</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input {...register('graduationYear')} type="number" placeholder="e.g. 2022" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none transition-all" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: Security & Password */}
              {activeTab === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Security Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Manage your account authentication and password security.</p>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Current Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8]/30 focus:border-[#0098c8] outline-none" />
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 pt-2">Password updates require a minimum of 8 characters with at least one number and one symbol.</p>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: Preferences */}
              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">System Preferences</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure your email notifications and theme settings.</p>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-xs text-gray-500 mt-0.5">Receive updates about innovation reviews and messages.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#0098c8] focus:ring-[#0098c8]" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Opportunity Digest</p>
                        <p className="text-xs text-gray-500 mt-0.5">Weekly summary of new funding and competition calls.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-[#0098c8] focus:ring-[#0098c8]" />
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

