import { useState } from 'react';
import { MOCK_DISBURSEMENTS, DisbursementStatus } from '@/data/mockFunding';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { MOCK_APPLICATIONS } from '@/data/mockFunding';
import { DisbursementStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';
import { Search, Filter, AlertCircle, ArrowRight, ChevronDown, ChevronUp, History } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<typeof MOCK_DISBURSEMENTS[0]>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Disbursement ID',
    cell: info => <span className="font-bold text-gray-500 text-xs uppercase">{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: 'startup',
    header: 'Startup / App',
    cell: info => {
      const startup = MOCK_STARTUPS.find(s => s.id === info.row.original.startupId);
      const app = MOCK_APPLICATIONS.find(a => a.id === info.row.original.applicationId);
      if (!startup || !app) return null;
      return (
        <div>
          <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-[#0098c8] hover:underline block mb-0.5">
            {startup.name}
          </Link>
          <Link to={`/dashboard/funding/applications/${app.id}`} className="text-xs text-gray-500 hover:underline">
            {app.applicationNumber}
          </Link>
        </div>
      );
    }
  }),
  columnHelper.accessor('totalAmount', {
    header: 'Total Approved',
    cell: info => <span className="font-bold text-gray-900 dark:text-white">${info.getValue().toLocaleString()}</span>
  }),
  columnHelper.accessor('amountDisbursed', {
    header: 'Disbursed',
    cell: info => {
      const percentage = (info.getValue() / info.row.original.totalAmount) * 100;
      return (
        <div className="w-full min-w-[120px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-emerald-600">${info.getValue().toLocaleString()}</span>
            <span className="text-gray-500">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
            <div className="bg-[#0098c8] h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('nextInstallmentDate', {
    header: 'Next Installment',
    cell: info => {
      const date = info.getValue();
      const amount = info.row.original.nextInstallmentAmount;
      if (!date || !amount) return <span className="text-gray-400 text-sm">Fully Disbursed</span>;
      
      return (
        <div>
          <div className="font-bold text-gray-900 dark:text-white">${amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-0.5">Due {format(parseISO(date), 'MMM d, yyyy')}</div>
        </div>
      );
    }
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <DisbursementStatusBadge status={info.getValue()} />
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <Link 
        to={`/dashboard/funding/disbursements/${info.row.original.id}`}
        className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
      >
        <ArrowRight size={18} />
      </Link>
    )
  })
];

export const FundingDisbursements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DisbursementStatus | 'All'>('All');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'id', desc: true }]);

  const filteredData = MOCK_DISBURSEMENTS.filter(disb => {
    const startup = MOCK_STARTUPS.find(s => s.id === disb.startupId);
    
    const matchesSearch = disb.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (startup?.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' ? true : disb.status === statusFilter;

    return matchesSearch && matchesStatus;
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
            <History className="mr-3 text-[#0098c8]" size={28} />
            Disbursement Ledger
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track approved funding, released tranches, and upcoming payment schedules.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by startup name or disbursement ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {['All', 'Processing', 'Completed'].map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap",
                  statusFilter === status 
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                {status}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Filter size={16} className="mr-2 text-gray-400" /> Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={header.column.getToggleSortingHandler()}>
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp size={14} className="ml-1" />,
                          desc: <ChevronDown size={14} className="ml-1" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
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
                  <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                    No disbursements found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredData.length}</span> ledgers
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
