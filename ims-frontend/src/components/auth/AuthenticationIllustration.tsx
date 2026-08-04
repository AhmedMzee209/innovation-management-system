import { motion } from 'framer-motion';

export const AuthenticationIllustration = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0d2137] via-[#085a7e] to-[#0098c8] relative overflow-hidden flex-col justify-between p-12">
      {/* Abstract Background Shapes */}
      <motion.div 
        animate={{ 
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#0098c8] rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#e8b800] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          {/* Logo Placeholder (Replace with actual SUZA/IMS logo if needed) */}
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-[#0d2137] shadow-lg">
            IMS
          </div>
          <span className="text-white font-bold text-xl tracking-wide">SUZA Innovation</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-md">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6"
        >
          Transforming Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e8b800]">Global Impact.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-blue-100 text-lg leading-relaxed"
        >
          Join the central nervous system of SUZA innovation. A comprehensive ecosystem designed to support innovators at every stage—from raw ideas to commercialized startups.
        </motion.p>
      </div>

      {/* Glassmorphism Card Element to enhance SaaS feel */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 50 }}
        className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-48 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hidden xl:block shadow-2xl"
      >
        <div className="w-10 h-10 bg-[#0d2137] rounded-full mb-4 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-white font-bold mb-2">Accelerate Growth</h3>
        <p className="text-blue-200 text-sm">Access mentorship, funding, and a network of industry leaders.</p>
      </motion.div>
    </div>
  );
};
