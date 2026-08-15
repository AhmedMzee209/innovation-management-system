import { useState } from 'react';
import { DOCUMENT_CATEGORIES, MOCK_DOCUMENTS } from '@/data/mockDocuments';
import { Layers, Search, FileText, ArrowRight, Briefcase, Presentation, BookOpen, PieChart, PenTool, Award, Image, Video, File } from 'lucide-react';
import { Link } from 'react-router-dom';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileText': return <FileText size={24} />;
    case 'Briefcase': return <Briefcase size={24} />;
    case 'Presentation': return <Presentation size={24} />;
    case 'BookOpen': return <BookOpen size={24} />;
    case 'PieChart': return <PieChart size={24} />;
    case 'PenTool': return <PenTool size={24} />;
    case 'Award': return <Award size={24} />;
    case 'Image': return <Image size={24} />;
    case 'Video': return <Video size={24} />;
    default: return <File size={24} />;
  }
};

export const DocumentCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = DOCUMENT_CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <Layers className="mr-3 text-purple-600" size={28} />
            Document Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse and filter documents by their classification.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-2 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-transparent text-sm font-medium outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(category => {
          const count = MOCK_DOCUMENTS.filter(o => o.category === category.name).length;
          
          return (
            <Link 
              key={category.name} 
              to={`/dashboard/documents/library`} 
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getCategoryIcon(category.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">{category.description}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                <div className="flex items-center text-xs font-bold text-gray-500">
                  <FileText size={14} className="mr-1.5" />
                  {count} Files
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
