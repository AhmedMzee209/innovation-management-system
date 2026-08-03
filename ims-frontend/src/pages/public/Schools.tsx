import { motion } from 'framer-motion';
import { SCHOOLS } from '@/data/dummy';

export const Schools = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Participating Schools</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the innovation happening across all faculties at the State University of Zanzibar.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCHOOLS.map((school, i) => (
             <motion.div 
               key={school.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
             >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold mb-6">
                  {school.acronym}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{school.name}</h3>
                <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                   <div><span className="font-semibold text-gray-900 dark:text-white">{school.innovations}</span> Innovations</div>
                   <div><span className="font-semibold text-gray-900 dark:text-white">{school.startups}</span> Startups</div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
