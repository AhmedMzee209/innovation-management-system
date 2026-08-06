import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setStep, updateData, resetWizard } from '@/store/slices/opportunityWizardSlice';
import { ArrowLeft, ArrowRight, CheckCircle2, Briefcase, FileText, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 1, name: 'Basic Info', icon: Briefcase },
  { id: 2, name: 'Provider', icon: FileText },
  { id: 3, name: 'Eligibility', icon: CheckCircle2 },
  { id: 4, name: 'Review', icon: Check }
];

export const CreateOpportunity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, data } = useSelector((state: RootState) => state.opportunityWizard);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => { if (step < STEPS.length) dispatch(setStep(step + 1)); };
  const prevStep = () => { if (step > 1) dispatch(setStep(step - 1)); };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      dispatch(resetWizard());
      navigate('/dashboard/opportunities');
    }, 1500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header & Stepper */}
      <div className="mb-8">
        <Link to="/dashboard/opportunities" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Post New Opportunity</h1>
        
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0098c8] rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}></div>
          
          {STEPS.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                step >= s.id ? 'bg-[#0098c8] text-white shadow-md shadow-blue-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-700'
              }`}>
                {step > s.id ? <Check size={18} /> : <s.icon size={18} />}
              </div>
              <span className={`absolute top-12 text-xs font-bold whitespace-nowrap ${step >= s.id ? 'text-[#0098c8]' : 'text-gray-400 dark:text-gray-500'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mt-12">
        <div className="p-6 md:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Opportunity Title</label>
                      <input 
                        type="text" 
                        value={data.title}
                        onChange={(e) => dispatch(updateData({ title: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                        placeholder="e.g. Summer Research Internship 2026"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea 
                        rows={4}
                        value={data.description}
                        onChange={(e) => dispatch(updateData({ description: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                        placeholder="Provide details about the role, expectations, and benefits..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                        <select 
                          value={data.type}
                          onChange={(e) => dispatch(updateData({ type: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                        >
                          <option value="">Select Type</option>
                          <option value="Internship">Internship</option>
                          <option value="Grant">Grant</option>
                          <option value="Accelerator">Accelerator</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Provider */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Provider Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
                      <input 
                        type="text" 
                        value={data.providerName}
                        onChange={(e) => dispatch(updateData({ providerName: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Website</label>
                      <input 
                        type="url" 
                        value={data.website}
                        onChange={(e) => dispatch(updateData({ website: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-[#0098c8] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Eligibility */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eligibility & Requirements</h2>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl text-sm flex items-start border border-blue-100 dark:border-blue-800">
                    <AlertCircle size={18} className="mr-3 shrink-0 mt-0.5" />
                    Define who can apply for this opportunity. This will be used to automatically filter applicants.
                  </div>

                  {/* Mocking the UI inputs for brevity in this dummy implementation */}
                  <div className="h-40 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-400">
                    Eligibility Configuration Interface
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review & Publish</h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</h4>
                      <p className="font-medium text-gray-900 dark:text-white">{data.title || 'Not provided'}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Provider</h4>
                      <p className="font-medium text-gray-900 dark:text-white">{data.providerName || 'Not provided'}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Type</h4>
                      <p className="font-medium text-gray-900 dark:text-white">{data.type || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-xl font-bold text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          
          {step < STEPS.length ? (
            <button 
              onClick={nextStep}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center shadow-sm"
            >
              Continue <ArrowRight size={16} className="ml-2" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#0098c8] text-white hover:bg-blue-600 transition-colors flex items-center shadow-sm"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Opportunity'} <CheckCircle2 size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
