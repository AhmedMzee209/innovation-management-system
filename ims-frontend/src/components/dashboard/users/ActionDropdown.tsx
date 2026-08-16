import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2, Key, ShieldOff, Shield, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';
import Swal from 'sweetalert2';
import { UserResponse } from '@/types/auth';
import { CreateReviewerProfileModal } from '@/components/dashboard/users/CreateReviewerProfileModal';

interface ActionDropdownProps {
  user: UserResponse;
  status: string;
}

export const ActionDropdown = ({ user, status }: ActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewerModalOpen, setIsReviewerModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: (newStatus: boolean) => userService.updateUserStatus(user.id, user, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Status updated',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-sm border border-gray-100' }
      });
      setIsOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => userService.deleteUser(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
      setIsOpen(false);
    }
  });

  const handleDelete = () => {
    setIsOpen(false);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate();
      }
    });
  };

  const handleToggleStatus = (newStatus: boolean) => {
    toggleStatusMutation.mutate(newStatus);
  };

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
            to={`/dashboard/users/${user.id}/edit`}
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
            <button 
              onClick={() => handleToggleStatus(false)}
              className="flex items-center px-4 py-2 text-sm text-yellow-600 dark:text-yellow-500 hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
            >
              <ShieldOff size={14} className="mr-2" />
              Deactivate
            </button>
          ) : (
            <button 
              onClick={() => handleToggleStatus(true)}
              className="flex items-center px-4 py-2 text-sm text-green-600 dark:text-green-500 hover:bg-gray-50 dark:hover:bg-gray-800 w-full"
            >
              <Shield size={14} className="mr-2" />
              Activate
            </button>
          )}

          {user.roles?.some((r: any) => r.name === 'REVIEWER') && (
            <button 
              onClick={() => { setIsOpen(false); setIsReviewerModalOpen(true); }}
              className="flex items-center px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 w-full"
            >
              <UserCheck size={14} className="mr-2" />
              Register Profile
            </button>
          )}

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-1" />
          
          <button 
            onClick={handleDelete}
            className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full"
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </button>
        </div>
      )}
      
      <CreateReviewerProfileModal 
        isOpen={isReviewerModalOpen} 
        onClose={() => setIsReviewerModalOpen(false)} 
        user={user} 
      />
    </div>
  );
};
