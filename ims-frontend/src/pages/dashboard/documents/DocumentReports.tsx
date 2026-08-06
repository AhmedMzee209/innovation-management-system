import { FileText, Download, Building, Users } from 'lucide-react';
import { MOCK_DOCUMENTS, STORAGE_STATS } from '@/data/mockDocuments';

export const DocumentReports = () => {
  const totalDocs = MOCK_DOCUMENTS.length;
  const approvedDocs = MOCK_DOCUMENTS.filter(d => d.status === 'Approved').length;
  
  const formatSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <FileText className="mr-3 text-purple-600" size={28} />
            Document Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate and view detailed reports on file usage and storage.</p>
        </div>
        <button className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] flex items-center transition-colors">
          <Download size={16} className="mr-2" /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl p-8 text-white shadow-sm flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-6 opacity-90">System Overview</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Total Files</p>
              <p className="text-4xl font-black">{totalDocs}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Approved Files</p>
              <p className="text-4xl font-black">{approvedDocs}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-1 font-medium">Total Storage Used</p>
              <p className="text-4xl font-black">{formatSize(STORAGE_STATS.used)}</p>
            </div>
          </div>
        </div>

        {/* Top Active Documents */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Building size={18} className="mr-2 text-emerald-500" /> Most Downloaded Files
          </h3>
          <div className="space-y-4">
            {MOCK_DOCUMENTS.sort((a, b) => b.downloads - a.downloads).slice(0, 5).map((doc, i) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-1">{doc.name}</h4>
                    <p className="text-xs text-gray-500">{doc.category} • {doc.module}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-[#0098c8] text-lg">{doc.downloads}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Downloads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
