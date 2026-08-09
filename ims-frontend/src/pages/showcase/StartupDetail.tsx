import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, Calendar, Globe, Target, Heart, ExternalLink } from 'lucide-react';
import { SHOWCASE_STARTUPS, SHOWCASE_INNOVATIONS } from '@/data/mockShowcase';

export const StartupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const startup = SHOWCASE_STARTUPS.find(s => s.id === id) ?? SHOWCASE_STARTUPS[0];
  const relatedInnovation = SHOWCASE_INNOVATIONS.find(i => i.school === startup.school);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src={startup.coverImage} alt={startup.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="absolute top-6 left-6">
          <Link to="/showcase/startups" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold bg-black/20 backdrop-blur rounded-xl px-3 py-2">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-10 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img src={startup.logo} alt={startup.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">{startup.name}</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-sm font-bold rounded-full">{startup.stage}</span>
                <span className="px-3 py-1 bg-[#0098c8]/10 text-[#0098c8] text-sm font-bold rounded-full">{startup.industry}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{startup.tagline}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-500"><Calendar size={16} className="text-[#0098c8]" /> Founded {startup.founded}</div>
                <div className="flex items-center gap-2 text-gray-500"><Users size={16} className="text-purple-500" /> {startup.teamSize} team members</div>
                {startup.fundingReceived > 0 && <div className="flex items-center gap-2 text-emerald-600 font-bold"><TrendingUp size={16} /> ${(startup.fundingReceived / 1000).toFixed(0)}K raised</div>}
              </div>
            </div>
            <a href={startup.website} onClick={e => e.preventDefault()} className="flex items-center gap-2 px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold hover:bg-[#007ba1] transition-colors flex-shrink-0">
              <Globe size={16} /> Visit Website
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[
              { title: 'About Us', content: startup.description },
              { title: 'Our Mission', content: `At ${startup.name}, we are on a mission to leverage cutting-edge technology to solve real-world problems in East Africa, starting with Zanzibar. We believe technology should be accessible, affordable, and impactful for every community.` },
              { title: 'Our Vision', content: `To become East Africa's leading ${startup.industry.toLowerCase()} startup, empowering millions with innovative digital solutions by 2030.` },
            ].map(({ title, content }) => (
              <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  {title === 'Our Mission' ? <Target size={18} className="text-[#0098c8]" /> : title === 'Our Vision' ? <Heart size={18} className="text-red-400" /> : <ExternalLink size={18} className="text-[#0098c8]" />}
                  {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="font-black text-gray-900 dark:text-white mb-4">Achievements</h2>
              <div className="space-y-3">
                {startup.achievements.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0098c8] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-black">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="font-black text-gray-900 dark:text-white mb-4 text-sm">Founder</h3>
              <div className="flex items-center gap-3">
                <img src={startup.founderAvatar} alt={startup.founder} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{startup.founder}</p>
                  <p className="text-xs text-gray-500">Co-Founder & CEO</p>
                  <p className="text-xs text-gray-400">{startup.school.split('(')[1]?.replace(')', '') ?? startup.school}</p>
                </div>
              </div>
            </div>

            {relatedInnovation && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="font-black text-gray-900 dark:text-white mb-3 text-sm">From Same School</h3>
                <Link to={`/showcase/innovations/${relatedInnovation.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl p-3 transition-colors">
                  <img src={relatedInnovation.coverImage} alt={relatedInnovation.title} className="w-full h-24 object-cover rounded-xl mb-2" />
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 line-clamp-2">{relatedInnovation.title}</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
