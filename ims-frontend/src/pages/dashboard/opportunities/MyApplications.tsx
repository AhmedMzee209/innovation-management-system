import { useState } from 'react';
import { MOCK_APPLICATIONS, MOCK_OPPORTUNITIES, MOCK_PROVIDERS } from '@/data/mockOpportunities';
import { FileText, Search, Filter, Eye, ArrowRight } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const columnHelper = createColumnHelper<typeof MOCK_APPLICATIONS[0]>();

const columns = [
  columnHelper.display({
    id: 'opportunity',
    header: 'Opportunity & Provider',
    cell: info => {
      const opp = MOCK_OPPORTUNITIES.find(o => o.id === info.row.original.opportunityId);
      const provider = MOCK_PROVIDERS.find(p => p.id === opp?.providerId);
      
      return (
        <div className="flex items-center gap-3">
          <img src={provider?.logo} alt={provider?.name} className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 object-cover" />
          <div>
            <span className="font-bold text-gray-900 dark:text-white block hover:text-[#0098c8] transition-colors line-clamp-1">{opp?.title}</span>
            <div className="text-xs text-gray-500 mt-0.5">{provider?.name}</div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('appliedDate', {
    header: 'Applied Date',
    cell: info => (
      <span className="text-gray-600 dark:text-gray-400 font-medium">
        {format(parseISO(info.getValue()), 'MMM d, yyyy')}
      </span>
    )
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const val = info.getValue();
      let colorClass = 'bg-gray-100 text-gray-700';
      if (val === 'Accepted') colorClass = 'bg-emerald-100 text-emerald-700';
      if (val === 'Rejected') colorClass = 'bg-red-100 text-red-700';
      if (val === 'Interview Scheduled') colorClass = 'bg-purple-100 text-purple-700';
      if (val === 'Under Review') colorClass = 'bg-blue-100 text-blue-700';

      return (
        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${colorClass}`}>
          {val}
        </span>
      );
    }
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <Link to={`/dashboard/opportunities/applications/${info.row.original.id}`} className="p-1.5 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors inline-flex">
        <ArrowRight size={18} />
      </Link>
    )
  })
];

export const MyApplications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'appliedDate', desc: true }]);

  const filteredData = MOCK_APPLICATIONS.filter(app => {
    const opp = MOCK_OPPORTUNITIES.find(o => o.id === app.opportunityId);
    return opp?.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <FileText className="mr-3 text-purple-600" size={28} />
            My Applications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track the status of your submitted applications.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by opportunity title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="p-12 text-center text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">No applications found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="flex space-x-2 ml-auto">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium disabled:opacity-50">Previous</button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
