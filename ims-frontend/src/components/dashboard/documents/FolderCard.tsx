import { Folder, MoreVertical } from 'lucide-react';
import { DocumentFolder } from '@/data/mockDocuments';
import { useDispatch } from 'react-redux';
import { setCurrentFolder } from '@/store/slices/documentSlice';
import { format } from 'date-fns';

export const FolderCard = ({ folder }: { folder: DocumentFolder }) => {
  const dispatch = useDispatch();

  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
    emerald: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    red: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
    default: 'text-gray-500 bg-gray-50 dark:bg-gray-800'
  };

  const style = colorMap[folder.color || 'default'] || colorMap.default;

  return (
    <div 
      onDoubleClick={() => dispatch(setCurrentFolder(folder.id))}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group select-none"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${style}`}>
          <Folder size={24} className="fill-current opacity-20" />
        </div>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white truncate mb-1 group-hover:text-[#0098c8] transition-colors">{folder.name}</h3>
      <p className="text-xs font-medium text-gray-500">{format(new Date(folder.createdAt), 'MMM d, yyyy')}</p>
    </div>
  );
};
