import { FundingApplication } from '@/data/mockFunding';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_FUNDING_PROGRAMS } from '@/data/mockFunding';
import { AppStatusBadge } from './FundingStatusBadge';
import { Calendar, Banknote, Building2, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const ApplicationCard = ({ application }: { application: FundingApplication }) => {
  const startup = MOCK_STARTUPS.find(s => s.id === application.startupId);
  const program = MOCK_FUNDING_PROGRAMS.find(p => p.id === application.programId);

  if (!startup || !program) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col h-full">
      {/* Side Color Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        application.status === 'Approved' ? 'bg-emerald-500' :
        application.status === 'Under Review' ? 'bg-amber-500' :
        application.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'
      }`}></div>

      <div className="flex justify-between items-start mb-3">
        <AppStatusBadge status={application.status} />
        <span className="text-xs font-bold text-gray-500">{application.applicationNumber}</span>
      </div>

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0098c8] to-purple-600 flex items-center justify-center text-white font-black shrink-0 shadow-sm">
          {startup.name.charAt(0)}
        </div>
        <div className="flex-1 overflow-hidden">
          <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-gray-900 dark:text-white truncate hover:text-[#0098c8] transition-colors block">
            {startup.name}
          </Link>
          <p className="text-xs font-medium text-gray-500 truncate" title={program.name}>{program.name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 flex items-center"><Banknote size={14} className="mr-1.5" /> Requested</span>
          <span className="font-bold text-gray-900 dark:text-white">${application.requestedAmount.toLocaleString()}</span>
        </div>
        {application.approvedAmount && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-emerald-600 flex items-center font-medium"><Banknote size={14} className="mr-1.5" /> Approved</span>
            <span className="font-bold text-emerald-600">${application.approvedAmount.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar size={14} className="mr-1.5 text-gray-400" />
          {format(parseISO(application.submissionDate), 'MMM d, yyyy')}
        </div>
        <Link 
          to={`/dashboard/funding/applications/${application.id}`}
          className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#0098c8] hover:text-white transition-colors group-hover:bg-[#0098c8] group-hover:text-white shadow-sm"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
