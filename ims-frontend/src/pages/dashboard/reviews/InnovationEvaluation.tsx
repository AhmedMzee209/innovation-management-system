import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_REVIEWS, EVALUATION_CRITERIA, ReviewDecision } from '@/data/mockReviews';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { Check, ChevronRight, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically build Zod schema based on criteria
const criteriaSchemaShape: any = {};
EVALUATION_CRITERIA.forEach(c => {
  criteriaSchemaShape[`score_${c.id}`] = z.number().min(1, 'Score required').max(10, 'Max 10');
  criteriaSchemaShape[`remark_${c.id}`] = z.string().min(10, 'Remark must be at least 10 characters');
});

const schema = z.object({
  ...criteriaSchemaShape,
  strengths: z.string().min(20, 'Required'),
  weaknesses: z.string().min(20, 'Required'),
  recommendations: z.string().min(20, 'Required'),
  decision: z.enum(['Approve', 'Reject', 'Revision Required', 'Recommend Incubation'] as const, {
    errorMap: () => ({ message: "Please make a final decision" })
  })
});

type EvaluationFormValues = z.infer<typeof schema>;

export const InnovationEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const review = MOCK_REVIEWS.find(r => r.id === id);
  const innovation = MOCK_INNOVATIONS.find(i => i.id === review?.innovationId);

  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['Innovation', 'Technical', 'Business', 'Impact', 'Final Decision'];

  const { control, handleSubmit, formState: { errors }, watch } = useForm<EvaluationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      decision: undefined
    }
  });

  const watchAll = watch();
  
  // Calculate total score on the fly
  const currentTotal = EVALUATION_CRITERIA.reduce((sum, c) => {
    return sum + (watchAll[`score_${c.id}`] || 0);
  }, 0);

  if (!review || !innovation) return <div className="p-8 text-center">Review not found</div>;

  const onSubmit = async (data: EvaluationFormValues) => {
    console.log("Evaluation Submitted:", data);
    // Simulate save
    await new Promise(r => setTimeout(r, 1000));
    navigate('/dashboard/reviews');
  };

  const renderCriteriaSection = (categoryName: string) => {
    const criteria = EVALUATION_CRITERIA.filter(c => c.category === categoryName);
    return (
      <div className="space-y-8">
        {criteria.map((crit, idx) => (
          <div key={crit.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {idx + 1}. {crit.name}
                </h3>
                <p className="text-sm text-gray-500">{crit.description}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] font-bold px-3 py-1 rounded-lg text-sm border border-blue-100 dark:border-blue-900/30">
                Max {crit.maxScore} pts
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Score (1-10) <span className="text-red-500">*</span></label>
                <Controller
                  name={`score_${crit.id}`}
                  control={control}
                  render={({ field }) => (
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      className={cn(
                        "w-24 px-4 py-2 border rounded-lg focus:ring-2 bg-gray-50 dark:bg-gray-800/50 dark:text-white",
                        errors[`score_${crit.id}`] ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-[#0098c8]"
                      )} 
                    />
                  )}
                />
                {errors[`score_${crit.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`score_${crit.id}`]?.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks & Justification <span className="text-red-500">*</span></label>
                <Controller
                  name={`remark_${crit.id}`}
                  control={control}
                  render={({ field }) => (
                    <textarea 
                      rows={3}
                      {...field}
                      className={cn(
                        "w-full px-4 py-2 border rounded-lg focus:ring-2 bg-gray-50 dark:bg-gray-800/50 dark:text-white",
                        errors[`remark_${crit.id}`] ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700 focus:ring-[#0098c8]"
                      )}
                      placeholder="Explain the reasoning behind your score..."
                    />
                  )}
                />
                {errors[`remark_${crit.id}`] && <p className="text-red-500 text-xs mt-1">{errors[`remark_${crit.id}`]?.message as string}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 overflow-y-auto shrink-0">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Evaluation Sections</h2>
        <div className="space-y-2 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700 before:z-0">
          {sections.map((sec, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={cn(
                "relative z-10 w-full flex items-center p-2 rounded-lg text-sm font-medium transition-all group",
                currentSection === idx ? "bg-white dark:bg-gray-800 text-[#0098c8] shadow-sm border border-gray-200 dark:border-gray-700" : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center border-2 mr-3 shrink-0 transition-colors",
                currentSection === idx ? "border-[#0098c8] bg-[#0098c8] text-white" : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
              )}>
                {idx + 1}
              </div>
              {sec}
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-500 mb-1">Total Score</p>
          <div className="flex items-end">
            <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">{currentTotal}</span>
            <span className="text-sm font-medium text-gray-500 ml-1 mb-1">/ 80</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-3">
            <div className="bg-[#0098c8] h-1.5 rounded-full transition-all duration-500" style={{ width: `${(currentTotal / 80) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Review Evaluation Form</h1>
            <p className="text-sm text-gray-500">Innovation: {innovation.title}</p>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <form id="eval-form" onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentSection < 4 && renderCriteriaSection(sections[currentSection])}
                
                {currentSection === 4 && (
                  <div className="space-y-6">
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex items-start text-amber-800 dark:text-amber-400">
                      <ShieldAlert size={20} className="mr-3 shrink-0 mt-0.5" />
                      <p className="text-sm">You are about to submit the final decision for this innovation. This action will notify the innovation owner and update the lifecycle stage. Ensure your remarks are constructive and clear.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key Strengths <span className="text-red-500">*</span></label>
                        <Controller
                          name="strengths" control={control}
                          render={({ field }) => <textarea {...field} rows={3} className={cn("w-full px-4 py-2 border rounded-lg focus:ring-2 bg-gray-50 dark:bg-gray-800/50 dark:text-white", errors.strengths ? "border-red-500" : "border-gray-200 dark:border-gray-700")} />}
                        />
                        {errors.strengths && <p className="text-red-500 text-xs mt-1">{errors.strengths.message}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key Weaknesses <span className="text-red-500">*</span></label>
                        <Controller
                          name="weaknesses" control={control}
                          render={({ field }) => <textarea {...field} rows={3} className={cn("w-full px-4 py-2 border rounded-lg focus:ring-2 bg-gray-50 dark:bg-gray-800/50 dark:text-white", errors.weaknesses ? "border-red-500" : "border-gray-200 dark:border-gray-700")} />}
                        />
                        {errors.weaknesses && <p className="text-red-500 text-xs mt-1">{errors.weaknesses.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recommendations for Innovator <span className="text-red-500">*</span></label>
                        <Controller
                          name="recommendations" control={control}
                          render={({ field }) => <textarea {...field} rows={3} className={cn("w-full px-4 py-2 border rounded-lg focus:ring-2 bg-gray-50 dark:bg-gray-800/50 dark:text-white", errors.recommendations ? "border-red-500" : "border-gray-200 dark:border-gray-700")} />}
                        />
                        {errors.recommendations && <p className="text-red-500 text-xs mt-1">{errors.recommendations.message}</p>}
                      </div>

                      <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-800 pt-6">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Final Decision <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['Approve', 'Recommend Incubation', 'Revision Required', 'Reject'].map(dec => (
                            <Controller
                              key={dec} name="decision" control={control}
                              render={({ field }) => (
                                <button
                                  type="button"
                                  onClick={() => field.onChange(dec)}
                                  className={cn(
                                    "p-3 text-sm font-medium rounded-xl border text-center transition-all",
                                    field.value === dec ? 
                                      (dec === 'Approve' || dec === 'Recommend Incubation' ? "border-green-500 bg-green-50 text-green-700" :
                                       dec === 'Reject' ? "border-red-500 bg-red-50 text-red-700" :
                                       "border-amber-500 bg-amber-50 text-amber-700") :
                                      "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                                  )}
                                >
                                  {dec}
                                </button>
                              )}
                            />
                          ))}
                        </div>
                        {errors.decision && <p className="text-red-500 text-xs mt-2 text-center">{errors.decision.message}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-between shrink-0">
          <button 
            type="button" 
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentSection < 4 ? (
            <button 
              type="button" 
              onClick={() => setCurrentSection(Math.min(4, currentSection + 1))}
              className="px-6 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors flex items-center shadow-sm"
            >
              Next Section <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button 
              type="submit" 
              form="eval-form"
              className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors flex items-center shadow-sm"
            >
              <CheckCircle2 size={16} className="mr-2" /> Submit Final Evaluation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
