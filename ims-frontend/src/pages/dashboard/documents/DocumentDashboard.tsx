import { Folder, FileText, HardDrive, Clock, CheckCircle2, CloudLightning } from 'lucide-react';
import { MOCK_DOCUMENTS, MOCK_FOLDERS, STORAGE_STATS } from '@/data/mockDocuments';
import { Link } from 'react-router-dom';
import { DocumentCard } from '@/components/dashboard/documents/DocumentCard';
import { format } from 'date-fns';

export const DocumentDashboard = () => {
  const recentDocs = [...MOCK_DOCUMENTS].sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()).slice(0, 4);
  const pendingDocs = MOCK_DOCUMENTS.filter(d => d.status === 'Pending Approval').slice(0, 5);

  const storagePercentage = (STORAGE_STATS.used / STORAGE_STATS.total) * 100;
  
  const formatSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <CloudLightning className="mr-3 text-[#0098c8]" size={28} />
            Document Workspace
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage, share, and collaborate on your enterprise files.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/documents/upload" className="px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
            Upload Files
          </Link>
        </div>
      </div>

      {/* Topline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Storage Meter */}
        <div className="bg-gradient-to-br from-[#0098c8] to-blue-800 rounded-2xl p-5 shadow-sm text-white col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <HardDrive size={24} className="opacity-80" />
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">Storage</span>
          </div>
          <div className="mb-2">
            <div className="w-full bg-black/20 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full" style={{ width: `${storagePercentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs font-medium opacity-90">
              <span>{formatSize(STORAGE_STATS.used)} used</span>
              <span>{formatSize(STORAGE_STATS.total)} total</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mr-4 shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Files</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{STORAGE_STATS.filesCount}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mr-4 shrink-0">
            <Folder size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Folders</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">{MOCK_FOLDERS.length}</h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 mr-4 shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Shared With Me</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {MOCK_DOCUMENTS.filter(d => d.isShared).length}
            </h2>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        
        {/* Main Content Area */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Clock size={18} className="mr-2 text-purple-500" /> Recently Modified
            </h2>
            <Link to="/dashboard/documents/library" className="text-sm text-[#0098c8] font-bold hover:underline">
              View Library
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentDocs.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center mb-6">
              <FileText size={18} className="mr-2 text-amber-500" /> Pending Approvals
            </h2>

            <div className="space-y-4 flex-1">
              {pendingDocs.map(doc => (
                <Link key={doc.id} to={`/dashboard/documents/${doc.id}`} className="block group">
                  <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-[#0098c8] transition-colors">{doc.name}</h4>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                        Pending
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {format(new Date(doc.lastModified), 'MMM d')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {pendingDocs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm font-medium">All caught up!</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
