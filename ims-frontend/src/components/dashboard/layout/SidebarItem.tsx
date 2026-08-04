import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavItem } from '@/data/navigation';

interface SidebarItemProps {
  item: NavItem;
  isOpen: boolean;
}

export const SidebarItem = ({ item, isOpen }: SidebarItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const Icon = item.icon;
  
  const isActive = location.pathname === item.href || (item.subItems && item.subItems.some(sub => location.pathname === sub.href));

  if (item.subItems && item.subItems.length > 0) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-full flex items-center justify-between py-2.5 px-3 mx-2 rounded-xl transition-colors group relative overflow-hidden",
            isActive ? "bg-[#e5f5fb] dark:bg-[#0098c8]/10 text-[#0098c8]" : "text-slate-600 hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-gray-800"
          )}
          style={{ width: 'calc(100% - 16px)' }}
        >
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#e8b800] rounded-r-md z-10" />
          )}
          <div className="flex items-center">
            <Icon size={20} className={cn("shrink-0 relative z-20", isActive ? "text-[#0098c8]" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300")} />
            {isOpen && (
              <span className="ml-3 text-sm font-medium whitespace-nowrap relative z-20">
                {item.name}
              </span>
            )}
          </div>
          {isOpen && (
            <ChevronDown size={16} className={cn("transition-transform relative z-20", isExpanded ? "rotate-180" : "")} />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pl-10 pr-3 py-2 space-y-1">
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.href}
                    to={subItem.href}
                    className={({ isActive }) => cn(
                      "block py-2 text-sm font-medium rounded-md transition-colors",
                      isActive ? "text-[#0098c8]" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                  >
                    {subItem.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="mb-1">
      <NavLink
        to={item.href}
        className={({ isActive }) => cn(
          "flex items-center py-2.5 px-3 mx-2 rounded-xl transition-colors group relative overflow-hidden",
          isActive ? "bg-[#e5f5fb] dark:bg-[#0098c8]/10 text-[#0098c8]" : "text-slate-600 hover:bg-slate-50 dark:text-gray-400 dark:hover:bg-gray-800"
        )}
        style={{ width: 'calc(100% - 16px)' }}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#e8b800] rounded-r-md z-10" />
            )}
            <Icon size={20} className={cn("shrink-0 relative z-20", isActive ? "text-[#0098c8]" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300")} />
            {isOpen && (
              <span className="ml-3 text-sm font-medium whitespace-nowrap relative z-20">
                {item.name}
              </span>
            )}
          </>
        )}
      </NavLink>
    </div>
  );
};
