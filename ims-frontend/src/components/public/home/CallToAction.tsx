import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CallToAction = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl relative"
          style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0098c8 100%)' }}
        >
          {/* Gold accent bar top */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#e8b800' }} />

          <div className="px-8 py-14 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Shape the Future of Innovation?
            </h2>
            <p className="text-blue-100 text-base mb-10 max-w-2xl mx-auto">
              Join the SUZA Innovation Management System today and turn your groundbreaking ideas into reality. Open to all innovators, researchers, and faculty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="flex items-center px-8 py-3.5 font-bold rounded-lg text-sm transition-all"
                style={{ backgroundColor: '#e8b800', color: '#0d2137' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#c99a00')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e8b800')}
              >
                Create an Account <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="flex items-center px-8 py-3.5 font-bold rounded-lg text-sm text-white transition-all border border-white/30 hover:bg-white/10"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
