import { useParams, Link } from 'react-router-dom';
import { MOCK_FUNDING_PROGRAMS, MOCK_APPLICATIONS } from '@/data/mockFunding';
import { ProgramStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';
import { ArrowLeft, Banknote, Calendar, Users, FileText, Briefcase, Activity, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const ProgramDetails = () => {
  const { id } = useParams();
  const program = MOCK_FUNDING_PROGRAMS.find(p => p.id === id);

  if (!program) return <div className="p-8 text-center text-gray-500">Program not found</div>;

  const programApps = MOCK_APPLICATIONS.filter(a => a.programId === program.id);
  const approvedApps = programApps.filter(a => a.status === 'Approved');
  
  const percentageAvailable = (program.availableBudget / program.totalBudget) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/funding/programs" className="text-sm font-medium text-gray-500 hover:text-emerald-600 flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Programs
        </Link>
        <div className="flex gap-2">
          {program.status === 'Active' && (
            <Link to={`/dashboard/funding/apply?programId=${program.id}`} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
              Apply Now
            </Link>
          )}
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Edit Program
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Banknote size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <ProgramStatusBadge status={program.status} className="bg-white/20 text-white border-none shadow-sm" />
              <span className="text-sm font-bold text-emerald-200">{program.code}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {program.name}
            </h1>
            <p className="text-emerald-100 text-lg max-w-3xl leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
          
          {/* Main Info */}
          <div className="lg:col-span-2 p-6 sm:p-8 space-y-8">
            
            {/* Financial Overview */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
                <Activity size={20} className="mr-2 text-emerald-500" /> Financial Overview
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Pool</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">${program.totalBudget.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-5 border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider mb-1">Available to Award</p>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">${program.availableBudget.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Max per Startup</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">${program.maxAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Fund Utilization</span>
                  <span className="text-gray-900 dark:text-white">{Math.round(100 - percentageAvailable)}% Disbursed/Committed</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${100 - percentageAvailable}%` }}></div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Eligibility */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
                <CheckCircle2 size={20} className="mr-2 text-emerald-500" /> Eligibility Criteria
              </h3>
              <ul className="space-y-3">
                {program.eligibilityCriteria.map((criteria, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 size={16} className="mr-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-100 dark:border-gray-800" />

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
                <FileText size={20} className="mr-2 text-emerald-500" /> Application Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Detailed Business Plan', 'Pitch Deck (PDF)', '12-month Financial Projections', 'Founding Team CVs', 'Legal Registration Docs'].map(req => (
                  <div key={req} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center shadow-sm">
                    <FileText size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="p-6 sm:p-8 bg-gray-50/50 dark:bg-gray-900/50 space-y-8">
            
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Program Details</h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Briefcase size={18} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500 font-medium">Type</p>
                    <p className="font-bold text-gray-900 dark:text-white">{program.type}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Activity size={18} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500 font-medium">Category</p>
                    <p className="font-bold text-gray-900 dark:text-white">{program.category}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Banknote size={18} className="mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500 font-medium">Funding Range</p>
                    <p className="font-bold text-gray-900 dark:text-white">${(program.minAmount/1000).toFixed(0)}k - ${(program.maxAmount/1000).toFixed(0)}k</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Timeline</h3>
              <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-2.5 before:w-0.5 before:-translate-x-px before:bg-gray-200 dark:before:bg-gray-700">
                <div className="relative">
                  <div className="absolute -left-6 w-5 h-5 bg-white dark:bg-gray-900 border-2 border-emerald-500 rounded-full flex items-center justify-center mt-0.5"></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Applications Open</h4>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar size={12} className="mr-1" /> {format(parseISO(program.startDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className={`absolute -left-6 w-5 h-5 bg-white dark:bg-gray-900 border-2 rounded-full flex items-center justify-center mt-0.5 ${program.status === 'Closed' ? 'border-gray-300' : 'border-amber-500'}`}></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Submission Deadline</h4>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Calendar size={12} className="mr-1" /> {format(parseISO(program.endDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Application Stats</h3>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm font-medium text-gray-500">
                    <Users size={16} className="mr-2" /> Total Apps
                  </div>
                  <span className="font-black text-gray-900 dark:text-white">{programApps.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium text-emerald-600">
                    <CheckCircle2 size={16} className="mr-2" /> Awarded
                  </div>
                  <span className="font-black text-emerald-600">{approvedApps.length}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                  <Link to={`/dashboard/funding/applications?programId=${program.id}`} className="text-sm font-bold text-[#0098c8] hover:underline">
                    View All Applications
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
