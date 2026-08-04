import { DashboardCard } from '@/components/dashboard/widgets/DashboardCard';
import { Bell, Shield, Key, Moon, Globe } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">System Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center p-3 bg-white dark:bg-gray-900 text-[#0098c8] border border-[#0098c8]/20 rounded-xl shadow-sm font-bold transition-colors">
            <UserIcon size={18} className="mr-3" /> Account
          </button>
          <button className="w-full flex items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-colors">
            <Bell size={18} className="mr-3" /> Notifications
          </button>
          <button className="w-full flex items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-colors">
            <Shield size={18} className="mr-3" /> Security
          </button>
          <button className="w-full flex items-center p-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl font-medium transition-colors">
            <Moon size={18} className="mr-3" /> Appearance
          </button>
        </div>

        <div className="lg:col-span-2">
          <DashboardCard title="Account Settings">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Language</label>
                <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8] outline-none transition-shadow">
                  <option>English</option>
                  <option>Swahili</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0098c8] outline-none transition-shadow">
                  <option>East Africa Time (EAT)</option>
                  <option>UTC</option>
                </select>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-bold transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-bold transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
