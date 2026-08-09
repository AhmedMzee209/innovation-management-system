import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, Users, Trophy, Banknote, Rocket, Lightbulb } from 'lucide-react';
import { StatCounter } from '@/components/showcase/StatCounter';
import { InnovationCard } from '@/components/showcase/InnovationCard';
import { StartupCard } from '@/components/showcase/StartupCard';
import { StoryCard } from '@/components/showcase/StoryCard';
import { AwardCard } from '@/components/showcase/AwardCard';
import { EventCard } from '@/components/showcase/EventCard';
import { PartnerCard } from '@/components/showcase/PartnerCard';
import {
  SHOWCASE_INNOVATIONS, SHOWCASE_STARTUPS, SHOWCASE_STORIES,
  SHOWCASE_AWARDS, SHOWCASE_EVENTS, SHOWCASE_PARTNERS, SHOWCASE_STATS
} from '@/data/mockShowcase';

const featured = SHOWCASE_INNOVATIONS.filter(i => i.featured).slice(0, 6);
const featuredStartups = SHOWCASE_STARTUPS.filter(s => s.featured).slice(0, 4);
const featuredStories = SHOWCASE_STORIES.filter(s => s.featured).slice(0, 3);
const topAwards = SHOWCASE_AWARDS.slice(0, 4);
const upcomingEvents = SHOWCASE_EVENTS.filter(e => e.upcoming).slice(0, 3);
const partners = SHOWCASE_PARTNERS.slice(0, 8);

const navLinks = [
  { to: '/showcase/innovations', label: 'Innovation Gallery', icon: Lightbulb },
  { to: '/showcase/startups', label: 'Startups', icon: Rocket },
  { to: '/showcase/research', label: 'Research', icon: Globe },
  { to: '/showcase/success-stories', label: 'Success Stories', icon: Sparkles },
  { to: '/showcase/awards', label: 'Awards', icon: Trophy },
  { to: '/showcase/events', label: 'Events', icon: Users },
];

export const ShowcaseDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0098c8] via-[#005f8a] to-[#002d45] min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, white 1px, transparent 1px), radial-gradient(circle at 75% 60%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-xs font-bold mb-8 backdrop-blur">
            <Sparkles size={14} className="text-amber-300" />
            SUZA Innovation Showcase Portal
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
            Where Ideas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
              Change the World
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Discover groundbreaking innovations, inspiring startups, and transformative research from the State University of Zanzibar's thriving innovation ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-16">
            <Link
              to="/showcase/innovations"
              className="px-8 py-4 bg-white text-[#0098c8] rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <Lightbulb size={18} /> Explore Innovations
            </Link>
            <Link
              to="/showcase/startups"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur"
            >
              <Rocket size={18} /> Discover Startups
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={SHOWCASE_STATS.innovations} label="Innovations" />
            <StatCounter end={SHOWCASE_STATS.startups} label="Startups" />
            <StatCounter end={SHOWCASE_STATS.researchers} label="Researchers" />
            <StatCounter end={SHOWCASE_STATS.fundingRaised} label="Funding Raised" prefix="$" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Quick Nav ───────────────────────────────────────── */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-[#0098c8] hover:bg-[#0098c8]/10 rounded-xl whitespace-nowrap transition-colors"
            >
              <Icon size={14} /> {label}
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* ── Featured Innovations ─────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-[#0098c8] uppercase tracking-widest mb-1">🔬 Featured</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Innovation Gallery</h2>
            </div>
            <Link to="/showcase/innovations" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((inn, i) => <InnovationCard key={inn.id} innovation={inn} index={i} />)}
          </div>
        </section>

        {/* ── Featured Startups ────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">🚀 Startups</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Startup Showcase</h2>
            </div>
            <Link to="/showcase/startups" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStartups.map((s, i) => <StartupCard key={s.id} startup={s} index={i} />)}
          </div>
        </section>

        {/* ── Success Stories ──────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-purple-500 uppercase tracking-widest mb-1">✨ Inspiring</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Success Stories</h2>
            </div>
            <Link to="/showcase/success-stories" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
          </div>
        </section>

        {/* ── Awards ───────────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">🏆 Recognition</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Awards & Recognition</h2>
            </div>
            <Link to="/showcase/awards" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topAwards.map((a, i) => <AwardCard key={a.id} award={a} index={i} />)}
          </div>
        </section>

        {/* ── Events ───────────────────────────────────────── */}
        {upcomingEvents.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">📅 Upcoming</p>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Events</h2>
              </div>
              <Link to="/showcase/events" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </section>
        )}

        {/* ── Partners ─────────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">🤝 Partners</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Our Partners</h2>
            </div>
            <Link to="/showcase/partners" className="flex items-center gap-1 text-sm font-bold text-[#0098c8] hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08 }}
                className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
              >
                <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 text-center leading-tight line-clamp-2">{p.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0098c8] to-[#005f8a] rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Innovate?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Join SUZA's Innovation Management System and turn your idea into the next big thing. Open to students, researchers, and faculty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/login" className="px-8 py-4 bg-white text-[#0098c8] rounded-2xl font-black text-sm shadow-xl hover:-translate-y-1 transition-all">
                  Get Started Today
                </Link>
                <Link to="/showcase/innovations" className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">
                  Browse Innovations
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
