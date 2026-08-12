import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  setSearchQuery, 
  setRoleFilter, 
  setStatusFilter, 
  toggleUserSelection, 
  clearSelection, 
  setPage 
} from '@/store/slices/usersSlice';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';
import { rbacService } from '@/services/api/rbacService';
import { UserResponse } from '@/types/auth';
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  getSortedRowModel, 
  useReactTable,
  SortingState
} from '@tanstack/react-table';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';
import { StatusBadge } from '@/components/dashboard/users/StatusBadge';
import { RoleBadge } from '@/components/dashboard/users/RoleBadge';
import { ActionDropdown } from '@/components/dashboard/users/ActionDropdown';
import { Search, Filter, Download, Upload, Plus, Trash2, Shield, X, Users as UsersIcon, UserCheck, UserPlus, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { usePermissions } from '@/hooks/usePermissions';

const columnHelper = createColumnHelper<UserResponse>();

export const UserList = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const { searchQuery, roleFilter, statusFilter, selectedUserIds, page, pageSize } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (roleParam) {
      dispatch(setRoleFilter(roleParam));
    } else {
      dispatch(setRoleFilter(null));
    }
  }, [roleParam, dispatch]);
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const { hasPermission } = usePermissions();

  // Fetch users from API
  const { data: usersPage, isLoading, isError } = useQuery({
    queryKey: ['users', { page, pageSize, searchQuery, roleFilter, statusFilter, sorting }],
    queryFn: () => userService.getUsers({
      page: page - 1,
      size: pageSize,
      search: searchQuery || undefined,
      roleId: roleFilter || undefined,
      enabled: statusFilter === 'Active' ? true : statusFilter === 'Inactive' ? false : undefined,
      sort: sorting.length > 0 ? `${sorting[0].id},${sorting[0].desc ? 'desc' : 'asc'}` : undefined,
    }),
  });

  // Fetch roles for filter dropdown
  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rbacService.getRoles(),
  });

  const users = usersPage?.content || [];

  // Statistics (Mocked for now since backend doesn't provide these aggregate stats in this endpoint)
  const stats = useMemo(() => {
    return {
      total: usersPage?.totalElements || 0,
      active: users.filter(u => u.enabled).length, // Only active in current page, real app might need a separate stats endpoint
      newThisMonth: 0,
    };
  }, [usersPage, users]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'selection',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected() || (selectedUserIds.length > 0 && selectedUserIds.length === users.length && users.length > 0)}
          onChange={(e) => {
            if (e.target.checked) {
              users.forEach(u => {
                if (!selectedUserIds.includes(u.id)) dispatch(toggleUserSelection(u.id));
              });
            } else {
              dispatch(clearSelection());
            }
          }}
          className="rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedUserIds.includes(row.original.id)}
          onChange={() => dispatch(toggleUserSelection(row.original.id))}
          className="rounded border-gray-300 text-[#0098c8] focus:ring-[#0098c8]"
        />
      ),
    }),
    columnHelper.accessor('firstName', {
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <UserAvatar 
            firstName={row.original.firstName} 
            lastName={row.original.lastName} 
            imageUrl={row.original.profilePhoto}
            size="sm"
          />
          <div>
            <Link to={`/dashboard/users/${row.original.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#0098c8] dark:hover:text-[#0098c8] transition-colors">
              {row.original.firstName} {row.original.lastName}
            </Link>
            <p className="text-xs text-gray-500">{row.original.email}</p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('roles', {
      header: 'Role',
      cell: ({ row }) => {
        const roleName = row.original.roles && row.original.roles.length > 0 ? row.original.roles[0].name : 'STUDENT';
        return <RoleBadge roleId={roleName} />
      },
    }),
    columnHelper.accessor('email', {
      header: 'Organization',
      cell: () => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-gray-100">SUZA</span>
          <span className="text-xs text-gray-500">-</span>
        </div>
      ),
    }),
    columnHelper.accessor('enabled', {
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge status={getValue() ? 'Active' : 'Inactive'} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionDropdown user={row.original} status={row.original.enabled ? 'Active' : 'Inactive'} />,
    }),
  ], [selectedUserIds, users, dispatch]);

  const table = useReactTable({
    data: users,
    columns,
    state: { 
      sorting,
      pagination: { pageIndex: page - 1, pageSize }
    },
    onSortingChange: setSorting,
    pageCount: usersPage?.totalPages ?? -1,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage system users, roles, and access controls.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Upload size={16} className="mr-2" /> Import
          </button>
          {hasPermission('USER_CREATE') && (
            <Link to="/dashboard/users/new" className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
              <Plus size={16} className="mr-2" /> Add User
            </Link>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: stats.total, icon: UsersIcon, color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
          { label: 'Active Users', value: stats.active, icon: UserCheck, color: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' },
          { label: 'New This Month', value: stats.newThisMonth, icon: UserPlus, color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col relative">
        
        {/* Bulk Actions Toolbar (Floating overlay) */}
        <AnimatePresence>
          {selectedUserIds.length > 0 && (
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-0 left-0 right-0 h-16 bg-[#0098c8]/10 backdrop-blur-md border-b border-[#0098c8]/20 z-20 flex items-center justify-between px-6"
            >
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-[#0098c8]">{selectedUserIds.length} users selected</span>
                <div className="h-4 w-px bg-[#0098c8]/30"></div>
                <button onClick={() => dispatch(clearSelection())} className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                  <X size={14} className="mr-1" /> Clear
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-200 rounded shadow-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <Shield size={14} className="mr-2 text-indigo-500" /> Change Role
                </button>
                <button className="px-3 py-1.5 text-sm font-medium bg-white border border-red-200 rounded shadow-sm text-red-600 hover:bg-red-50 flex items-center">
                  <Trash2 size={14} className="mr-2" /> Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] transition-shadow dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                value={roleFilter || ''}
                onChange={(e) => dispatch(setRoleFilter(e.target.value || null))}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0098c8] appearance-none dark:text-white"
              >
                <option value="">All Roles</option>
                {roles?.map(r => <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '').replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div className="relative flex-1 sm:flex-none sm:w-36">
              <select 
                value={statusFilter || ''}
                onChange={(e) => dispatch(setStatusFilter(e.target.value || null))}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0098c8] appearance-none dark:text-white"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={header.column.getToggleSortingHandler()}>
                      <div className="flex items-center space-x-1">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getIsSorted() ? (
                          <span className="text-gray-400">
                            {header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↑'}
                          </span>
                        ) : (
                          <span className="text-transparent group-hover:text-gray-300"> ↕</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Loader2 size={32} className="text-[#0098c8] animate-spin mb-2" />
                      <p className="text-sm font-medium text-gray-500">Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-red-500">
                    <p>Failed to load users.</p>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    className={cn(
                      "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group",
                      selectedUserIds.includes(row.original.id) ? "bg-[#0098c8]/5 dark:bg-[#0098c8]/10" : ""
                    )}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-3 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UsersIcon size={48} className="text-gray-300 dark:text-gray-600 mb-2" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white">No users found</p>
                      <p className="text-sm">Try adjusting your search or filters to find what you're looking for.</p>
                      <button onClick={() => { dispatch(setSearchQuery('')); dispatch(setRoleFilter(null)); dispatch(setStatusFilter(null)); }} className="text-[#0098c8] text-sm font-medium hover:underline mt-2">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-gray-900 dark:text-white">{Math.min(page * pageSize, usersPage?.totalElements || 0)}</span> of <span className="font-medium text-gray-900 dark:text-white">{usersPage?.totalElements || 0}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => dispatch(setPage(page + 1))}
              disabled={!usersPage || page >= usersPage.totalPages}
              className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
