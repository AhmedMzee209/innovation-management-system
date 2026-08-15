import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Rocket, FileText, Users, Building2, Briefcase, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useInnovationCategories, useCreateInnovation } from '@/hooks/useInnovation';
import { useQuery } from '@tanstack/react-query';
import { organizationService } from '@/services/api/organizationService';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: FileText },
  { id: 2, title: 'Details', icon: Briefcase },
  { id: 3, title: 'Business', icon: Building2 },
  { id: 4, title: 'Organizations', icon: Users },
  { id: 5, title: 'Documents', icon: FileText },
  { id: 6, title: 'Review', icon: CheckCircle2 },
];

const schema = z.object({
  title: z.string().min(1, 'Title is mandatory').max(255),
  abstractText: z.string().optional(),
  categoryId: z.string().min(1, 'Category is mandatory'),
  innovationLevel: z.string().min(1, 'Innovation level is mandatory'),
  innovationType: z.string().min(1, 'Innovation type is mandatory'),
  problemStatement: z.string().min(1, 'Problem statement is mandatory'),
  proposedSolution: z.string().min(1, 'Proposed solution is mandatory'),
  objectives: z.string().optional(),
  targetBeneficiaries: z.string().optional(),
  expectedImpact: z.string().optional(),
  schoolId: z.string().min(1, 'School is mandatory'),
  departmentId: z.string().min(1, 'Department is mandatory'),
  hubId: z.string().min(1, 'Hub is mandatory'),
});

type FormData = z.infer<typeof schema>;

export const SubmitInnovation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const { data: categories = [] } = useInnovationCategories();
  const { data: schoolsData } = useQuery({ queryKey: ['schools'], queryFn: organizationService.getAllSchools });
  
  const schools = schoolsData?.data || [];

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      innovationLevel: 'UNDERGRADUATE_PROJECT',
      innovationType: 'PRODUCT'
    }
  });

  const selectedSchoolId = watch('schoolId');

  const { data: deptsData } = useQuery({ 
    queryKey: ['departments', selectedSchoolId], 
    queryFn: () => organizationService.getDepartmentsBySchool(selectedSchoolId),
    enabled: !!selectedSchoolId
  });

  const { data: hubsData } = useQuery({ 
    queryKey: ['hubs', selectedSchoolId], 
    queryFn: () => organizationService.getHubsBySchool(selectedSchoolId),
    enabled: !!selectedSchoolId
  });

  const departments = deptsData?.data || [];
  const hubs = hubsData?.data || [];

  const { mutate: createInnovation, isPending: isSubmitting } = useCreateInnovation();

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ['title', 'categoryId', 'innovationLevel', 'innovationType'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['problemStatement', 'proposedSolution'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['targetBeneficiaries', 'expectedImpact'];
    } else if (currentStep === 4) {
      fieldsToValidate = ['schoolId', 'departmentId', 'hubId'];
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      nextStep();
    }
  };

  const onSubmit = (data: FormData) => {
    createInnovation(data, {
      onSuccess: () => {
        toast.success("Innovation submitted successfully");
        navigate('/dashboard/innovations');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to submit innovation");
      }
    });
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
      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex items-center justify-between relative min-w-[500px]">
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
              <div key={step.id} className="flex flex-col items-center z-10">
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
                  <span>{step.title}</span>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Title *</label>
                    <input {...register('title')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Enter a catchy title" />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abstract / Short Description</label>
                    <textarea {...register('abstractText')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Briefly describe your innovation" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                      <select {...register('categoryId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50">
                        <option value="">Select a category</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Level *</label>
                      <select {...register('innovationLevel')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50">
                        <option value="UNDERGRADUATE_PROJECT">Undergraduate Project</option>
                        <option value="POSTGRADUATE_RESEARCH">Postgraduate Research</option>
                        <option value="INDEPENDENT_INNOVATION">Independent Innovation</option>
                        <option value="FACULTY_RESEARCH">Faculty Research</option>
                        <option value="INCUBATION">Incubation</option>
                      </select>
                      {errors.innovationLevel && <p className="text-red-500 text-xs mt-1">{errors.innovationLevel.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Type *</label>
                      <select {...register('innovationType')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50">
                        <option value="PRODUCT">Product</option>
                        <option value="PROCESS">Process</option>
                        <option value="SERVICE">Service</option>
                        <option value="BUSINESS_MODEL">Business Model</option>
                        <option value="SOCIAL">Social</option>
                      </select>
                      {errors.innovationType && <p className="text-red-500 text-xs mt-1">{errors.innovationType.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Deep Dive Details</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem Statement *</label>
                    <textarea {...register('problemStatement')} rows={4} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="What problem are you solving?" />
                    {errors.problemStatement && <p className="text-red-500 text-xs mt-1">{errors.problemStatement.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proposed Solution *</label>
                    <textarea {...register('proposedSolution')} rows={4} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="How does your innovation solve the problem?" />
                    {errors.proposedSolution && <p className="text-red-500 text-xs mt-1">{errors.proposedSolution.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objectives</label>
                    <textarea {...register('objectives')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="What are the key objectives?" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Business & Market</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Beneficiaries</label>
                    <input {...register('targetBeneficiaries')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" placeholder="Who will use this?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Impact / Market Opportunity</label>
                    <textarea {...register('expectedImpact')} rows={3} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50" />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Organizations</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School *</label>
                      <select {...register('schoolId')} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50">
                        <option value="">Select a School</option>
                        {schools.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      {errors.schoolId && <p className="text-red-500 text-xs mt-1">{errors.schoolId.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department *</label>
                      <select {...register('departmentId')} disabled={!selectedSchoolId} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 disabled:opacity-50">
                        <option value="">Select a Department</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Innovation Hub *</label>
                      <select {...register('hubId')} disabled={!selectedSchoolId} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 disabled:opacity-50">
                        <option value="">Select a Hub</option>
                        {hubs.map((h) => (
                          <option key={h.id} value={h.id}>{h.name}</option>
                        ))}
                      </select>
                      {errors.hubId && <p className="text-red-500 text-xs mt-1">{errors.hubId.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="text-gray-500">Document Upload</p>
                  <p className="text-xs text-gray-400 mt-2">Documents can be added after the innovation is created from the Details page.</p>
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
            
            {currentStep < 6 ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="px-6 py-2.5 text-sm font-bold bg-[#0098c8] text-white rounded-lg hover:bg-[#007aa3] transition-colors shadow-md flex items-center"
              >
                Next Step <ChevronRight size={16} className="ml-1" />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-bold bg-[#0098c8] text-white rounded-lg hover:bg-[#007aa3] transition-colors shadow-md flex items-center disabled:opacity-70"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <><Check size={16} className="mr-2" /> Submit Innovation</>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
