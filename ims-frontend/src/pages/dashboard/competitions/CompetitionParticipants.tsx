import { useState } from 'react';
import { MOCK_PARTICIPANTS, MOCK_COMPETITIONS, ParticipantStatus } from '@/data/mockCompetitions';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { Search, Filter, Users, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<typeof MOCK_PARTICIPANTS[0]>();

const columns = [
  columnHelper.display({
    id: 'startup',
    header: 'Startup / Team',
    cell: info => {
      const startup = MOCK_STARTUPS.find(s => s.id === info.row.original.startupId);
      if (!startup) return null;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#0098c8] to-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {startup.name.charAt(0)}
          </div>
          <div>
            <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-[#0098c8] hover:underline block">
              {startup.name}
            </Link>
            <div className="text-xs text-gray-500 mt-0.5">{startup.industry} • {startup.stage}</div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.display({
    id: 'competition',
    header: 'Competition',
    cell: info => {
      const comp = MOCK_COMPETITIONS.find(c => c.id === info.row.original.competitionId);
      return (
        <div>
          <span className="font-medium text-gray-900 dark:text-gray-300 block text-sm" title={comp?.name}>{comp?.code}</span>
        </div>
      );
    }
  }),
  columnHelper.accessor('registrationDate', {
    header: 'Registered On',
    cell: info => <span className="text-sm text-gray-700 dark:text-gray-300">{format(parseISO(info.getValue()), 'MMM d, yyyy')}</span>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      let color = 'bg-gray-100 text-gray-600';
      if (status === 'Approved') color = 'bg-emerald-100 text-emerald-700';
      if (status === 'Rejected') color = 'bg-red-100 text-red-700';
      if (status === 'Pending') color = 'bg-amber-100 text-amber-700';
      
      return (
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold uppercase", color)}>
          {status}
        </span>
      );
    }
  }),
  columnHelper.accessor('finalScore', {
    header: 'Score',
    cell: info => {
      const score = info.getValue();
      if (!score) return <span className="text-gray-400">-</span>;
      return <span className="font-black text-gray-900 dark:text-white">{score}</span>;
    }
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <div className="flex gap-2">
        {info.row.original.status === 'Pending' && (
          <>
            <button className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded transition-colors"><CheckCircle2 size={16} /></button>
            <button className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"><XCircle size={16} /></button>
          </>
        )}
      </div>
    )
  })
];

export const CompetitionParticipants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ParticipantStatus | 'All'>('All');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'registrationDate', desc: true }]);

  const filteredData = MOCK_PARTICIPANTS.filter(p => {
    const startup = MOCK_STARTUPS.find(s => s.id === p.startupId);
    
    const matchesSearch = startup?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;

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
            <Users className="mr-3 text-[#0098c8]" size={28} />
            Competition Participants
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review registrations, manage teams, and view performance scores.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by startup name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
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
                  <td colSpan={columns.length} className="p-12 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">No participants found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredData.length}</span> records
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
