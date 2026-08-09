import { FileText, Download, Clock, Star, Plus } from 'lucide-react';
import { MOCK_REPORTS } from '@/data/mockAnalytics';
import { format } from 'date-fns';

export const ReportsCenter = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <FileText className="mr-3 text-red-500" size={28} />
            Reports Center
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Generate, schedule, and download automated system reports.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
          <Plus size={16} className="mr-2" /> Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Clock className="mr-2 text-[#0098c8]" size={20} /> Recent Reports
          </h3>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
            {MOCK_REPORTS.map(report => (
              <div key={report.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    report.type === 'PDF' ? 'bg-red-50 text-red-500' : 
                    report.type === 'Excel' ? 'bg-emerald-50 text-emerald-500' : 
                    'bg-blue-50 text-blue-500'
                  }`}>
                    {report.type}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0098c8] transition-colors">{report.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Generated {format(new Date(report.generatedAt), 'MMM d, yyyy h:mm a')} by {report.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
                    <Star size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Star className="mr-2 text-amber-500" size={20} /> Saved Templates
          </h3>
          <div className="space-y-3">
            {[
              'Monthly Innovation Summary',
              'Quarterly Financial Review',
              'School Performance Matrix',
              'Startup Cohort Demographics'
            ].map((tpl, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:border-[#0098c8] transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#0098c8]">{tpl}</h4>
                  <FileText size={16} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Scheduled: 1st of every month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
