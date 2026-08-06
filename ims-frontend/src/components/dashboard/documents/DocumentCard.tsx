import { FileText, Image, FileImage, FileBarChart, FileSpreadsheet, FileVideo, MoreVertical, FileArchive, CheckCircle2 } from 'lucide-react';
import { Document } from '@/data/mockDocuments';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDocumentSelection } from '@/store/slices/documentSlice';
import { RootState } from '@/store';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf': return <FileText className="text-red-500" />;
    case 'doc':
    case 'docx': return <FileText className="text-blue-600" />;
    case 'xls':
    case 'xlsx': return <FileSpreadsheet className="text-emerald-600" />;
    case 'ppt':
    case 'pptx': return <FileBarChart className="text-amber-500" />;
    case 'png':
    case 'jpg': return <Image className="text-purple-500" />;
    case 'mp4': return <FileVideo className="text-pink-500" />;
    case 'zip': return <FileArchive className="text-gray-500" />;
    default: return <FileText className="text-gray-500" />;
  }
};

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const DocumentCard = ({ document }: { document: Document }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSelected = useSelector((state: RootState) => state.document.selectedDocumentIds.includes(document.id));

  return (
    <div 
      className={`bg-white dark:bg-gray-900 border ${isSelected ? 'border-[#0098c8] ring-1 ring-[#0098c8]' : 'border-gray-200 dark:border-gray-800'} rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group select-none relative`}
    >
      <div 
        className="absolute inset-0 z-0" 
        onClick={() => dispatch(toggleDocumentSelection(document.id))}
        onDoubleClick={() => navigate(`/dashboard/documents/${document.id}/preview`)}
      />
      
      <div className="relative z-10 flex items-start justify-between mb-4 pointer-events-none">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          {getFileIcon(document.fileType)}
        </div>
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {isSelected && (
            <div className="text-[#0098c8]"><CheckCircle2 size={18} className="fill-blue-50" /></div>
          )}
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <div className="relative z-10 pointer-events-none">
        <h3 className="font-bold text-gray-900 dark:text-white truncate mb-1 group-hover:text-[#0098c8] transition-colors">{document.name}</h3>
        <div className="flex items-center justify-between text-xs font-medium text-gray-500">
          <span>{format(new Date(document.lastModified), 'MMM d, yyyy')}</span>
          <span>{formatSize(document.size)}</span>
        </div>
      </div>
    </div>
  );
};
