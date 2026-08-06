import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setWizardStep, updateWizardData, updateBudgetBreakdown, resetWizard } from '@/store/slices/fundingAppSlice';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_FUNDING_PROGRAMS } from '@/data/mockFunding';
import { ArrowLeft, ArrowRight, CheckCircle2, Banknote, Building2, FileText, PieChart, Info, ShieldCheck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Program & Startup', icon: Building2 },
  { id: 2, title: 'Business Info', icon: Info },
  { id: 3, title: 'Documents', icon: FileText },
  { id: 4, title: 'Budget Breakdown', icon: PieChart },
  { id: 5, title: 'Review & Submit', icon: ShieldCheck },
];

export const ApplyFunding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { wizardStep, wizardData } = useSelector((state: RootState) => state.fundingApp);
  
  const programIdParam = searchParams.get('programId');
  
  useEffect(() => {
    if (programIdParam && !wizardData.programId) {
      dispatch(updateWizardData({ programId: programIdParam }));
    }
  }, [programIdParam]);

  const activeProgram = MOCK_FUNDING_PROGRAMS.find(p => p.id === wizardData.programId);
  const activeStartup = MOCK_STARTUPS.find(s => s.id === wizardData.startupId);

  const totalBudgetRequested = Object.values(wizardData.budgetBreakdown).reduce((a, b) => a + (Number(b) || 0), 0);

  const nextStep = () => {
    if (wizardStep < steps.length) dispatch(setWizardStep(wizardStep + 1));
  };

  const prevStep = () => {
    if (wizardStep > 1) dispatch(setWizardStep(wizardStep - 1));
  };

  const handleSubmit = () => {
    // In a real app, this would dispatch an async thunk to POST the data.
    alert('Application submitted successfully!');
    dispatch(resetWizard());
    navigate('/dashboard/funding/applications');
  };

  const renderStepContent = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Select Startup & Program</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select your Startup</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={wizardData.startupId}
                  onChange={(e) => dispatch(updateWizardData({ startupId: e.target.value }))}
                >
                  <option value="">-- Choose Startup --</option>
                  {MOCK_STARTUPS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.industry})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Funding Program</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={wizardData.programId}
                  onChange={(e) => dispatch(updateWizardData({ programId: e.target.value }))}
                >
                  <option value="">-- Choose Program --</option>
                  {MOCK_FUNDING_PROGRAMS.filter(p => p.status === 'Active').map(p => (
                    <option key={p.id} value={p.id}>{p.code}: {p.name} (Max ${(p.maxAmount/1000).toFixed(0)}k)</option>
                  ))}
                </select>
              </div>

              {activeProgram && (
                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 rounded-xl">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center mb-2">
                    <Banknote size={16} className="mr-2" /> Program Details
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-500 mb-2">{activeProgram.description}</p>
                  <div className="flex gap-4 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <span>Min: ${activeProgram.minAmount.toLocaleString()}</span>
                    <span>Max: ${activeProgram.maxAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Business Model</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Explain how your startup generates revenue..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Market Opportunity</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Describe your target market and competitors..."
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Supporting Documents</h3>
            <p className="text-sm text-gray-500 mb-4">Please upload the required documents for your application. (PDF format preferred)</p>
            
            <div className="space-y-4">
              {['Business Plan', 'Pitch Deck', 'Financial Statements (Last 12 Months)'].map(doc => (
                <div key={doc} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                    <FileText className="text-gray-400 group-hover:text-emerald-600" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{doc}</h4>
                  <p className="text-xs text-gray-500 mt-1">Click to browse or drag and drop</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Budget Breakdown</h3>
            <p className="text-sm text-gray-500 mb-6">Detail how you intend to utilize the requested funds. The total must exactly match your Requested Amount.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {Object.entries(wizardData.budgetBreakdown).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                      <input 
                        type="number" 
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={value === 0 ? '' : value}
                        onChange={(e) => dispatch(updateBudgetBreakdown({ [key]: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center text-center">
                  <PieChart size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Total Budget Requested</p>
                  <h2 className={`text-4xl font-black mb-2 ${activeProgram && totalBudgetRequested > activeProgram.maxAmount ? 'text-red-600' : 'text-emerald-600'}`}>
                    ${totalBudgetRequested.toLocaleString()}
                  </h2>
                  {activeProgram && totalBudgetRequested > activeProgram.maxAmount && (
                    <p className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full mt-2">
                      Exceeds program maximum of ${activeProgram.maxAmount.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h3>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Startup</h4>
                  <p className="font-bold text-gray-900 dark:text-white">{activeStartup?.name || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Funding Program</h4>
                  <p className="font-bold text-gray-900 dark:text-white">{activeProgram?.name || 'Not selected'}</p>
                </div>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Budget Summary</h4>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    {Object.entries(wizardData.budgetBreakdown).map(([key, value]) => {
                      if (value > 0) {
                        return (
                          <div key={key} className="flex justify-between text-sm w-48">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-gray-900 dark:text-gray-300">${value.toLocaleString()}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-500 uppercase">Total Requested</span>
                    <h2 className="text-2xl font-black text-emerald-600">${totalBudgetRequested.toLocaleString()}</h2>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I certify that all information provided in this application is true and accurate. I understand that any false statements may result in immediate disqualification.
                  </span>
                </label>
              </div>

            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (wizardStep === 1) return !wizardData.startupId || !wizardData.programId;
    if (wizardStep === 4) {
      if (totalBudgetRequested <= 0) return true;
      if (activeProgram && totalBudgetRequested > activeProgram.maxAmount) return true;
      if (activeProgram && totalBudgetRequested < activeProgram.minAmount) return true;
    }
    return false;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-6">
          <Banknote className="mr-3 text-emerald-600" size={28} />
          Funding Application
        </h1>

        {/* Stepper */}
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
            style={{ width: `${((wizardStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step) => {
            const isActive = step.id === wizardStep;
            const isCompleted = step.id < wizardStep;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm ${
                  isActive ? 'bg-emerald-600 text-white border-4 border-emerald-100 dark:border-emerald-900/30' : 
                  isCompleted ? 'bg-emerald-500 text-white' : 
                  'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-200 dark:border-gray-700'
                }`}>
                  {isCompleted ? <CheckCircle2 size={18} /> : step.id}
                </div>
                <span className={`absolute top-12 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  isActive || isCompleted ? 'text-emerald-600 dark:text-emerald-500' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8 flex-1 mt-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={wizardStep}
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
          disabled={wizardStep === 1}
          className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>
        
        {wizardStep < steps.length ? (
          <button 
            onClick={nextStep}
            disabled={isNextDisabled()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center shadow-sm"
          >
            Continue <ArrowRight size={18} className="ml-2" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black hover:opacity-90 transition-opacity flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Submit Application <CheckCircle2 size={18} className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};
