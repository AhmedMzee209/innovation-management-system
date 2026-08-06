import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setWizardStep, updateWizardData, resetWizard } from '@/store/slices/competitionWizardSlice';
import { Trophy, CheckCircle2, ArrowRight, ArrowLeft, Info, Calendar, Users, Award, Eye } from 'lucide-react';

const steps = [
  { id: 1, title: 'Information', icon: Info },
  { id: 2, title: 'Schedule', icon: Calendar },
  { id: 3, title: 'Eligibility', icon: Users },
  { id: 4, title: 'Judging', icon: Award },
  { id: 5, title: 'Review', icon: Eye },
];

export const CreateCompetition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { step, data } = useSelector((state: RootState) => state.competitionWizard);

  useEffect(() => {
    return () => {
      // Don't reset on unmount if we just want to keep draft state, but let's reset for now if leaving
      // dispatch(resetWizard());
    };
  }, []);

  const nextStep = () => {
    if (step < steps.length) dispatch(setWizardStep(step + 1));
  };

  const prevStep = () => {
    if (step > 1) dispatch(setWizardStep(step - 1));
  };

  const handleSubmit = () => {
    alert('Competition Created Successfully!');
    dispatch(resetWizard());
    navigate('/dashboard/competitions/list');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Competition Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                  value={data.name}
                  onChange={(e) => dispatch(updateWizardData({ name: e.target.value }))}
                  placeholder="e.g. OceanTech Hackathon 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                  value={data.description}
                  onChange={(e) => dispatch(updateWizardData({ description: e.target.value }))}
                  placeholder="Describe the goals and theme of the competition..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                    value={data.type}
                    onChange={(e) => dispatch(updateWizardData({ type: e.target.value }))}
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Pitch Deck">Pitch Deck</option>
                    <option value="Business Plan">Business Plan</option>
                    <option value="Innovation Challenge">Innovation Challenge</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                    value={data.category}
                    onChange={(e) => dispatch(updateWizardData({ category: e.target.value }))}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase">Registration Window</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Opens</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 outline-none" 
                    value={data.registrationStart.split('T')[0] || ''} onChange={(e) => dispatch(updateWizardData({ registrationStart: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Closes</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 outline-none" 
                    value={data.registrationEnd.split('T')[0] || ''} onChange={(e) => dispatch(updateWizardData({ registrationEnd: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase">Event Dates</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Starts</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 outline-none" 
                    value={data.startDate.split('T')[0] || ''} onChange={(e) => dispatch(updateWizardData({ startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Ends</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 outline-none" 
                    value={data.endDate.split('T')[0] || ''} onChange={(e) => dispatch(updateWizardData({ endDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Venue / Location</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                value={data.venue}
                onChange={(e) => dispatch(updateWizardData({ venue: e.target.value }))}
                placeholder="e.g. SUZA Main Auditorium or Virtual (Zoom)"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Eligibility & Rules</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Maximum Capacity (Teams/Startups)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                  value={data.maxTeams}
                  onChange={(e) => dispatch(updateWizardData({ maxTeams: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                 <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">Target Audience</h4>
                 <p className="text-sm text-blue-700 dark:text-blue-500">By default, this competition is open to all registered Startups and Innovations in the SUZA IMS platform. Advanced eligibility rules can be configured in the settings after creation.</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Awards & Organizer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Total Prize Pool ($)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none text-lg font-black text-amber-600"
                  value={data.prizePool === 0 ? '' : data.prizePool}
                  onChange={(e) => dispatch(updateWizardData({ prizePool: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Primary Organizer / Sponsor</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                  value={data.organizer}
                  onChange={(e) => dispatch(updateWizardData({ organizer: e.target.value }))}
                  placeholder="e.g. SUZA Hub"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Review & Publish</h3>
            
            <div className={`h-32 bg-gradient-to-r ${data.bannerColor} rounded-xl relative overflow-hidden mb-6 flex flex-col justify-end p-6`}>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <h2 className="text-3xl font-black text-white relative z-10">{data.name || 'Untitled Competition'}</h2>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Type</p>
                  <p className="font-bold text-gray-900 dark:text-white">{data.type}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Category</p>
                  <p className="font-bold text-gray-900 dark:text-white">{data.category}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Prize Pool</p>
                  <p className="font-bold text-amber-600">${data.prizePool.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Capacity</p>
                  <p className="font-bold text-gray-900 dark:text-white">{data.maxTeams} Teams</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Schedule</p>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Registration:</strong> {data.registrationStart || 'TBD'} to {data.registrationEnd || 'TBD'}</p>
                  <p><strong>Event:</strong> {data.startDate || 'TBD'} to {data.endDate || 'TBD'}</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center">Click submit to create this competition and generate a unique code.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !data.name) return true;
    if (step === 2 && (!data.startDate || !data.venue)) return true;
    return false;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-6">
          <Trophy className="mr-3 text-[#0098c8]" size={28} />
          Create Competition
        </h1>

        {/* Stepper */}
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#0098c8] -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((s) => {
            const isActive = s.id === step;
            const isCompleted = s.id < step;
            
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm ${
                  isActive ? 'bg-[#0098c8] text-white border-4 border-blue-100 dark:border-blue-900/30' : 
                  isCompleted ? 'bg-[#007ba1] text-white' : 
                  'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-200 dark:border-gray-700'
                }`}>
                  {isCompleted ? <CheckCircle2 size={18} /> : s.id}
                </div>
                <span className={`absolute top-12 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  isActive || isCompleted ? 'text-[#0098c8]' : 'text-gray-400'
                }`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 flex-1 mt-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>
        
        {step < steps.length ? (
          <button 
            onClick={nextStep}
            disabled={isNextDisabled()}
            className="px-6 py-3 bg-[#0098c8] text-white rounded-xl font-bold hover:bg-[#007ba1] disabled:opacity-50 transition-colors flex items-center shadow-sm"
          >
            Continue <ArrowRight size={18} className="ml-2" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black hover:opacity-90 transition-opacity flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Publish Competition <CheckCircle2 size={18} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};
