import { BookOpen, Plus, Search, Filter, Loader2 } from 'lucide-react';
import { useDepartments, useSchools, useDeleteDepartment } from '@/hooks/useOrganization';
import { DepartmentCard } from '@/components/dashboard/organization/cards/DepartmentCard';
import { DepartmentModal } from '@/components/dashboard/organization/modals/DepartmentModal';
import { useState } from 'react';
import { DepartmentResponse } from '@/types/organization';
import Swal from 'sweetalert2';

export const DepartmentList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<DepartmentResponse | null>(null);

  const { data: departments = [], isLoading } = useDepartments();
  const { data: schools = [] } = useSchools();
  const deleteMutation = useDeleteDepartment();

  const handleEdit = (dept: DepartmentResponse) => {
    setSelectedDept(dept);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedDept(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the department.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dept.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = schoolFilter ? dept.school?.id === schoolFilter : true;
    return matchesSearch && matchesSchool;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <BookOpen className="mr-3 text-[#0098c8]" size={28} />
            Departments
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage academic departments across all SUZA schools.</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Add Department
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search departments by name or code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white appearance-none"
            >
              <option value="">All Schools</option>
              {schools.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={36} className="animate-spin text-[#0098c8] mb-2" />
          <p className="text-sm text-gray-500">Loading departments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDepartments.map(dept => (
            <DepartmentCard 
              key={dept.id} 
              dept={dept} 
              schoolName={dept.school?.name} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {filteredDepartments.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">No departments found</p>
              <p className="text-sm">Try adjusting your search or school filter.</p>
            </div>
          )}
        </div>
      )}

      <DepartmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} department={selectedDept} />
    </div>
  );
};
