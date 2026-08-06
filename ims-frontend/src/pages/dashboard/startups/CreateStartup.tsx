import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { MOCK_REVIEWS } from '@/data/mockReviews';
import { Building2, ArrowRight, ArrowLeft, CheckCircle2, Rocket, Briefcase, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  innovationId: z.string().min(1, 'You must select an approved innovation'),
  name: z.string().min(3, 'Startup name is required'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  industry: z.string().min(1, 'Industry is required'),
  businessModel: z.string().min(1, 'Business model is required'),
  vision: z.string().min(20, 'Vision statement must be detailed'),
  mission: z.string().min(20, 'Mission statement must be detailed'),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateStartup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInnovationId, setSelectedInnovationId] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      innovationId: '',
      name: '',
      tagline: '',
      industry: '',
      businessModel: '',
      vision: '',
      mission: '',
    }
  });

  const approvedInnovationIds = MOCK_REVIEWS
    .filter(r => r.decision === 'Approve' || r.decision === 'Recommend Incubation')
    .map(r => r.innovationId);

  const approvedInnovations = MOCK_INNOVATIONS.filter(i => approvedInnovationIds.includes(i.id));

  // Auto-fill form when innovation is selected
  useEffect(() => {
    if (selectedInnovationId) {
      const inv = MOCK_INNOVATIONS.find(i => i.id === selectedInnovationId);
      if (inv) {
        setValue('innovationId', inv.id);
        setValue('name', `${inv.title.split(' ')[0]} Tech`);
        setValue('industry', inv.categoryId);
      }
    }
  }, [selectedInnovationId, setValue]);

  const onSubmit = (data: FormValues) => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      console.log('Final Data:', data);
      navigate('/dashboard/startups');
    }
  };

  const steps = [
    { id: 1, title: 'Select Innovation', icon: Rocket },
    { id: 2, title: 'Startup Identity', icon: Building2 },
    { id: 3, title: 'Business Details', icon: Briefcase },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#0098c8] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <Building2 size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Launch Startup</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">Convert an approved university innovation into a full-fledged startup entity within the ecosystem.</p>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0098c8] rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-4 font-bold transition-colors duration-300",
                step >= s.id ? "bg-[#0098c8] border-white dark:border-gray-900 text-white" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"
              )}>
                {step > s.id ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
              </div>
              <span className={cn(
                "absolute top-12 text-xs font-bold whitespace-nowrap",
                step >= s.id ? "text-[#0098c8]" : "text-gray-400"
              )}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden mt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8">
            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select Approved Innovation</h2>
                    <p className="text-sm text-gray-500 mb-6">You can only create a startup from an innovation that has been formally approved by the review committee.</p>
                  </div>
                  
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                    {approvedInnovations.map(inv => (
                      <div 
                        key={inv.id}
                        onClick={() => setSelectedInnovationId(inv.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 cursor-pointer transition-all",
                          selectedInnovationId === inv.id 
                            ? "border-[#0098c8] bg-[#0098c8]/5 dark:bg-[#0098c8]/10" 
                            : "border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{inv.title}</h3>
                            <p className="text-xs font-medium text-gray-500 mt-1">{inv.categoryId}</p>
                          </div>
                          {selectedInnovationId === inv.id && (
                            <CheckCircle2 size={20} className="text-[#0098c8]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.innovationId && <p className="text-red-500 text-sm mt-2">{errors.innovationId.message}</p>}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Startup Identity</h2>
                    <p className="text-sm text-gray-500 mb-6">Define the brand and core identity of the new startup.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Startup Name</label>
                      <input 
                        {...register('name')}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all"
                        placeholder="e.g. Acme Tech"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tagline</label>
                      <input 
                        {...register('tagline')}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all"
                        placeholder="A short, catchy phrase describing your value proposition"
                      />
                      {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Industry / Category</label>
                      <input 
                        {...register('industry')}
                        disabled
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Business Details</h2>
                    <p className="text-sm text-gray-500 mb-6">Describe the business model, vision, and mission of the company.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Business Model</label>
                      <select 
                        {...register('businessModel')}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all appearance-none"
                      >
                        <option value="">Select a model...</option>
                        <option value="B2B SaaS">B2B SaaS</option>
                        <option value="B2C Marketplace">B2C Marketplace</option>
                        <option value="Direct to Consumer (D2C)">Direct to Consumer (D2C)</option>
                        <option value="Hardware Sales">Hardware Sales</option>
                        <option value="Subscription Service">Subscription Service</option>
                      </select>
                      {errors.businessModel && <p className="text-red-500 text-xs mt-1">{errors.businessModel.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Vision Statement</label>
                      <textarea 
                        {...register('vision')}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all resize-none"
                        placeholder="What is the ultimate future you are trying to create?"
                      />
                      {errors.vision && <p className="text-red-500 text-xs mt-1">{errors.vision.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Mission Statement</label>
                      <textarea 
                        {...register('mission')}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all resize-none"
                        placeholder="How will you achieve your vision?"
                      />
                      {errors.mission && <p className="text-red-500 text-xs mt-1">{errors.mission.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <div className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
            {step > 1 ? (
              <button 
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center"
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>
            ) : <div></div>}
            
            <button 
              type="submit"
              disabled={step === 1 && !selectedInnovationId}
              className="px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-white transition-colors shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === steps.length ? 'Launch Startup' : 'Continue'} 
              {step !== steps.length && <ArrowRight size={16} className="ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
