import { InnovationCategory } from '@/data/mockInnovations';
import { BrainCircuit, Waves, Leaf, HeartPulse, GraduationCap, Briefcase, Palmtree, TreePine, Laptop, Wrench, Microscope, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const IconMap: Record<string, any> = {
  BrainCircuit, Waves, Leaf, HeartPulse, GraduationCap, Briefcase, Palmtree, TreePine, Laptop, Wrench, Microscope
};

interface CategoryCardProps {
  category: { id: string; icon: string; desc: string };
  count: number;
}

export const CategoryCard = ({ category, count }: CategoryCardProps) => {
  const Icon = IconMap[category.icon] || Lightbulb;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col group h-full relative overflow-hidden">
      
      {/* Decorative Background Icon */}
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-gray-900 dark:text-white pointer-events-none group-hover:scale-110 transition-transform duration-500">
        <Icon size={140} />
      </div>

      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 text-[#0098c8] flex items-center justify-center mb-5 group-hover:bg-[#0098c8] group-hover:text-white transition-colors shadow-sm">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
        {category.id}
      </h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 pr-6">
        {category.desc}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
        <div>
          <span className="text-2xl font-black text-gray-900 dark:text-white">{count}</span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-2">Innovations</span>
        </div>
        
        <Link 
          to={`/dashboard/innovations?category=${encodeURIComponent(category.id)}`}
          className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-[#0098c8] group-hover:text-white transition-colors"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
