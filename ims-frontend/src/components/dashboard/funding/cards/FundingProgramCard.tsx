import { FundingProgram } from '@/data/mockFunding';
import { ProgramStatusBadge } from './FundingStatusBadge';
import { Banknote, ArrowRight, Calendar, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const FundingProgramCard = ({ program }: { program: FundingProgram }) => {
  const percentageAvailable = (program.availableBudget / program.totalBudget) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm shrink-0">
            <Banknote size={24} />
          </div>
          <ProgramStatusBadge status={program.status} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1" title={program.name}>
          {program.name}
        </h3>
        <p className="text-sm font-medium text-[#0098c8] mb-3">{program.type} • {program.category}</p>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
          {program.description}
        </p>

        <div className="space-y-4 mb-4 mt-auto">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 font-bold uppercase text-xs">Available</span>
              <span className="font-bold text-gray-900 dark:text-white">${(program.availableBudget).toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full" 
                style={{ width: `${percentageAvailable}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 justify-between">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1.5 text-gray-400 shrink-0" />
              <span>Ends {format(parseISO(program.endDate), 'MMM d, yyyy')}</span>
            </div>
            <span className="font-bold text-gray-500">Up to ${(program.maxAmount / 1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-end gap-3">
        <Link 
          to={`/dashboard/funding/programs/${program.id}`}
          className="text-sm font-bold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Details
        </Link>
        <Link 
          to={`/dashboard/funding/apply?programId=${program.id}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          Apply Now
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
