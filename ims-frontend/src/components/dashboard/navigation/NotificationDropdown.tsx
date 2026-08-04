import { useState, useRef, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New Innovation Submitted', time: '10 min ago', unread: true },
  { id: 2, title: 'Funding Approved for EduVR', time: '1 hour ago', unread: true },
  { id: 3, title: 'Weekly Analytics Report Ready', time: '1 day ago', unread: false },
];

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0098c8]/50"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-[#0098c8] hover:text-[#0d2137] font-medium flex items-center space-x-1">
                  <Check size={14} />
                  <span>Mark all read</span>
                </button>
              )}
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${notif.unread ? 'bg-[#0098c8]/5 dark:bg-[#0098c8]/10' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm ${notif.unread ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                      {notif.title}
                    </p>
                    {notif.unread && <span className="h-2 w-2 rounded-full bg-[#0098c8] shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-500">{notif.time}</p>
                </div>
              ))}
            </div>
            
            <div className="px-4 py-3 text-center border-t border-gray-100 dark:border-gray-700">
              <button className="text-sm font-bold text-[#0098c8] hover:text-[#0d2137]">View all notifications</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
