import { AuthenticationCard } from '@/components/auth/AuthenticationCard';
import { AuthenticationFooter } from '@/components/auth/AuthenticationFooter';
import { RegisterForm } from '@/components/auth/RegisterForm';
import suzaLogo from '@/assets/images/suza-logo.png';
import smzLogo from '@/assets/images/smz-logo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export const Register = () => {
  return (
    <>
      {/* Top-right navigation */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center space-x-3 z-20">
        <Link
          to="/login"
          className="text-xs font-bold text-gray-500 hover:text-[#0098c8] dark:text-gray-400 dark:hover:text-[#0098c8] transition-colors"
        >
          ← Back to Sign In
        </Link>
        <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          Home
        </Link>
      </div>

      {/* Wide card for registration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-gray-100 dark:border-gray-700/50 p-8 sm:p-10 w-full max-w-2xl relative z-10"
      >
        {/* Logo bar */}
        <div className="flex justify-center mb-6 space-x-4 items-center">
          <img src={suzaLogo} alt="SUZA" className="h-12 w-auto object-contain" />
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
          <img src={smzLogo} alt="SMZ" className="h-12 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0098c8]/10 to-[#0d2137]/10 mb-4">
            <ShieldCheck size={28} className="text-[#0098c8]" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-1">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join the SUZA Innovation Management System as an Innovator
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-6 p-3.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-xl flex items-start gap-3">
          <ShieldCheck size={16} className="text-[#0098c8] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            New accounts are created as <strong>Innovators</strong>. To request a different role (Hub Manager, Reviewer, etc.), contact the IMS Administrator after registration.
          </p>
        </div>

        <RegisterForm />
        
        <div className="mt-6">
          <AuthenticationFooter />
        </div>
      </motion.div>
    </>
  );
};
