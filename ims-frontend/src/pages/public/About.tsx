import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About IMS</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The Innovation Management System is SUZA's dedicated platform for driving research, incubating startups, and fostering a culture of innovation across Zanzibar.
          </p>
        </motion.div>
        {/* Placeholder for more content */}
        <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <span className="text-gray-400">About Content Placeholder</span>
        </div>
      </div>
    </div>
  );
};
