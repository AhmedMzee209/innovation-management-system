import { useState, useEffect } from 'react';
import { ArrowLeft, Save, ShieldAlert, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacService } from '@/services/api/rbacService';
import Swal from 'sweetalert2';
import { cn } from '@/lib/utils';

export const Permissions = () => {
  const queryClient = useQueryClient();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rbacService.getRoles(),
  });

  const { data: permissions, isLoading: permsLoading } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => rbacService.getPermissions(),
  });

  const selectedRole = roles?.find(r => r.id === selectedRoleId);
  const [selectedPermIds, setSelectedPermIds] = useState<string[]>([]);

  useEffect(() => {
    if (roles && !selectedRoleId && roles.length > 0) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  useEffect(() => {
    if (selectedRole) {
      setSelectedPermIds(selectedRole.permissions?.map(p => p.id) || []);
    }
  }, [selectedRole]);

  const togglePermission = (permId: string) => {
    setSelectedPermIds(prev => 
      prev.includes(permId) ? prev.filter(id => id !== permId) : [...prev, permId]
    );
  };

  const updateRoleMutation = useMutation({
    mutationFn: async () => {
      if (!selectedRole) return;
      return rbacService.updateRole(selectedRole.id, {
        name: selectedRole.name,
        description: selectedRole.description,
        permissionIds: selectedPermIds,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Permissions updated successfully',
        showConfirmButton: false,
        timer: 3000,
        width: '20rem',
        padding: '1rem',
        customClass: { popup: 'rounded-xl shadow-lg border border-gray-100' }
      });
    }
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/roles" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-gray-700 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Permission Matrix</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure granular access controls for each role.</p>
          </div>
        </div>
        <button 
          onClick={() => updateRoleMutation.mutate()}
          disabled={updateRoleMutation.isPending || !selectedRole}
          className="px-6 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center disabled:opacity-50"
        >
          {updateRoleMutation.isPending ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />} 
          Save Configuration
        </button>
      </div>

      {(rolesLoading || permsLoading) ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 size={40} className="text-[#0098c8] animate-spin mb-4" />
          <p className="text-gray-500">Loading configurations...</p>
        </div>
      ) : (

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Role Selector Sidebar */}
        <div className="w-full xl:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Role</h3>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {roles?.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors",
                    selectedRoleId === role.id ? "bg-[#0098c8]/5 text-[#0098c8] border-l-4 border-l-[#0098c8]" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 border-l-transparent"
                  )}
                >
                  {role.name.replace('ROLE_', '').replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix Area */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full max-h-[800px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-2">
                <ShieldAlert size={20} className="text-[#0098c8]" />
                <h3 className="font-bold text-gray-900 dark:text-white">Editing: {selectedRole?.name.replace('ROLE_', '').replace(/_/g, ' ')}</h3>
              </div>
            </div>

            <div className="overflow-auto relative flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-white">Permission Name</th>
                    <th className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-white">Description</th>
                    <th className="py-4 px-6 text-center text-sm font-bold text-gray-900 dark:text-white">Granted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {permissions?.map(perm => {
                    const isGranted = selectedPermIds.includes(perm.id);
                    return (
                      <tr key={perm.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                        <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {perm.name}
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                          {perm.description || 'No description provided'}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={isGranted}
                              onChange={() => togglePermission(perm.id)}
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#0098c8]"></div>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
