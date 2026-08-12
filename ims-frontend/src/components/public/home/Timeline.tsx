import { motion } from 'framer-motion';
import { Lightbulb, FileSearch, Users, Rocket, DollarSign, Trophy, Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const icons = [Lightbulb, FileSearch, Users, Rocket, DollarSign, Trophy, Briefcase];

// Bilingual step data — titles and descriptions per language
const STEPS = {
  en: [
    { title: 'Idea', description: 'Submit your innovative idea to the platform.' },
    { title: 'Review', description: 'Faculty and experts evaluate feasibility.' },
    { title: 'Mentorship', description: 'Get matched with industry mentors.' },
    { title: 'Startup', description: 'Incubate and form your core team.' },
    { title: 'Funding', description: 'Secure seed funding and grants.' },
    { title: 'Competition', description: 'Pitch at university and national events.' },
    { title: 'Commerce', description: 'Launch to the public market.' },
  ],
  sw: [
    { title: 'Wazo', description: 'Tuma wazo lako la ubunifu kwenye mfumo.' },
    { title: 'Tathmini', description: 'Maprofesa na wataalamu hutathmini uwezekano.' },
    { title: 'Ushauri', description: 'Uunganishwa na washauri wa sekta.' },
    { title: 'Startup', description: 'Inkubeti na kuunda timu yako.' },
    { title: 'Ufadhili', description: 'Pata ufadhili wa awali na ruzuku.' },
    { title: 'Mashindano', description: 'Wasilisha kwenye matukio ya chuo na kitaifa.' },
    { title: 'Biashara', description: 'Zindua kwenye soko la umma.' },
  ],
};

export const Timeline = () => {
  const { t, lang } = useLanguage();
  const steps = STEPS[lang] ?? STEPS.en;

  return (
    <section className="py-16" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 rounded-sm" style={{ backgroundColor: '#0098c8' }} />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{t.timelineTitle}</h2>
          </div>
          <p className="text-sm text-gray-500 ml-5">{t.timelineSubtitle}</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 hidden md:block" style={{ backgroundColor: '#0098c8', opacity: 0.3 }} />

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 border-4 border-white shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#0098c8' }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wide text-gray-700 group-hover:text-teal-700">
                    {step.title}
                  </span>
                  <p className="text-xs text-gray-400 mt-1 hidden md:block leading-tight">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
