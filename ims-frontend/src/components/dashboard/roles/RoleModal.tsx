import { useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rbacService, RoleResponse } from '@/services/api/rbacService';
import Swal from 'sweetalert2';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleToEdit?: RoleResponse | null;
}

export const RoleModal = ({ isOpen, onClose, roleToEdit }: RoleModalProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const selectedPermissions = watch('permissionIds') || [];

  const togglePermission = (id: string) => {
    const current = new Set(selectedPermissions);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    setValue('permissionIds', Array.from(current), { shouldDirty: true });
  };

  // Fetch permissions for the multi-select
  const { data: permissions } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => rbacService.getPermissions(),
    enabled: isOpen
  });

  useEffect(() => {
    if (isOpen) {
      if (roleToEdit) {
        reset({
          name: roleToEdit.name.replace('ROLE_', ''),
          description: roleToEdit.description,
          permissionIds: roleToEdit.permissions.map(p => p.id)
        });
      } else {
        reset({ name: '', description: '', permissionIds: [] });
      }
    }
  }, [isOpen, roleToEdit, reset]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => {
      // Backend expects exact RoleType format if we use an Enum for Role name, 
      // but let's assume it handles string and we just send it uppercase and underscored.
      const payload = {
        name: data.name.toUpperCase().replace(/\s+/g, '_'),
        description: data.description,
        permissionIds: data.permissionIds || []
      };

      if (roleToEdit) {
        return rbacService.updateRole(roleToEdit.id, payload);
      }
      return rbacService.createRole(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: roleToEdit ? 'Role updated' : 'Role created',
        showConfirmButton: false,
        timer: 3000,
        customClass: { popup: 'rounded-xl shadow-sm border border-gray-100' }
      });
      onClose();
    },
    onError: (err: any) => {
      Swal.fire('Error', err?.response?.data?.message || 'Failed to save role', 'error');
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-[#0098c8]" />
            {roleToEdit ? 'Edit Role' : 'Create Role'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => saveMutation.mutate(data))} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
            <input 
              {...register('name', { required: true })}
              disabled={roleToEdit?.systemRole}
              placeholder="e.g. MENTOR" 
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] focus:border-[#0098c8] outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${roleToEdit?.systemRole ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800/50' : ''}`}
            />
            <p className="text-xs text-gray-500 mt-1">
              {roleToEdit?.systemRole 
                ? 'System role names cannot be changed.' 
                : 'Role name will be converted to uppercase (e.g., ROLE_NAME).'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              {...register('description')}
              rows={3}
              placeholder="Brief description of the role's purpose..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] focus:border-[#0098c8] outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permissions</label>
              <span className="text-xs text-gray-500 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {selectedPermissions.length} selected
              </span>
            </div>
            
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {permissions?.map(p => {
                  const isSelected = selectedPermissions.includes(p.id);
                  return (
                    <div 
                      key={p.id}
                      onClick={() => togglePermission(p.id)}
                      className={`flex items-start p-2 rounded-lg cursor-pointer border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#0098c8]/10 border-[#0098c8]/50' 
                          : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#0098c8] border-[#0098c8]' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
                        }`}>
                          {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                      <div className="ml-2 flex-1 min-w-0">
                        <p className={`text-xs font-semibold truncate ${isSelected ? 'text-[#0098c8]' : 'text-gray-700 dark:text-gray-300'}`}>
                          {p.name.replace('PERMISSION_', '').replace(/_/g, ' ')}
                        </p>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{p.description || 'System permission'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saveMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0098c8] rounded-lg hover:bg-[#007aa3] flex items-center disabled:opacity-50"
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
