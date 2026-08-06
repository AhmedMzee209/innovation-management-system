import { useState } from 'react';
import { MOCK_JUDGES, MOCK_COMPETITIONS } from '@/data/mockCompetitions';
import { MOCK_USERS } from '@/data/mockUsers';
import { Search, Filter, UserCheck, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper<typeof MOCK_JUDGES[0]>();

const columns = [
  columnHelper.display({
    id: 'judge',
    header: 'Judge Profile',
    cell: info => {
      const user = MOCK_USERS.find(u => u.id === info.row.original.userId);
      if (!user) return null;
      return (
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          )}
          <div>
            <span className="font-bold text-gray-900 dark:text-white block">{user.firstName} {user.lastName}</span>
            <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
          </div>
        </div>
      );
    }
  }),
  columnHelper.accessor('expertise', {
    header: 'Expertise',
    cell: info => (
      <div className="flex flex-wrap gap-1">
        {info.getValue().map(exp => (
          <span key={exp} className="px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded text-[10px] font-bold uppercase">
            {exp}
          </span>
        ))}
      </div>
    )
  }),
  columnHelper.display({
    id: 'competition',
    header: 'Assigned Competition',
    cell: info => {
      const comp = MOCK_COMPETITIONS.find(c => c.id === info.row.original.competitionId);
      return (
        <div>
          <span className="font-medium text-gray-900 dark:text-gray-300 block text-sm" title={comp?.name}>{comp?.code}</span>
        </div>
      );
    }
  }),
  columnHelper.accessor('assignedSessions', {
    header: 'Sessions',
    cell: info => <span className="font-bold text-gray-900 dark:text-white">{info.getValue().length}</span>
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <button className="p-1.5 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
        <ArrowRight size={18} />
      </button>
    )
  })
];

export const CompetitionJudges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'judge', desc: false }]);

  const filteredData = MOCK_JUDGES.filter(j => {
    const user = MOCK_USERS.find(u => u.id === j.userId);
    const fullName = user ? `${user.firstName} ${user.lastName}`.toLowerCase() : '';
    return fullName.includes(searchQuery.toLowerCase());
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
            <UserCheck className="mr-3 text-[#0098c8]" size={28} />
            Competition Judges
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage judging panels and their pitch session assignments.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by judge name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide shrink-0">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Filter size={16} className="mr-2 text-gray-400" /> Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
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
                    <UserCheck size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">No judges found</p>
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
