import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInnovations } from '@/hooks/useInnovation';
import { useCreateStartup, useStartupStages } from '@/hooks/useStartup';
import { Building2, ArrowRight, ArrowLeft, CheckCircle2, Rocket, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';

const formSchema = z.object({
  innovationId: z.string().min(1, 'You must select an innovation'),
  startupName: z.string().min(3, 'Startup name is required'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  description: z.string().optional(),
  vision: z.string().min(10, 'Vision statement must be detailed'),
  mission: z.string().min(10, 'Mission statement must be detailed'),
  stageId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateStartup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedInnovationId, setSelectedInnovationId] = useState<string>('');
  const user = useSelector((state: RootState) => state.auth.user);
  
  const { data: innovations = [] } = useInnovations();
  const { data: stages = [] } = useStartupStages();
  const { mutateAsync: createStartup, isPending } = useCreateStartup();

  // In a real system, you'd filter by approved ones or ones that don't have a startup yet.
  // Assuming the backend has a way or we just show innovations where user is a team member and it's somewhat mature.
  const approvedInnovations = innovations;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      innovationId: '',
      startupName: '',
      tagline: '',
      description: '',
      vision: '',
      mission: '',
      stageId: '',
    }
  });

  // Auto-fill form when innovation is selected
  useEffect(() => {
    if (selectedInnovationId) {
      const inv = approvedInnovations.find(i => i.id === selectedInnovationId);
      if (inv) {
        setValue('innovationId', inv.id);
        setValue('startupName', `${inv.title.split(' ')[0]} Tech`);
        setValue('description', inv.abstractText);
      }
    }
  }, [selectedInnovationId, setValue, approvedInnovations]);

  const onSubmit = async (data: FormValues) => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      if (!user?.id) {
        toast.error('User not authenticated.');
        return;
      }
      
      try {
        await createStartup({
          ...data,
          founderUserId: user.id
        });
        navigate('/dashboard/startups');
      } catch (err) {
        // Error handled in hook
      }
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
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">Convert an innovation into a full-fledged startup entity within the ecosystem.</p>
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Select Innovation</h2>
                    <p className="text-sm text-gray-500 mb-6">Select the innovation you are converting into a startup.</p>
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
                            <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{inv.abstractText}</p>
                          </div>
                          {selectedInnovationId === inv.id && (
                            <CheckCircle2 size={20} className="text-[#0098c8] shrink-0 ml-4" />
                          )}
                        </div>
                      </div>
                    ))}
                    {approvedInnovations.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No innovations found.</p>
                    )}
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
                        {...register('startupName')}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all"
                        placeholder="e.g. Acme Tech"
                      />
                      {errors.startupName && <p className="text-red-500 text-xs mt-1">{errors.startupName.message}</p>}
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
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Initial Stage</label>
                      <select 
                        {...register('stageId')}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-all appearance-none"
                      >
                        <option value="">Select Stage...</option>
                        {stages.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      {errors.stageId && <p className="text-red-500 text-xs mt-1">{errors.stageId.message}</p>}
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
                    <p className="text-sm text-gray-500 mb-6">Describe the vision and mission of the company.</p>
                  </div>

                  <div className="space-y-4">
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
              disabled={isPending || (step === 1 && !selectedInnovationId)}
              className="px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-white transition-colors shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Processing...' : (step === steps.length ? 'Launch Startup' : 'Continue')} 
              {!isPending && step !== steps.length && <ArrowRight size={16} className="ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
