import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Shield, Key, Activity, Settings } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { MOCK_USERS } from '@/data/mockUsers';
import { cn } from '@/lib/utils';

export const EditUser = () => {
  const { id } = useParams();
  const user = MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'roles', label: 'Role & Permissions', icon: Shield },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/users" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-gray-700 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center space-x-4">
            <UserAvatar firstName={user.firstName} lastName={user.lastName} imageUrl={user.avatarUrl} size="lg" status={user.status} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email} • {user.role.replace('ROLE_', '').replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-sm">
            Deactivate User
          </button>
          <button className="px-6 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            Save Changes
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
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input type="text" defaultValue={user.firstName} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input type="text" defaultValue={user.lastName} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input type="text" defaultValue={user.phone} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'roles' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Role Assignment</h3>
                <p className="text-sm text-gray-500">Currently assigned role dictates the base permissions.</p>
                <div>
                  <select defaultValue={user.role} className="w-full max-w-md px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] bg-white dark:bg-gray-900 dark:text-white">
                    <option value="ROLE_SUPER_ADMIN">Super Admin</option>
                    <option value="ROLE_STUDENT">Student</option>
                    <option value="ROLE_INNOVATION_DIRECTOR">Innovation Director</option>
                    <option value="ROLE_REVIEWER">Reviewer</option>
                  </select>
                </div>
              </div>
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
