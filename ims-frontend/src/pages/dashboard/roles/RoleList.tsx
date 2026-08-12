import { Shield, Users, Plus, Edit, Loader2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacService, RoleResponse } from '@/services/api/rbacService';
import { RoleModal } from '@/components/dashboard/roles/RoleModal';
import { useState } from 'react';
import Swal from 'sweetalert2';

export const RoleList = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<RoleResponse | null>(null);

  const { data: roles, isLoading, isError } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rbacService.getRoles()
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => rbacService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      Swal.fire('Deleted!', 'Role has been deleted.', 'success');
    },
    onError: (err: any) => {
      Swal.fire('Error', err?.response?.data?.message || 'Failed to delete role', 'error');
    }
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Users with this role might lose access!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const openCreateModal = () => {
    setRoleToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (role: RoleResponse) => {
    setRoleToEdit(role);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">System Roles</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage user roles and their permission assignments.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/dashboard/roles/permissions" className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Shield size={16} className="mr-2 text-[#0098c8]" /> Permissions Matrix
          </Link>
          <button onClick={openCreateModal} className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Add Role
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 size={40} className="text-[#0098c8] animate-spin mb-4" />
          <p className="text-gray-500">Loading roles...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-24 text-red-500">Failed to load roles.</div>
      ) : (
        <>
          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {roles?.map(role => {
              const permCount = role.permissions?.length || 0;

          return (
            <div key={role.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0098c8]/10 text-[#0098c8] flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  {role.name === 'ROLE_SUPER_ADMIN' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      System Role
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{role.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[40px]">{role.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center mb-1">
                      <Users size={12} className="mr-1" /> Users
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">-</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center mb-1">
                      <Shield size={12} className="mr-1" /> Permissions
                    </p>
                    <p className="text-lg font-bold text-[#0098c8]">{permCount || '-'}</p>
                  </div>
                </div>
                
                {permCount > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-2">Assigned Permissions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions?.slice(0, 4).map(p => (
                        <span key={p.id} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          {p.name.replace('PERMISSION_', '').replace(/_/g, ' ')}
                        </span>
                      ))}
                      {permCount > 4 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#0098c8]/10 text-[#0098c8]">
                          +{permCount - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Link to={`/dashboard/users?role=${role.id}`} className="text-sm font-medium text-[#0098c8] hover:underline">
                  View users
                </Link>
                <div className="flex space-x-2">
                  <button onClick={() => openEditModal(role)} className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-800 shadow-sm rounded-md border border-gray-200 dark:border-gray-700 transition-colors">
                    <Edit size={14} />
                  </button>
                  {role.name !== 'ROLE_SUPER_ADMIN' && (
                    <button onClick={() => handleDelete(role.id)} className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 bg-white dark:bg-gray-800 shadow-sm rounded-md border border-gray-200 dark:border-gray-700 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
          </div>
        </>
      )}

      <RoleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roleToEdit={roleToEdit} 
      />
    </div>
  );
};
