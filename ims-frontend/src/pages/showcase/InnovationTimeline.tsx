import { motion } from 'framer-motion';
import { SHOWCASE_INNOVATIONS, SHOWCASE_STARTUPS, SHOWCASE_AWARDS } from '@/data/mockShowcase';

const TIMELINE_EVENTS = [
  { year: 2019, title: 'IMS Platform Launched', desc: 'SUZA Innovation Management System officially opened its doors to innovators.', color: 'bg-[#0098c8]' },
  { year: 2020, title: 'First Innovation Cohort', desc: '45 innovations submitted in the first full year, with 12 advancing to prototype stage.', color: 'bg-emerald-500' },
  { year: 2021, title: '10 Startups Incubated', desc: 'SUZA launched its first startup incubation program with 10 inaugural companies.', color: 'bg-amber-500' },
  { year: 2022, title: 'First International Partnership', desc: 'Partnership signed with Microsoft Africa and UNDP Tanzania to support innovators.', color: 'bg-purple-500' },
  { year: 2023, title: '$1M Funding Milestone', desc: 'Cumulative funding raised by SUZA startups crossed the $1 million mark.', color: 'bg-rose-500' },
  { year: 2024, title: 'East Africa Innovation Cup Win', desc: 'SUZA startup AgroSense won the East Africa Innovation Cup, putting SUZA on the map.', color: 'bg-indigo-500' },
  { year: 2025, title: '100 Startups Incubated', desc: 'SUZA reached the milestone of 100 startups supported through the IMS ecosystem.', color: 'bg-teal-500' },
  { year: 2026, title: '$4.5M Total Funding', desc: 'Total funding raised by SUZA-supported startups surpassed $4.5 million.', color: 'bg-[#0098c8]' },
];

export const InnovationTimeline = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-6 text-center">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black text-white mb-3">Innovation Timeline</motion.h1>
      <p className="text-white/70">The journey of SUZA's innovation ecosystem</p>
    </div>

    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0098c8] via-amber-400 to-emerald-400" />
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-8 pl-16 relative"
            >
              <div className={`absolute left-0 top-1 w-12 h-12 ${event.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-950`}>
                <span className="text-white text-xs font-black">{event.year}</span>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{event.year}</p>
                <h3 className="font-black text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
