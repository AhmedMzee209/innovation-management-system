import { useState } from 'react';
import { MOCK_COMPETITIONS, MOCK_PARTICIPANTS } from '@/data/mockCompetitions';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { Award, Trophy, Medal, Star, Calendar, Download } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

export const CompetitionResults = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>(MOCK_COMPETITIONS.find(c => c.status === 'Completed')?.id || '');

  const competition = MOCK_COMPETITIONS.find(c => c.id === selectedCompId);
  const participants = MOCK_PARTICIPANTS.filter(p => p.competitionId === selectedCompId && p.finalScore && p.rank).sort((a, b) => (a.rank || 999) - (b.rank || 999));

  const winners = participants.slice(0, 3);
  const finalists = participants.slice(3, 10);

  const getMedalColor = (rank: number) => {
    switch(rank) {
      case 1: return 'text-yellow-400 bg-yellow-50 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.3)]'; // Gold
      case 2: return 'text-gray-400 bg-gray-50 border-gray-200 shadow-[0_0_15px_rgba(156,163,175,0.3)]'; // Silver
      case 3: return 'text-amber-600 bg-amber-50 border-amber-200 shadow-[0_0_15px_rgba(217,119,6,0.3)]'; // Bronze
      default: return 'text-blue-500 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Trophy className="mr-3 text-amber-500" size={28} />
            Competition Results
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View winners, finalists, and download certificates for completed events.</p>
        </div>
        
        <div>
          <select 
            value={selectedCompId}
            onChange={(e) => setSelectedCompId(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-amber-500 outline-none"
          >
            {MOCK_COMPETITIONS.filter(c => c.status === 'Completed').map(c => (
              <option key={c.id} value={c.id}>{c.code}: {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {!competition ? (
        <div className="p-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          Select a completed competition to view results.
        </div>
      ) : (
        <>
          <div className={`h-40 rounded-2xl bg-gradient-to-r ${competition.bannerColor} relative overflow-hidden flex flex-col justify-center items-center text-center p-6 text-white shadow-lg`}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
            <Award size={48} className="mb-2 opacity-80" />
            <h2 className="text-3xl font-black relative z-10 drop-shadow-md">{competition.name} Winners</h2>
            <p className="font-medium text-white/80 mt-1 relative z-10 flex items-center">
              <Calendar size={14} className="mr-1.5" /> Concluded {format(parseISO(competition.endDate), 'MMMM d, yyyy')}
            </p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8">
            
            {/* 2nd Place */}
            {winners[1] && (() => {
              const startup = MOCK_STARTUPS.find(s => s.id === winners[1].startupId);
              return (
                <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-t-2xl rounded-b-xl shadow-md p-6 text-center transform md:-translate-y-4 relative">
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center font-black text-xl z-10 ${getMedalColor(2)}`}>2</div>
                  <div className="mt-6 mb-4 w-20 h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <Medal size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1"><Link to={`/dashboard/startups/${startup?.id}`} className="hover:underline">{startup?.name}</Link></h3>
                  <p className="text-sm font-medium text-gray-500 mb-4">{startup?.industry}</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase">Final Score</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{winners[1].finalScore}</p>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download size={14} className="mr-1.5" /> Certificate
                  </button>
                </div>
              );
            })()}

            {/* 1st Place */}
            {winners[0] && (() => {
              const startup = MOCK_STARTUPS.find(s => s.id === winners[0].startupId);
              return (
                <div className="bg-white dark:bg-gray-900 border-2 border-yellow-400 dark:border-yellow-500 rounded-t-2xl rounded-b-xl shadow-xl p-8 text-center relative z-10">
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center font-black text-3xl z-10 ${getMedalColor(1)}`}>1</div>
                  <div className="mt-6 mb-4 w-24 h-24 mx-auto rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-500">
                    <Trophy size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1"><Link to={`/dashboard/startups/${startup?.id}`} className="hover:underline">{startup?.name}</Link></h3>
                  <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 mb-4">{startup?.industry} • Grand Prize Winner</p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
                    <p className="text-xs font-bold text-yellow-700 dark:text-yellow-600 uppercase mb-1">Final Score</p>
                    <p className="text-4xl font-black text-yellow-600 dark:text-yellow-500">{winners[0].finalScore}</p>
                  </div>
                  <button className="mt-6 w-full py-2.5 bg-yellow-500 text-white text-sm font-bold rounded-xl flex items-center justify-center hover:bg-yellow-600 transition-colors shadow-sm">
                    <Download size={16} className="mr-2" /> Download Certificate
                  </button>
                </div>
              );
            })()}

            {/* 3rd Place */}
            {winners[2] && (() => {
              const startup = MOCK_STARTUPS.find(s => s.id === winners[2].startupId);
              return (
                <div className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-700/50 rounded-t-2xl rounded-b-xl shadow-md p-6 text-center transform md:-translate-y-4 relative">
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center font-black text-xl z-10 ${getMedalColor(3)}`}>3</div>
                  <div className="mt-6 mb-4 w-20 h-20 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                    <Medal size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1"><Link to={`/dashboard/startups/${startup?.id}`} className="hover:underline">{startup?.name}</Link></h3>
                  <p className="text-sm font-medium text-gray-500 mb-4">{startup?.industry}</p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-500 uppercase">Final Score</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{winners[2].finalScore}</p>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download size={14} className="mr-1.5" /> Certificate
                  </button>
                </div>
              );
            })()}
          </div>

          {/* Finalists Table */}
          {finalists.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mt-12">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Star size={18} className="mr-2 text-[#0098c8]" /> Top Finalists
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-16">Rank</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Startup / Innovation</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Final Score</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {finalists.map((participant) => {
                      const startup = MOCK_STARTUPS.find(s => s.id === participant.startupId);
                      return (
                        <tr key={participant.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="p-4 text-center font-black text-gray-400">
                            #{participant.rank}
                          </td>
                          <td className="p-4">
                            <Link to={`/dashboard/startups/${startup?.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline block">{startup?.name}</Link>
                            <span className="text-xs text-gray-500">{startup?.industry}</span>
                          </td>
                          <td className="p-4 text-center font-bold text-gray-900 dark:text-white">
                            {participant.finalScore}
                          </td>
                          <td className="p-4 text-right">
                            <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center">
                              <Download size={14} className="mr-1.5" /> Certificate
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
