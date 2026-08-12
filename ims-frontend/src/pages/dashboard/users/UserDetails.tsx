import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, Building2, Calendar, Shield, Activity, GraduationCap, Loader2 } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { StatusBadge } from '@/components/dashboard/users/StatusBadge';
import { RoleBadge } from '@/components/dashboard/users/RoleBadge';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';

export const UserDetails = () => {
  const { id } = useParams();
  
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
  });

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
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/users" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-gray-700 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">User Profile</h1>
        </div>
        <Link to={`/dashboard/users/${user.id}/edit`} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
          <Edit size={16} className="mr-2" /> Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[#0098c8] to-[#005e7d]"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12">
                <div className="p-1.5 bg-white dark:bg-gray-900 rounded-full">
                  <UserAvatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.profilePhoto} size="xl" />
                </div>
              </div>
              <div className="pt-16">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</h2>
                <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <RoleBadge roleId={user.roles?.[0]?.name.replace('ROLE_', '').replace(/_/g, ' ') || 'No Role'} />
                  <StatusBadge status={user.enabled ? 'Active' : 'Inactive'} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="mr-3 text-gray-400" />
                    {user.phoneNumber || 'Not provided'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Building2 size={16} className="mr-3 text-gray-400" />
                    SUZA
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <GraduationCap size={16} className="mr-3 text-gray-400" />
                    N/A
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center">
                <p className="text-2xl font-black text-[#0098c8]">3</p>
                <p className="text-xs font-medium text-gray-500 mt-1 uppercase">Innovations</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center">
                <p className="text-2xl font-black text-[#0098c8]">12</p>
                <p className="text-xs font-medium text-gray-500 mt-1 uppercase">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Activity size={20} className="mr-2 text-[#0098c8]" /> Recent Activity
            </h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              
              {/* Timeline Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-[#0098c8]/10 text-[#0098c8] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Shield size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Role Updated</h4>
                    <time className="text-xs font-medium text-[#0098c8]">Today, 10:24 AM</time>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User role was updated from Innovator to Reviewer by Super Admin.</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Activity size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Logged In</h4>
                    <time className="text-xs font-medium text-gray-500">Yesterday, 08:30 AM</time>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Successful login from 192.168.1.1</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
