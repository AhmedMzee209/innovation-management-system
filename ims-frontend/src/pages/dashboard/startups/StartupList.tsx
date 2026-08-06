import { useState } from 'react';
import { MOCK_STARTUPS, Startup } from '@/data/mockStartups';
import { MOCK_USERS } from '@/data/mockUsers';
import { StageBadge, FundingBadge, IncubationBadge } from '@/components/dashboard/startups/cards/StartupStatusBadge';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, Filter, ChevronDown, ChevronUp, ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';

const columnHelper = createColumnHelper<Startup>();

const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
    cell: info => <span className="font-mono text-xs font-bold text-gray-500">{info.getValue()}</span>,
  }),
  columnHelper.accessor('name', {
    header: 'Startup',
    cell: info => (
      <div>
        <Link to={`/dashboard/startups/${info.row.original.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline">
          {info.getValue()}
        </Link>
        <span className="block text-xs text-gray-500 line-clamp-1 max-w-[200px]">{info.row.original.industry}</span>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'founder',
    header: 'Founder',
    cell: info => {
      const founderInfo = info.row.original.team.find(t => t.role === 'Founder');
      const user = founderInfo ? MOCK_USERS[founderInfo.userId] : null;
      if (!user) return <span className="text-gray-400 text-xs">-</span>;
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar firstName={user.firstName} lastName={user.lastName} size="sm" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.firstName} {user.lastName}</span>
        </div>
      );
    }
  }),
  columnHelper.accessor('stage', {
    header: 'Stage',
    cell: info => <StageBadge stage={info.getValue()} />,
  }),
  columnHelper.accessor('incubationStatus', {
    header: 'Incubation',
    cell: info => <IncubationBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('fundingStatus', {
    header: 'Funding',
    cell: info => <FundingBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('foundedDate', {
    header: 'Created Date',
    cell: info => <span className="text-sm text-gray-500">{format(parseISO(info.getValue()), 'MMM d, yyyy')}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <Link 
        to={`/dashboard/startups/${info.row.original.id}`}
        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        <ArrowRight size={18} />
      </Link>
    )
  })
];

export const StartupList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const filteredData = MOCK_STARTUPS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Startup Directory</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all spin-offs and university-backed ventures.</p>
        </div>
        <Link to="/dashboard/startups/new" className="px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm flex items-center">
          <Building2 size={16} className="mr-2" /> Convert Innovation
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search startups by name or code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center w-full sm:w-auto justify-center">
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
                  <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                    No startups found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900 dark:text-white">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filteredData.length}</span> results
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
