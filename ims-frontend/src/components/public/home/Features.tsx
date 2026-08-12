import { motion } from 'framer-motion';
import { Lightbulb, Users, LineChart, Target, Building2, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Lightbulb, Users, LineChart, Target, Building2, BookOpen];

export const Features = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: '#0098c8' }} />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{t.featuresTitle}</h2>
          </div>
          <p className="text-sm text-gray-500 ml-5 max-w-2xl">{t.featuresSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white transition-colors group-hover:scale-110"
                  style={{ backgroundColor: '#0098c8' }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-xs font-semibold" style={{ color: '#0098c8' }}>
                  <span>{t.learnMore}</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
