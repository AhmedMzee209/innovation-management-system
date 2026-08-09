import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setActiveCategory } from '@/store/slices/showcaseSlice';
import type { ShowcaseCategory } from '@/data/mockShowcase';

const CATEGORIES: (ShowcaseCategory | 'All')[] = [
  'All', 'AgriTech', 'EduTech', 'FinTech', 'HealthTech',
  'GreenTech', 'AI & ML', 'IoT', 'Blockchain', 'CleanEnergy', 'MobileTech',
];

const COLORS: Record<string, string> = {
  'All': 'bg-gray-900 text-white border-gray-900',
  'AgriTech': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
  'EduTech': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  'FinTech': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
  'HealthTech': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300',
  'GreenTech': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
  'AI & ML': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  'IoT': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300',
  'Blockchain': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
  'CleanEnergy': 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300',
  'MobileTech': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300',
};

interface CategoryFilterProps {
  inverted?: boolean;
}

export const CategoryFilter = ({ inverted = false }: CategoryFilterProps) => {
  const dispatch = useDispatch();
  const active = useSelector((s: RootState) => s.showcase.activeCategory);

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => dispatch(setActiveCategory(cat))}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            active === cat
              ? inverted
                ? 'bg-white text-gray-900 border-white shadow-lg scale-105'
                : 'bg-[#0098c8] text-white border-[#0098c8] shadow-lg scale-105'
              : inverted
                ? 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                : `${COLORS[cat] ?? 'bg-gray-100 text-gray-700 border-gray-200'} hover:scale-105`
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export { COLORS as CATEGORY_COLORS };
