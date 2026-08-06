import { useState } from 'react';
import { MOCK_REVIEWS, Review } from '@/data/mockReviews';
import { MOCK_INNOVATIONS } from '@/data/mockInnovations';
import { MOCK_USERS } from '@/data/mockUsers';
import { ReviewStatusBadge } from '@/components/dashboard/reviews/cards/ReviewStatusBadge';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, Filter, ChevronDown, ChevronUp, MoreHorizontal, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, isPast, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';

const columnHelper = createColumnHelper<Review>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Review ID',
    cell: info => <span className="font-mono text-xs font-bold text-gray-500">{info.getValue()}</span>,
  }),
  columnHelper.accessor('innovationId', {
    header: 'Innovation',
    cell: info => {
      const inv = MOCK_INNOVATIONS.find(i => i.id === info.getValue())!;
      return (
        <div>
          <Link to={`/dashboard/reviews/${info.row.original.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline line-clamp-1 max-w-[250px]">
            {inv.title}
          </Link>
          <span className="text-xs text-gray-500">{inv.categoryId}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('reviewerId', {
    header: 'Reviewer',
    cell: info => {
      const user = MOCK_USERS[info.getValue()];
      return (
        <div className="flex items-center space-x-2">
          <UserAvatar firstName={user?.firstName || 'A'} lastName={user?.lastName || 'B'} size="sm" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.firstName} {user?.lastName}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: info => {
      const val = info.getValue();
      return (
        <span className={cn(
          "text-xs font-bold px-2 py-1 rounded",
          val === 'High' ? "bg-red-50 text-red-700 dark:bg-red-900/20" : 
          val === 'Normal' ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20" : "bg-gray-100 text-gray-700 dark:bg-gray-800"
        )}>{val}</span>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const isOverdue = info.getValue() !== 'Evaluated' && isPast(parseISO(info.row.original.deadlineDate));
      return <ReviewStatusBadge status={isOverdue ? 'Overdue' : info.getValue()} />;
    },
  }),
  columnHelper.accessor('deadlineDate', {
    header: 'Deadline',
    cell: info => {
      const isOverdue = info.row.original.status !== 'Evaluated' && isPast(parseISO(info.getValue()));
      return (
        <div className={cn("flex items-center text-sm", isOverdue ? "text-red-600 font-bold" : "text-gray-500")}>
          {isOverdue && <AlertTriangle size={14} className="mr-1" />}
          {format(parseISO(info.getValue()), 'MMM d, yyyy')}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <Link 
        to={`/dashboard/reviews/${info.row.original.id}`}
        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        title="View Review Details"
      >
        <ArrowRight size={18} />
      </Link>
    )
  })
];

export const AssignedReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const filteredData = MOCK_REVIEWS.filter(rev => {
    const inv = MOCK_INNOVATIONS.find(i => i.id === rev.innovationId);
    return inv?.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           rev.id.toLowerCase().includes(searchQuery.toLowerCase());
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Assigned Reviews</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your queue of innovations requiring evaluation and feedback.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reviews by Innovation Title or ID..." 
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
          <table className="w-full text-left border-collapse">
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
                    No assigned reviews found matching your search.
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
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
