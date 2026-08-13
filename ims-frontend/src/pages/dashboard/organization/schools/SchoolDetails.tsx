import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Mail, Globe, Users, Edit, Loader2 } from 'lucide-react';
import { useSchool, useDepartmentsBySchool } from '@/hooks/useOrganization';
import { DepartmentCard } from '@/components/dashboard/organization/cards/DepartmentCard';
import { SchoolModal } from '@/components/dashboard/organization/modals/SchoolModal';
import { useState } from 'react';

export const SchoolDetails = () => {
  const { id } = useParams();
  const { data: school, isLoading: isLoadingSchool } = useSchool(id);
  const { data: schoolDepts = [], isLoading: isLoadingDepts } = useDepartmentsBySchool(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoadingSchool) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 size={40} className="animate-spin text-[#0098c8] mb-3" />
        <p className="text-sm text-gray-500 font-medium">Loading school details...</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-500">School not found.</p>
        <Link to="/dashboard/schools" className="mt-4 inline-block text-[#0098c8] hover:underline text-sm font-medium">
          Back to Schools
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <Link to="/dashboard/schools" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0098c8] transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to Schools
        </Link>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
          <Edit size={16} className="mr-2" /> Edit School
        </button>
      </div>

      {/* School Banner */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 w-full bg-gradient-to-r from-[#0098c8] to-[#0d2137] relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-4 right-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-gray-900 shadow-sm">
              {school.status}
            </span>
          </div>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl border-4 border-white dark:border-gray-900 -mt-12 shadow-md relative z-10 w-24 h-24 flex items-center justify-center shrink-0">
              <Building2 size={48} className="text-[#0098c8]" />
            </div>
            <div className="pt-4 sm:pt-0 pb-2 flex-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                {school.name}
              </h1>
              <p className="text-sm font-medium text-gray-500 mt-1">{school.shortName || school.code}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Contact Info</h3>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin size={16} className="mr-3 text-gray-400" /> {school.physicalAddress || 'SUZA Campus'}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail size={16} className="mr-3 text-gray-400" /> {school.email || 'N/A'}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Globe size={16} className="mr-3 text-gray-400" /> {school.website || 'www.suza.ac.tz'}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Overview</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                {school.description || 'No description provided.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-black text-[#0098c8]">{school.innovationsCount ?? 0}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">Innovations</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-500">{school.startupsCount ?? 0}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-500 mt-0.5">Startups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Users size={20} className="mr-2 text-[#0098c8]" />
            Departments ({schoolDepts.length})
          </h2>
        </div>
        {isLoadingDepts ? (
          <div className="py-8 text-center text-gray-400">Loading departments...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {schoolDepts.map(dept => (
              <DepartmentCard key={dept.id} dept={dept} schoolName={school.name} />
            ))}
            {schoolDepts.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-400 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                No departments registered under this school yet.
              </div>
            )}
          </div>
        )}
      </div>

      <SchoolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} school={school} />
    </div>
  );
};
