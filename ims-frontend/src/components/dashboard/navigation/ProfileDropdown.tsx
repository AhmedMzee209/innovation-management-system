import { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings as SettingsIcon, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/auth/auth.service';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // Ignore error
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      navigate('/login');
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0098c8]/50"
      >
        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm object-cover" />
        <div className="hidden md:flex flex-col items-start mr-1">
          <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">{user.firstName} {user.lastName}</span>
          <span className="text-xs font-medium text-gray-500 mt-1 leading-none">{user.role.replace(/_/g, ' ')}</span>
        </div>
        <ChevronDown size={14} className="text-gray-400 hidden md:block" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 py-1"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 md:hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
              <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="py-1">
              <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <User size={16} className="mr-3 text-gray-400" />
                My Profile
              </Link>
              <Link to="/dashboard/settings" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <SettingsIcon size={16} className="mr-3 text-gray-400" />
                Settings
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <HelpCircle size={16} className="mr-3 text-gray-400" />
                Help & Support
              </Link>
            </div>
            
            <div className="border-t border-gray-100 dark:border-gray-700 py-1">
              <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
