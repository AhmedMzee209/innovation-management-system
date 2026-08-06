import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_COMPETITIONS } from '@/data/mockCompetitions';
import { Trophy, CheckCircle2, ArrowRight, ArrowLeft, Upload, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompetitionRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const competition = MOCK_COMPETITIONS.find(c => c.id === id);
  const [step, setStep] = useState(1);

  if (!competition) return <div className="p-8 text-center text-gray-500">Competition not found</div>;

  const handleSubmit = () => {
    alert('Registration Submitted Successfully!');
    navigate(`/dashboard/competitions/${id}`);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="mb-8">
        <Link to={`/dashboard/competitions/${id}`} className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Competition
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
          <Trophy className="mr-3 text-[#0098c8]" size={28} />
          Register for {competition.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Complete the application to secure your spot in the competition.</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#0098c8] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>
        
        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm ${
              s === step ? 'bg-[#0098c8] text-white border-4 border-blue-100 dark:border-blue-900/30' : 
              s < step ? 'bg-[#007ba1] text-white' : 
              'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-200 dark:border-gray-700'
            }`}>
              {s < step ? <CheckCircle2 size={18} /> : s}
            </div>
            <span className={`absolute top-12 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              s <= step ? 'text-[#0098c8]' : 'text-gray-400'
            }`}>
              {s === 1 ? 'Startup Info' : s === 2 ? 'Documents' : 'Confirm'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Users className="mr-2 text-[#0098c8]" size={20} /> Select Startup & Team
                </h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select your Startup/Innovation</label>
                  <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none">
                    <option>Smart AgriSense (Agriculture)</option>
                    <option>EduConnect (Education)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Pitching Representative</label>
                  <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none">
                    <option>John Doe (CEO)</option>
                    <option>Jane Smith (CTO)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Why should you win this competition?</label>
                  <textarea rows={4} className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none" placeholder="Provide a brief statement..." />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <Upload className="mr-2 text-[#0098c8]" size={20} /> Supporting Documents
                </h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] rounded-xl flex items-center justify-center mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Upload Pitch Deck</p>
                    <p className="text-xs text-gray-500 mt-1">PDF or PPTX up to 10MB</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] rounded-xl flex items-center justify-center mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Upload Business Plan (Optional)</p>
                    <p className="text-xs text-gray-500 mt-1">PDF up to 5MB</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Ready to Submit!</h3>
                <p className="text-gray-500">You are about to register <span className="font-bold">Smart AgriSense</span> for <span className="font-bold">{competition.name}</span>.</p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mt-6 max-w-sm mx-auto text-sm text-gray-600 dark:text-gray-300 text-left border border-gray-200 dark:border-gray-700">
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle2 size={16} className="text-emerald-500 mr-2" /> Team info verified</li>
                    <li className="flex items-center"><CheckCircle2 size={16} className="text-emerald-500 mr-2" /> Pitch Deck attached</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>
        
        {step < 3 ? (
          <button 
            onClick={() => setStep(s => s + 1)}
            className="px-6 py-3 bg-[#0098c8] text-white rounded-xl font-bold hover:bg-[#007ba1] transition-colors flex items-center shadow-sm"
          >
            Continue <ArrowRight size={18} className="ml-2" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black hover:opacity-90 transition-opacity flex items-center shadow-lg"
          >
            Submit Application <CheckCircle2 size={18} className="ml-2" />
          </button>
        )}
      </div>

    </div>
  );
};
