import { useParams, Link } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '@/data/mockFunding';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { ArrowLeft, Activity, CheckCircle2, XCircle, AlertTriangle, MessageSquare, Briefcase } from 'lucide-react';
import { useState } from 'react';

export const ApplicationEvaluation = () => {
  const { id } = useParams();
  const application = MOCK_APPLICATIONS.find(a => a.id === id);
  const startup = MOCK_STARTUPS.find(s => s.id === application?.startupId);

  const [scores, setScores] = useState({
    marketPotential: 0,
    innovation: 0,
    teamCapability: 0,
    financialViability: 0,
    impact: 0
  });

  const [comments, setComments] = useState('');

  if (!application || !startup) return <div className="p-8 text-center text-gray-500">Application not found</div>;

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const averageScore = totalScore > 0 ? (totalScore / 5).toFixed(1) : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/dashboard/funding/applications/${application.id}`} className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Application
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <Activity className="mr-3 text-amber-500" size={28} />
          Funding Evaluation Form
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Evaluating application <span className="font-bold text-gray-700 dark:text-gray-300">{application.applicationNumber}</span> for <span className="font-bold text-gray-700 dark:text-gray-300">{startup.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scoring Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              Evaluation Criteria (1-10)
            </h3>
            
            <div className="space-y-6">
              {[
                { key: 'marketPotential', label: 'Market Potential & Size', desc: 'Is there a clear, large, and accessible market?' },
                { key: 'innovation', label: 'Innovation & Differentiation', desc: 'How unique is the solution compared to existing alternatives?' },
                { key: 'teamCapability', label: 'Team Capability', desc: 'Does the team have the right skills to execute the plan?' },
                { key: 'financialViability', label: 'Financial Viability', desc: 'Are the financial projections realistic and achievable?' },
                { key: 'impact', label: 'Social & Economic Impact', desc: 'Does this align with the university/regional strategic goals?' },
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
              <MessageSquare size={18} className="mr-2 text-gray-400" /> Reviewer Comments
            </h3>
            <textarea 
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
              placeholder="Provide constructive feedback, highlight key strengths, and note any major risks..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm text-center">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Final Score</h3>
            
            <div className="w-32 h-32 mx-auto rounded-full border-8 flex flex-col items-center justify-center mb-4 transition-colors duration-300"
              style={{ borderColor: Number(averageScore) >= 8 ? '#10b981' : Number(averageScore) >= 5 ? '#f59e0b' : '#ef4444' }}
            >
              <span className="text-4xl font-black text-gray-900 dark:text-white">{averageScore}</span>
              <span className="text-xs font-bold text-gray-400">/ 10</span>
            </div>
            
            <div className="space-y-3 mt-6">
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center shadow-sm">
                <CheckCircle2 size={18} className="mr-2" /> Approve Funding
              </button>
              <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center shadow-sm">
                <XCircle size={18} className="mr-2" /> Reject Application
              </button>
              <button className="w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center shadow-sm">
                <AlertTriangle size={18} className="mr-2 text-amber-500" /> Request Revisions
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
              <Briefcase size={16} className="mr-2 text-gray-400" /> Application Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Requested</span>
                <span className="font-bold text-gray-900 dark:text-white">${application.requestedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-gray-500">Startup Stage</span>
                <span className="font-bold text-gray-900 dark:text-white">{startup.stage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Target Market</span>
                <span className="font-bold text-gray-900 dark:text-white">{startup.industry}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
