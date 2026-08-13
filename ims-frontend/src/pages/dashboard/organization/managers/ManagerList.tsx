import { useState, useMemo } from 'react';
import { Users, Plus, Search, Filter, Loader2, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInnovationHubs, useAssignmentsByHub, useUnassignManager } from '@/hooks/useOrganization';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/api/userService';
import { ManagerCard } from '@/components/dashboard/organization/cards/ManagerCard';
import { ManagerModal } from '@/components/dashboard/organization/modals/ManagerModal';
import { ManagerDetailsModal } from '@/components/dashboard/organization/modals/ManagerDetailsModal';
import { ManagerEditModal } from '@/components/dashboard/organization/modals/ManagerEditModal';
import Swal from 'sweetalert2';

export const ManagerList = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHubId, setSelectedHubId] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  
  // Modals state
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedManager, setSelectedManager] = useState<any | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const { data: hubs = [], isLoading: isLoadingHubs } = useInnovationHubs();
  
  // Active Hub selection
  const activeHubId = selectedHubId || (hubs.length > 0 ? hubs[0].id : '');
  const { data: assignments = [], isLoading: isLoadingAssignments } = useAssignmentsByHub(activeHubId);
  const unassignMutation = useUnassignManager();

  // Also query manager users directly
  const { data: usersPage } = useQuery({
    queryKey: ['users', 'managers-list', { currentPage, pageSize, searchQuery }],
    queryFn: () => userService.getUsers({
      page: currentPage - 1,
      size: 100,
      search: searchQuery || undefined,
    }),
  });

  const selectedHub = hubs.find(h => h.id === activeHubId);

  // Filter assignments based on search & status
  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const mgr = assignment.manager;
      if (!mgr) return false;

      // Search matching
      const nameMatch = `${mgr.firstName} ${mgr.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const emailMatch = mgr.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const phoneMatch = mgr.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase());
      const roleMatch = (assignment.roleTitle || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = nameMatch || emailMatch || phoneMatch || roleMatch;

      // Status matching
      const isActive = assignment.active ?? true;
      const matchesStatus = 
        statusFilter === 'ALL' ? true :
        statusFilter === 'ACTIVE' ? isActive :
        !isActive;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchQuery, statusFilter]);

  // Paginated slices
  const totalItems = filteredAssignments.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAssignments.slice(start, start + pageSize);
  }, [filteredAssignments, currentPage, pageSize]);

  // Handle Unassign
  const handleUnassign = (assignmentId: string) => {
    Swal.fire({
      title: 'Remove Manager from Hub?',
      text: 'This will end the manager assignment for this hub.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove'
    }).then((result) => {
      if (result.isConfirmed) {
        unassignMutation.mutate(assignmentId);
      }
    });
  };

  // Handle Delete Manager User
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => userService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['hub-assignments'] });
      Swal.fire({
        icon: 'success',
        title: 'Manager Deleted',
        text: 'Manager user account removed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err.response?.data?.message || 'Failed to delete manager user.',
      });
    }
  });

  const handleDelete = (userId: string) => {
    Swal.fire({
      title: 'Delete Manager Account?',
      text: 'This will permanently delete this user account from the system.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete permanently'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(userId);
      }
    });
  };

  const handleViewDetails = (manager: any, assignment: any) => {
    setSelectedManager(manager);
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (manager: any) => {
    setSelectedManager(manager);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Users className="mr-3 text-[#0098c8]" size={28} />
            Innovation Managers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage personnel, hub assignments, and manager profiles across SUZA.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
          >
            <UserPlus size={16} className="mr-2" /> Create New Manager
          </button>
          <button 
            onClick={() => setIsAssignModalOpen(true)} 
            className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
          >
            <Plus size={16} className="mr-2" /> Assign Manager to Hub
          </button>
        </div>
      </div>

      {/* Toolbar - Search & Filters */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search managers by name, email, phone, or title..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>

        {/* Hub Filter */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={activeHubId}
              onChange={(e) => { setSelectedHubId(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white appearance-none"
            >
              {hubs.map(h => (
                <option key={h.id} value={h.id}>{h.name} ({h.code})</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e: any) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white appearance-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="INACTIVE">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoadingHubs || isLoadingAssignments ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={36} className="animate-spin text-[#0098c8] mb-2" />
          <p className="text-sm text-gray-500">Loading innovation manager assignments...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedAssignments.map(assignment => (
              <ManagerCard 
                key={assignment.id} 
                assignment={assignment} 
                hubName={selectedHub?.name} 
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUnassign={handleUnassign}
              />
            ))}
            {filteredAssignments.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <Users size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-lg font-medium text-gray-900 dark:text-white">No manager assignments found</p>
                <p className="text-sm">Try adjusting your search query, status filter, or hub selection.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Showing <strong className="text-gray-900 dark:text-white">{(currentPage - 1) * pageSize + 1}</strong> to <strong className="text-gray-900 dark:text-white">{Math.min(currentPage * pageSize, totalItems)}</strong> of <strong className="text-gray-900 dark:text-white">{totalItems}</strong> managers
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded text-xs bg-white dark:bg-gray-900 dark:text-white"
                >
                  <option value={4}>4 per page</option>
                  <option value={8}>8 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={24}>24 per page</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <ManagerModal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
        mode="assign" 
      />

      <ManagerModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        mode="create" 
      />

      <ManagerDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        manager={selectedManager}
        hubName={selectedHub?.name}
        assignment={selectedAssignment}
      />

      <ManagerEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        manager={selectedManager}
      />
    </div>
  );
};
