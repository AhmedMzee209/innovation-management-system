import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SIDEBAR_NAVIGATION } from '@/data/navigation';
import { SidebarItem } from './SidebarItem';
import { cn } from '@/lib/utils';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.dashboard);
  const { user } = useSelector((state: RootState) => state.auth);

  // Filter navigation groups based on user role if roles are defined on the item
  const filteredNavigation = SIDEBAR_NAVIGATION.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (!item.roles) return true;
      if (!user) return false;
      // The user role usually comes as ROLE_SUPER_ADMIN, but navigation roles might just be SUPER_ADMIN
      const userRole = user.role.replace('ROLE_', '');
      return item.roles.includes(userRole) || item.roles.includes(user.role);
    })
  })).filter(group => group.items.length > 0);

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-20 shrink-0",
        isSidebarOpen ? "w-64" : "w-20 hidden md:flex"
      )}
    >
      {/* Brand Header */}
      <div 
        className="h-16 flex items-center justify-center border-b-4 shrink-0 px-4"
        style={{ backgroundColor: '#0098c8', borderBottomColor: '#e8b800' }}
      >
        <Link to="/dashboard" className="flex items-center space-x-3 overflow-hidden w-full">
          <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
            <Rocket size={20} className="text-white" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm font-black text-white tracking-tight">SUZA IMS</span>
              <span className="text-[10px] font-medium text-blue-100">Innovation System</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-1 scrollbar-hide">
        <div className="space-y-6">
          {filteredNavigation.map((group) => (
            <div key={group.name}>
              {isSidebarOpen && (
                <h3 className="px-4 text-[11px] font-black text-[#0098c8] uppercase tracking-wider mb-2">
                  {group.name}
                </h3>
              )}
              <nav className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarItem key={item.name} item={item} isOpen={isSidebarOpen} />
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Context Box */}
      {isSidebarOpen && (
        <div className="p-4 bg-gradient-to-br from-[#e5f5fb] to-[#f4fbfd] dark:from-[#0098c8]/10 dark:to-transparent border-t border-[#b3e3f4] dark:border-gray-800 shrink-0 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0098c8] flex items-center justify-center shrink-0">
            <Rocket size={20} className="text-white" />
          </div>
          <div className="flex flex-col overflow-hidden whitespace-nowrap">
            <span className="text-sm font-bold text-[#0d2137] dark:text-white truncate">SUZA Innovation Hub</span>
            <span className="text-[11px] text-gray-500 truncate">Stone Town, Zanzibar</span>
          </div>
        </div>
      )}
    </aside>
  );
};
