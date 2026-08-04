import { Shield, Users, Plus, Edit } from 'lucide-react';
import { MOCK_ROLES } from '@/data/mockRoles';
import { MOCK_ROLE_PERMISSIONS } from '@/data/mockPermissions';
import { Link } from 'react-router-dom';

export const RoleList = () => {
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
          <button className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Add Role
          </button>
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_ROLES.map(role => {
          const permData = MOCK_ROLE_PERMISSIONS[role.id];
          let permCount = 0;
          if (permData) {
            permData.permissions.forEach(m => {
              Object.values(m.actions).forEach(val => {
                if (val) permCount++;
              });
            });
          }

          return (
            <div key={role.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0098c8]/10 text-[#0098c8] flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  {role.isSystem && (
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
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{role.userCount}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center mb-1">
                      <Shield size={12} className="mr-1" /> Permissions
                    </p>
                    <p className="text-lg font-bold text-[#0098c8]">{permCount || '-'}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Link to={`/dashboard/users?role=${role.id}`} className="text-sm font-medium text-[#0098c8] hover:underline">
                  View users
                </Link>
                <button className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
