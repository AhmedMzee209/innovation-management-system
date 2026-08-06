import { useState } from 'react';
import { MOCK_FUNDING_PROGRAMS, FundingProgramStatus, FundingType } from '@/data/mockFunding';
import { ProgramStatusBadge } from '@/components/dashboard/funding/cards/FundingStatusBadge';
import { Search, Filter, Banknote, Plus, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<typeof MOCK_FUNDING_PROGRAMS[0]>();

const columns = [
  columnHelper.accessor('code', {
    header: 'Program Code',
    cell: info => <span className="font-bold text-gray-500 text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor('name', {
    header: 'Program Name',
    cell: info => (
      <div>
        <Link to={`/dashboard/funding/programs/${info.row.original.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline">
          {info.getValue()}
        </Link>
        <div className="text-xs text-gray-500 mt-1">{info.row.original.type} • {info.row.original.category}</div>
      </div>
    ),
  }),
  columnHelper.accessor('totalBudget', {
    header: 'Total Budget',
    cell: info => (
      <span className="font-bold text-gray-900 dark:text-white">${info.getValue().toLocaleString()}</span>
    )
  }),
  columnHelper.accessor('availableBudget', {
    header: 'Available',
    cell: info => {
      const percentage = (info.getValue() / info.row.original.totalBudget) * 100;
      return (
        <div className="w-full min-w-[120px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-emerald-600">${info.getValue().toLocaleString()}</span>
            <span className="text-gray-500">{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('endDate', {
    header: 'Deadline',
    cell: info => <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{format(parseISO(info.getValue()), 'MMM d, yyyy')}</span>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <ProgramStatusBadge status={info.getValue()} />
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <div className="flex items-center gap-2">
        <Link 
          to={`/dashboard/funding/apply?programId=${info.row.original.id}`}
          className={cn(
            "text-xs font-bold px-3 py-1.5 rounded transition-colors border",
            info.row.original.status === 'Active' 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900" 
              : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700"
          )}
          onClick={(e) => info.row.original.status !== 'Active' && e.preventDefault()}
        >
          Apply
        </Link>
        <Link 
          to={`/dashboard/funding/programs/${info.row.original.id}`}
          className="p-1.5 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  })
];

export const FundingPrograms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FundingProgramStatus | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<FundingType | 'All'>('All');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'endDate', desc: true }]);

  const filteredData = MOCK_FUNDING_PROGRAMS.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : program.status === statusFilter;
    const matchesType = typeFilter === 'All' ? true : program.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
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
            <Banknote className="mr-3 text-emerald-600" size={28} />
            Funding Programs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse and manage available grants, seed funds, and investment vehicles.</p>
        </div>
        <Link to="/dashboard/funding/programs/new" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> New Program
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by program name or code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm min-w-[150px]"
          >
            <option value="All">All Types</option>
            <option value="Grant">Grant</option>
            <option value="Equity">Equity</option>
            <option value="Convertible Note">Convertible Note</option>
          </select>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {['All', 'Active', 'Upcoming', 'Closed'].map(status => (
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
            <Filter size={16} className="mr-2 text-gray-400" /> More
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
                  <td colSpan={columns.length} className="p-12 text-center text-gray-500">
                    <Banknote size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">No programs found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredData.length}</span> programs
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
