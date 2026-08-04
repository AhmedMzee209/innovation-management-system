import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Rocket, FileText, Users, Building2, Briefcase, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: FileText },
  { id: 2, title: 'Details', icon: Briefcase },
  { id: 3, title: 'Business', icon: Building2 },
  { id: 4, title: 'Team', icon: Users },
  { id: 5, title: 'Documents', icon: FileText },
  { id: 6, title: 'Review', icon: CheckCircle2 },
];

export const SubmitInnovation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (data: any) => {
    if (currentStep < 6) {
      nextStep();
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/dashboard/innovations');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-center">
          <Rocket className="mr-3 text-[#0098c8]" size={32} />
          Submit Innovation
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Transform your idea into reality. Follow the steps below.</p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0098c8] -z-10 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          ></div>
          
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    isActive ? 'bg-white dark:bg-gray-900 border-[#0098c8] text-[#0098c8]' : 
                    isCompleted ? 'bg-[#0098c8] border-[#0098c8] text-white' : 
                    'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : <Icon size={18} />}
                </div>
                <span className={`text-xs font-bold mt-2 absolute -bottom-6 whitespace-nowrap ${isActive ? 'text-[#0098c8]' : 'text-gray-500'}`}>
                  <span className="hidden sm:inline">{step.title}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Area */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 lg:p-8 mt-12 min-h-[400px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Basic Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Title</label>
                    <input {...register('title')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Enter a catchy title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
                    <textarea {...register('shortDesc')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Briefly describe your innovation" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select {...register('category')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50">
                      <option value="">Select a category</option>
                      <option value="AI">Artificial Intelligence</option>
                      <option value="Health">Health Tech</option>
                      <option value="Blue">Blue Economy</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Deep Dive Details</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Statement</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="What problem are you solving?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proposed Solution</label>
                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="How does your innovation solve the problem?" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Business & Market</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
                    <input className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Who will use this?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Opportunity</label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" />
                  </div>
                </div>
              )}

              {currentStep > 3 && currentStep < 6 && (
                <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="text-gray-500">Step {currentStep} Placeholder (Team / Documents)</p>
                  <p className="text-xs text-gray-400 mt-2">Mock UI for demonstration purposes.</p>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Review & Submit</h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-bold mb-1">Almost there!</p>
                    <p>Please review your application carefully. Once submitted, it will be routed to your School's Innovation Hub for initial screening.</p>
                  </div>
                  
                  <div className="flex items-start mt-6">
                    <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-[#0098c8] rounded border-gray-300 focus:ring-[#0098c8]" required />
                    <span className="text-sm text-gray-600 dark:text-gray-400">I confirm that all information provided is accurate and adheres to the SUZA Intellectual Property policy.</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center">
                <ChevronLeft size={16} className="mr-1" /> Back
              </button>
            ) : (
              <Link to="/dashboard/innovations" className="px-6 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Cancel
              </Link>
            )}
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-bold bg-[#0098c8] text-white rounded-lg hover:bg-[#007aa3] transition-colors shadow-md flex items-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> Processing...</>
              ) : currentStep === 6 ? (
                <><Check size={16} className="mr-2" /> Submit Innovation</>
              ) : (
                <>Next Step <ChevronRight size={16} className="ml-1" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
