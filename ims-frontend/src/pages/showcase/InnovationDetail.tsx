import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Eye, Users, Calendar, ChevronRight, Tag, Building2, Lightbulb } from 'lucide-react';
import { SHOWCASE_INNOVATIONS } from '@/data/mockShowcase';
import { InnovationCard } from '@/components/showcase/InnovationCard';

export const InnovationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const innovation = SHOWCASE_INNOVATIONS.find(i => i.id === id) ?? SHOWCASE_INNOVATIONS[0];
  const related = SHOWCASE_INNOVATIONS.filter(i => i.category === innovation.category && i.id !== innovation.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={innovation.coverImage} alt={innovation.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link to="/showcase/innovations" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold bg-black/20 backdrop-blur rounded-xl px-3 py-2 transition-colors">
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block px-3 py-1 bg-[#0098c8] text-white text-xs font-bold rounded-lg mb-3">{innovation.category}</span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2">{innovation.title}</h1>
          <p className="text-white/70 text-sm">{innovation.tagline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500"><Heart size={16} className="text-red-400" /> {innovation.likes} likes</div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Eye size={16} className="text-[#0098c8]" /> {innovation.views} views</div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Users size={16} className="text-purple-500" /> Team of {innovation.teamSize}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500"><Calendar size={16} className="text-emerald-500" /> {innovation.year}</div>
            </div>

            {[
              { title: 'Innovation Overview', content: innovation.description },
              { title: 'Problem Statement', content: 'Access to affordable, reliable, and scalable technology solutions remains a key challenge in Zanzibar. Traditional approaches have failed to leverage modern digital tools, resulting in inefficiencies, waste, and missed opportunities for the community.' },
              { title: 'Our Solution', content: `${innovation.title} addresses these challenges through an innovative ${innovation.tech.join(', ')}-powered platform that empowers communities with data-driven insights, automation, and seamless digital connectivity.` },
            ].map(({ title, content }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Lightbulb size={18} className="text-[#0098c8]" /> {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{content}</p>
              </motion.div>
            ))}

            {/* Tech stack */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {innovation.tech.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-[#0098c8]/10 text-[#0098c8] text-xs font-bold rounded-lg flex items-center gap-1">
                    <Tag size={12} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-black text-gray-900 dark:text-white mb-4">Lead Innovator</h3>
              <div className="flex items-center gap-3">
                <img src={innovation.teamLeadAvatar} alt={innovation.teamLead} className="w-12 h-12 rounded-xl object-cover border-2 border-[#0098c8]/30" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{innovation.teamLead}</p>
                  <p className="text-xs text-gray-500">Team Lead · {innovation.teamSize} members</p>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
              <h3 className="text-sm font-black text-gray-900 dark:text-white">Details</h3>
              {[
                { icon: Building2, label: 'School', value: innovation.school },
                { icon: Lightbulb, label: 'Stage', value: innovation.stage },
                { icon: Tag, label: 'Category', value: innovation.category },
                { icon: Calendar, label: 'Year', value: String(innovation.year) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={16} className="text-[#0098c8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-black text-gray-900 dark:text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {innovation.tags.map(t => <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-lg">#{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Related Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((inn, i) => <InnovationCard key={inn.id} innovation={inn} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
