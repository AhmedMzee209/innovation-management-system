import { Link } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { motion } from 'framer-motion';

export const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <Ban size={48} className="text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">403</h1>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">Access Forbidden</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You don't have the required permissions to view this directory or page using the credentials you supplied.
        </p>
        <Link to="/dashboard">
          <button className="px-6 py-2.5 bg-[#0d2137] text-white rounded-lg font-bold hover:bg-[#1a365d] transition-colors shadow-sm">
            Return to Dashboard
          </button>
        </Link>
      </motion.div>
    </div>
  );
};
