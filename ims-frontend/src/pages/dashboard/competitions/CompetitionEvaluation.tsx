import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PITCH_SESSIONS, MOCK_PARTICIPANTS } from '@/data/mockCompetitions';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { Activity, ArrowLeft, CheckCircle2, MessageSquare, Star } from 'lucide-react';

export const CompetitionEvaluation = () => {
  const { sessionId, participantId } = useParams();
  
  const session = MOCK_PITCH_SESSIONS.find(s => s.id === sessionId);
  const participant = MOCK_PARTICIPANTS.find(p => p.id === participantId);
  const startup = MOCK_STARTUPS.find(s => s.id === participant?.startupId);

  const [scores, setScores] = useState({
    innovation: 0,
    technical: 0,
    business: 0,
    presentation: 0,
    impact: 0
  });

  const [remarks, setRemarks] = useState('');

  if (!session || !startup) return <div className="p-8 text-center text-gray-500">Session or Participant not found</div>;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  // Total out of 50
  const percentage = (totalScore / 50) * 100;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard/competitions/pitch" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Schedule
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <Activity className="mr-3 text-[#0098c8]" size={28} />
          Pitch Evaluation Form
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Evaluating <span className="font-bold text-gray-700 dark:text-gray-300">{startup.name}</span> in <span className="font-bold text-gray-700 dark:text-gray-300">{session.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scoring Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              Scoring Rubric (1-10)
            </h3>
            
            <div className="space-y-6">
              {[
                { key: 'innovation', label: 'Innovation & Originality', desc: 'Is the solution unique and addressing a clear problem?' },
                { key: 'technical', label: 'Technical Quality', desc: 'Is the prototype functional and technically sound?' },
                { key: 'business', label: 'Business Model', desc: 'Is there a clear monetization strategy and market?' },
                { key: 'presentation', label: 'Presentation & Pitch', desc: 'Did the team communicate clearly and effectively?' },
                { key: 'impact', label: 'Potential Impact', desc: 'Can this scale and create meaningful socio-economic impact?' },
              ].map((criterion) => (
                <div key={criterion.key}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">{criterion.label}</label>
                      <span className="text-xs text-gray-500">{criterion.desc}</span>
                    </div>
                    <span className="text-lg font-black text-[#0098c8]">
                      {scores[criterion.key as keyof typeof scores] || '-'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="10" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#0098c8]"
                    value={scores[criterion.key as keyof typeof scores]}
                    onChange={(e) => setScores({...scores, [criterion.key]: parseInt(e.target.value)})}
                  />
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase mt-1">
                    <span>Poor (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageSquare size={18} className="mr-2 text-gray-400" /> Qualitative Feedback
            </h3>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
              placeholder="Provide constructive feedback for the team..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm text-center">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Score</h3>
            
            <div className="w-32 h-32 mx-auto rounded-full border-8 flex flex-col items-center justify-center mb-4 transition-colors duration-300"
              style={{ borderColor: percentage >= 80 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444' }}
            >
              <span className="text-4xl font-black text-gray-900 dark:text-white">{totalScore}</span>
              <span className="text-xs font-bold text-gray-400">/ 50</span>
            </div>
            
            <div className="space-y-3 mt-6">
              <button className="w-full py-3 bg-[#0098c8] text-white rounded-xl font-bold hover:bg-[#007ba1] transition-colors flex items-center justify-center shadow-sm">
                <CheckCircle2 size={18} className="mr-2" /> Submit Evaluation
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <Star size={16} className="mr-2 text-amber-500" /> Pitch Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Startup</span>
                <span className="font-bold text-gray-900 dark:text-white">{startup.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Industry</span>
                <span className="font-bold text-gray-900 dark:text-white">{startup.industry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Stage</span>
                <span className="font-bold text-gray-900 dark:text-white">{startup.stage}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
