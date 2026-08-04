import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Key, ShieldOff, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserStatus } from '@/data/mockUsers';

interface ActionDropdownProps {
  userId: string;
  status: UserStatus;
}

export const ActionDropdown = ({ userId, status }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50 py-1">
          <Link
            to={`/dashboard/users/${userId}/edit`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
          >
            <Edit size={14} className="mr-2" />
            Edit User
          </Link>
          
          <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full">
            <Key size={14} className="mr-2" />
            Reset Password
          </button>

          {status === 'Active' ? (
            <button className="flex items-center px-4 py-2 text-sm text-yellow-600 dark:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-800 w-full">
              <ShieldOff size={14} className="mr-2" />
              Deactivate
            </button>
          ) : (
            <button className="flex items-center px-4 py-2 text-sm text-green-600 dark:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800 w-full">
              <Shield size={14} className="mr-2" />
              Activate
            </button>
          )}

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
          
          <button className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full">
            <Trash2 size={14} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
