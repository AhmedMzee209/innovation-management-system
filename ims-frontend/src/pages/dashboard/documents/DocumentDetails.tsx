import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_DOCUMENTS } from '@/data/mockDocuments';
import { MOCK_USERS } from '@/data/mockUsers';
import { ArrowLeft, FileText, Download, Share2, MoreVertical, History, Activity, Info, FileImage, FileBarChart, FileSpreadsheet, FileVideo, FileArchive } from 'lucide-react';
import { format, parseISO } from 'date-fns';

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
    case 'jpg': return <FileImage className="text-purple-500" />;
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

export const DocumentDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'preview' | 'versions' | 'activity'>('preview');

  const document = MOCK_DOCUMENTS.find(d => d.id === id);
  const owner = MOCK_USERS.find(u => u.id === document?.ownerId);

  if (!document || !owner) {
    return <div className="p-8 text-center text-gray-500">Document not found</div>;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <Link to="/dashboard/documents/library" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Library
          </Link>
          <div className="flex items-center">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl mr-4 shadow-sm border border-gray-100 dark:border-gray-700">
              {getFileIcon(document.fileType)}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-1 line-clamp-1">{document.name}</h1>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                <span className="flex items-center">
                  <img src={owner.avatarUrl || `https://ui-avatars.com/api/?name=${owner.firstName}+${owner.lastName}`} alt="owner" className="w-5 h-5 rounded-full mr-2" />
                  {owner.firstName} {owner.lastName}
                </span>
                <span>•</span>
                <span>{format(new Date(document.lastModified), 'MMM d, yyyy')}</span>
                <span>•</span>
                <span>{formatSize(document.size)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            <Share2 size={18} />
          </button>
          <button className="px-4 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
            <Download size={18} className="mr-2" /> Download
          </button>
          <button className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            <div className="flex border-b border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'preview' ? 'border-[#0098c8] text-[#0098c8]' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <FileText size={16} className="mr-2" /> Preview
              </button>
              <button 
                onClick={() => setActiveTab('versions')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'versions' ? 'border-[#0098c8] text-[#0098c8]' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <History size={16} className="mr-2" /> Versions ({document.versions.length})
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'activity' ? 'border-[#0098c8] text-[#0098c8]' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <Activity size={16} className="mr-2" /> Activity
              </button>
            </div>

            <div className="flex-1 bg-gray-50/50 dark:bg-gray-900/50 p-6">
              
              {activeTab === 'preview' && (
                <div className="w-full h-full min-h-[500px] border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-col shadow-inner">
                  {document.fileType === 'png' || document.fileType === 'jpg' ? (
                    <img src={document.versions[0].url} alt={document.name} className="max-w-full max-h-full object-contain p-4 rounded-xl" />
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                        {getFileIcon(document.fileType)}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Preview Not Available</h3>
                      <p className="text-gray-500 text-sm max-w-md mx-auto">
                        This file format ({document.fileType.toUpperCase()}) cannot be previewed directly in the browser. Please download the file to view its contents.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'versions' && (
                <div className="space-y-4">
                  {document.versions.map((version, idx) => {
                    const vOwner = MOCK_USERS.find(u => u.id === version.uploadedBy);
                    return (
                      <div key={version.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] text-xs font-black uppercase rounded">
                              v{version.version}
                            </span>
                            {idx === 0 && <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Current</span>}
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">"{version.notes}"</p>
                          <p className="text-xs text-gray-500">
                            Uploaded by {vOwner?.firstName} {vOwner?.lastName} on {format(parseISO(version.uploadedAt), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Restore
                          </button>
                          <button className="px-3 py-1.5 bg-[#0098c8] text-white rounded-lg text-xs font-bold hover:bg-[#007ba1] transition-colors">
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent pt-4">
                  {document.activity.map(act => {
                    const aOwner = MOCK_USERS.find(u => u.id === act.userId);
                    return (
                      <div key={act.id} className="relative flex items-start gap-4 group">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white dark:bg-gray-900 shrink-0 border-[#0098c8] text-[#0098c8] z-10 shadow-sm mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#0098c8]"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            <span className="font-bold">{aOwner?.firstName} {aOwner?.lastName}</span> {act.action.toLowerCase()} this document
                          </p>
                          {act.details && <p className="text-xs text-gray-500 mt-0.5">"{act.details}"</p>}
                          <time className="text-xs text-gray-400 mt-1 block">
                            {format(parseISO(act.timestamp), 'MMM d, yyyy h:mm a')}
                          </time>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Sidebar metadata */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center mb-4 uppercase tracking-wider">
              <Info size={16} className="mr-2 text-[#0098c8]" /> Info
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Module</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{document.module}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Category</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{document.category}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Status</p>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  document.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                  document.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                  document.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {document.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{document.description}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Tags</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {document.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
