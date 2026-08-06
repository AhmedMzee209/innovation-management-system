import { useState } from 'react';
import { MOCK_SESSIONS, SessionStatus } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { SessionStatusBadge } from '@/components/dashboard/mentorship/cards/SessionStatusBadge';
import { Search, Filter, CalendarClock, ChevronDown, ChevronUp, ArrowRight, Video, MapPin, Calendar, Clock } from 'lucide-react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/dashboard/users/UserAvatar';

const columnHelper = createColumnHelper<typeof MOCK_SESSIONS[0]>();

const columns = [
  columnHelper.display({
    id: 'mentor',
    header: 'Mentor',
    cell: info => {
      const user = MOCK_USERS[info.row.original.mentorId];
      if (!user) return null;
      return (
        <div className="flex items-center space-x-3">
          <UserAvatar firstName={user.firstName} lastName={user.lastName} size="sm" />
          <span className="font-bold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</span>
        </div>
      );
    }
  }),
  columnHelper.display({
    id: 'startup',
    header: 'Startup',
    cell: info => {
      const startup = MOCK_STARTUPS.find(s => s.id === info.row.original.startupId);
      if (!startup) return null;
      return (
        <Link to={`/dashboard/startups/${startup.id}`} className="font-bold text-[#0098c8] hover:underline">
          {startup.name}
        </Link>
      );
    }
  }),
  columnHelper.accessor('date', {
    header: 'Date & Time',
    cell: info => (
      <div>
        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-300">
          <Calendar size={14} className="mr-1.5 text-gray-400" />
          {format(parseISO(info.getValue()), 'MMM d, yyyy')}
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock size={12} className="mr-1.5 text-gray-400" />
          {info.row.original.time} ({info.row.original.durationMinutes} min)
        </div>
      </div>
    )
  }),
  columnHelper.accessor('meetingType', {
    header: 'Type',
    cell: info => (
      <span className="text-xs font-bold text-gray-500 flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded w-fit">
        {info.getValue() === 'Virtual' ? <Video size={12} className="mr-1 text-[#0098c8]" /> : <MapPin size={12} className="mr-1 text-purple-500" />}
        {info.getValue()}
      </span>
    )
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <SessionStatusBadge status={info.getValue()} />
  }),
  columnHelper.display({
    id: 'actions',
    cell: info => (
      <Link 
        to={`/dashboard/mentorship/sessions/${info.row.original.id}`}
        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        <ArrowRight size={18} />
      </Link>
    )
  })
];

export const MentoringSessions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SessionStatus | 'All'>('All');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'date', desc: true }]);

  const filteredData = MOCK_SESSIONS.filter(session => {
    const startup = MOCK_STARTUPS.find(s => s.id === session.startupId);
    const mentor = MOCK_USERS[session.mentorId];
    
    const matchesSearch = 
      startup?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      `${mentor?.firstName} ${mentor?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.agenda.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' ? true : session.status === statusFilter;

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
            <CalendarClock className="mr-3 text-[#0098c8]" size={28} />
            Mentoring Sessions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage all scheduled and past mentoring sessions.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by startup, mentor, or topic..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {['All', 'Scheduled', 'Completed', 'Cancelled'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={cn(
                "px-4 py-2 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm",
                statusFilter === status 
                  ? "bg-[#0098c8] text-white border-[#0098c8]" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
            >
              {status}
            </button>
          ))}
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center shrink-0">
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
                    No sessions found matching your search.
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
