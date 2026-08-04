import { Building2, Plus, Download, Search, Filter } from 'lucide-react';
import { MOCK_SCHOOLS } from '@/data/mockOrganization';
import { SchoolCard } from '@/components/dashboard/organization/cards/SchoolCard';
import { SchoolModal } from '@/components/dashboard/organization/modals/SchoolModal';
import { useState } from 'react';

export const SchoolList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredSchools = MOCK_SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Building2 className="mr-3 text-[#0098c8]" size={28} />
            Schools Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage SUZA schools, their deans, and ecosystem statistics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Add School
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search schools by name or acronym..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center w-full sm:w-auto justify-center">
            <Filter size={16} className="mr-2 text-gray-400" /> Filter
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredSchools.map(school => (
          <SchoolCard key={school.id} school={school} />
        ))}
        {filteredSchools.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <Building2 size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">No schools found</p>
            <p className="text-sm">Try adjusting your search query.</p>
          </div>
        )}
      </div>

      <SchoolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
