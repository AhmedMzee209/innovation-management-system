import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UploadZone } from '@/components/dashboard/documents/UploadZone';
import { FileText, CheckCircle2, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UploadDocuments = () => {
  const { items } = useSelector((state: RootState) => state.upload);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="mb-8">
        <Link to="/dashboard/documents/library" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center transition-colors mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Library
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          Upload Documents
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload multiple files securely into the system.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <UploadZone />
      </div>

      {items.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upload Queue</h3>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                <FileText size={24} className="text-[#0098c8] mr-4 shrink-0" />
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate mb-1">{item.file.name}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        item.status === 'completed' ? 'bg-emerald-500' :
                        item.status === 'error' ? 'bg-red-500' : 'bg-[#0098c8]'
                      }`} 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="shrink-0 flex items-center">
                  {item.status === 'completed' && <CheckCircle2 className="text-emerald-500" size={20} />}
                  {item.status === 'error' && <XCircle className="text-red-500" size={20} />}
                  {item.status === 'uploading' && <span className="text-xs font-bold text-[#0098c8]">{item.progress}%</span>}
                  {item.status === 'pending' && <Clock className="text-gray-400" size={20} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
