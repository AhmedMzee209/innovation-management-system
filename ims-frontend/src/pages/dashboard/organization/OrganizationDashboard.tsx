import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, BookOpen, Globe, Users, ChevronDown, ChevronRight, LayoutDashboard, Loader2 } from 'lucide-react';
import { useSchools, useDepartments, useInnovationHubs } from '@/hooks/useOrganization';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const TreeNode = ({ label, icon: Icon, children, defaultExpanded = false, colorClass = "text-gray-500", link }: any) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const hasChildren = children && children.length > 0;

  return (
    <div className="ml-4">
      <div 
        className={cn(
          "flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",
          isExpanded ? "bg-gray-50 dark:bg-gray-800/50" : ""
        )}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown size={16} className="text-gray-400 mr-2 shrink-0" /> : <ChevronRight size={16} className="text-gray-400 mr-2 shrink-0" />
        ) : (
          <div className="w-4 mr-2 shrink-0"></div>
        )}
        <Icon size={18} className={cn("mr-3 shrink-0", colorClass)} />
        {link ? (
          <Link to={link} className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-[#0098c8] hover:underline flex-1 truncate" onClick={(e) => e.stopPropagation()}>
            {label}
          </Link>
        ) : (
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1 truncate">{label}</span>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l border-gray-200 dark:border-gray-800 ml-5 mt-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const OrganizationDashboard = () => {
  const { data: schools = [], isLoading: isLoadingSchools } = useSchools();
  const { data: departments = [], isLoading: isLoadingDepts } = useDepartments();
  const { data: hubs = [], isLoading: isLoadingHubs } = useInnovationHubs();

  const isLoading = isLoadingSchools || isLoadingDepts || isLoadingHubs;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 size={40} className="animate-spin text-[#0098c8] mb-3" />
        <p className="text-sm text-gray-500 font-medium">Loading organization ecosystem hierarchy...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <LayoutDashboard className="mr-3 text-[#0098c8]" size={28} />
            Organization Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Hierarchical view of the SUZA innovation ecosystem structure.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Ecosystem Scale</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center mr-3">
                    <Building2 size={20} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Schools</span>
                </div>
                <span className="text-xl font-black">{schools.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 flex items-center justify-center mr-3">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Departments</span>
                </div>
                <span className="text-xl font-black">{departments.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 flex items-center justify-center mr-3">
                    <Globe size={20} />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Innovation Hubs</span>
                </div>
                <span className="text-xl font-black">{hubs.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Organization Tree */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Interactive Hierarchy</h3>
            
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[400px]">
                <TreeNode label="State University of Zanzibar (SUZA)" icon={Building2} colorClass="text-yellow-600" defaultExpanded>
                  
                  {schools.map(school => {
                    const schoolDepts = departments.filter(d => d.school?.id === school.id);
                    const schoolHubs = hubs.filter(h => h.school?.id === school.id);

                    return (
                      <TreeNode key={school.id} label={`${school.name} (${school.code})`} icon={Building2} colorClass="text-blue-600" link={`/dashboard/schools/${school.id}`}>
                        
                        {schoolHubs.map(hub => (
                          <TreeNode key={hub.id} label={`${hub.name} (${hub.code})`} icon={Globe} colorClass="text-purple-500" link={`/dashboard/hubs/${hub.id}`} />
                        ))}

                        {schoolDepts.map(dept => (
                          <TreeNode key={dept.id} label={`${dept.name} (${dept.code})`} icon={BookOpen} colorClass="text-indigo-500" />
                        ))}

                      </TreeNode>
                    );
                  })}
                  
                </TreeNode>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
