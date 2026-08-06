import { Competition, MOCK_PARTICIPANTS } from '@/data/mockCompetitions';
import { CompetitionStatusBadge } from './CompetitionStatusBadge';
import { Trophy, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const CompetitionCard = ({ competition }: { competition: Competition }) => {
  const participantsCount = MOCK_PARTICIPANTS.filter(p => p.competitionId === competition.id).length;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col group h-full overflow-hidden">
      
      {/* Banner */}
      <div className={`h-28 bg-gradient-to-r ${competition.bannerColor} relative`}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-3 right-3">
          <CompetitionStatusBadge status={competition.status} className="bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm border-none" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col -mt-8 relative z-10">
        <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-3">
          <Trophy size={24} className="text-[#0098c8]" />
        </div>

        <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1" title={competition.name}>
          {competition.name}
        </h3>
        <p className="text-xs font-bold text-[#0098c8] mb-3">{competition.type} • {competition.category}</p>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
          {competition.description}
        </p>

        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar size={14} className="mr-1.5 shrink-0" />
              <span className="truncate">{format(parseISO(competition.startDate), 'MMM d, yy')}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin size={14} className="mr-1.5 shrink-0" />
              <span className="truncate">{competition.venue.split(',')[0]}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users size={14} className="mr-1.5 shrink-0" />
              <span>{participantsCount} / {competition.maxTeams} Teams</span>
            </div>
            <div className="flex items-center text-amber-600 dark:text-amber-500 font-bold">
              <Trophy size={14} className="mr-1.5 shrink-0" />
              <span>${(competition.prizePool / 1000).toFixed(0)}k Prize</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400">{competition.code}</span>
        <Link 
          to={`/dashboard/competitions/${competition.id}`}
          className="text-sm font-bold text-[#0098c8] flex items-center group-hover:underline"
        >
          View Event
          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
