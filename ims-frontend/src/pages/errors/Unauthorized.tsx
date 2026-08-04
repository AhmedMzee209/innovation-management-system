import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <ShieldAlert size={48} className="text-red-600 dark:text-red-400" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">401</h1>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">Unauthorized Access</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You need to be logged in to access this page. Please authenticate to continue.
        </p>
        <Link to="/login">
          <button className="px-6 py-2.5 bg-[#0098c8] text-white rounded-lg font-bold hover:bg-[#007aa3] transition-colors shadow-sm">
            Go to Login
          </button>
        </Link>
      </motion.div>
    </div>
  );
};
