import { useDispatch, useSelector } from 'react-redux';
import { Menu, Search } from 'lucide-react';
import { toggleSidebar } from '@/store/slices/dashboardSlice';
import { NotificationDropdown } from '@/components/dashboard/navigation/NotificationDropdown';
import { ProfileDropdown } from '@/components/dashboard/navigation/ProfileDropdown';
import { RootState } from '@/store';
import { ThemeToggle } from '@/components/ui/ThemeToggle'; // Assume we have one or create one later, omitting for now or placing a simple button

export const TopNav = () => {
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10 sticky top-0">
      
      {/* Left section: Sidebar toggle & Global Search */}
      <div className="flex items-center flex-1">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="mr-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0098c8]/50"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0098c8] focus:border-transparent transition-shadow"
            placeholder="Search innovations, startups, users..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <span className="text-xs font-medium text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5 shadow-sm">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right section: Actions & Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <Search size={20} />
        </button>

        {/* Global Action Button */}
        <button className="hidden sm:flex items-center px-3 py-1.5 bg-[#0098c8] hover:bg-[#007aa3] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
          + New Project
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

        <NotificationDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};
