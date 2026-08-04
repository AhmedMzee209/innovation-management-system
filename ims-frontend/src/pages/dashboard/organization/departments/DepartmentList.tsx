import { BookOpen, Plus, Search, Filter } from 'lucide-react';
import { MOCK_DEPARTMENTS, MOCK_SCHOOLS } from '@/data/mockOrganization';
import { DepartmentCard } from '@/components/dashboard/organization/cards/DepartmentCard';
import { useState } from 'react';

export const DepartmentList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  
  const filteredDepartments = MOCK_DEPARTMENTS.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = schoolFilter ? dept.schoolId === schoolFilter : true;
    return matchesSearch && matchesSchool;
  });

  const getSchoolName = (schoolId: string) => MOCK_SCHOOLS.find(s => s.id === schoolId)?.name || 'Unknown School';

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <BookOpen className="mr-3 text-[#0098c8]" size={28} />
            Departments
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage academic departments and their heads across all schools.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Add Department
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search departments..." 
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
              {MOCK_SCHOOLS.map(s => <option key={s.id} value={s.id}>{s.shortName}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepartments.map(dept => (
          <DepartmentCard key={dept.id} dept={dept} schoolName={getSchoolName(dept.schoolId)} />
        ))}
      </div>
    </div>
  );
};
