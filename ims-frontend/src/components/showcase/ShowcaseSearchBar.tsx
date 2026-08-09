import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/showcaseSlice';

interface ShowcaseSearchBarProps {
  placeholder?: string;
  large?: boolean;
}

export const ShowcaseSearchBar = ({ placeholder = 'Search innovations, startups, research...', large = false }: ShowcaseSearchBarProps) => {
  const dispatch = useDispatch();
  const query = useSelector((s: RootState) => s.showcase.searchQuery);

  return (
    <div className={`relative flex items-center w-full ${large ? 'max-w-2xl mx-auto' : 'max-w-lg'}`}>
      <Search className="absolute left-4 text-gray-400" size={large ? 22 : 18} />
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder={placeholder}
        className={`w-full pl-12 pr-10 bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 transition-all ${large ? 'py-4 text-base' : 'py-2.5 text-sm'}`}
      />
      {query && (
        <button
          onClick={() => dispatch(setSearchQuery(''))}
          className="absolute right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
