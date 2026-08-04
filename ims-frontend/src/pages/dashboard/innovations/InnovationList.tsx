import { useState } from 'react';
import { MOCK_INNOVATIONS, Innovation } from '@/data/mockInnovations';
import { StatusBadge } from '@/components/dashboard/innovations/cards/StatusBadge';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { Search, Filter, Download, Plus, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MOCK_SCHOOLS } from '@/data/mockOrganization';

const columnHelper = createColumnHelper<Innovation>();

const columns = [
  columnHelper.accessor('code', {
    header: 'Code',
    cell: info => <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{info.getValue()}</span>,
  }),
  columnHelper.accessor('title', {
    header: 'Innovation Title',
    cell: info => (
      <Link to={`/dashboard/innovations/${info.row.original.id}`} className="font-bold text-gray-900 dark:text-white hover:text-[#0098c8] hover:underline line-clamp-1 max-w-[300px]">
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('categoryId', {
    header: 'Category',
    cell: info => <span className="text-sm text-gray-600 dark:text-gray-300">{info.getValue()}</span>,
  }),
  columnHelper.accessor('schoolId', {
    header: 'School',
    cell: info => {
      const school = MOCK_SCHOOLS.find(s => s.id === info.getValue());
      return <span className="text-sm text-gray-600 dark:text-gray-300" title={school?.name}>{school?.shortName}</span>;
    },
  }),
  columnHelper.accessor('stage', {
    header: 'Status',
    cell: info => <StatusBadge stage={info.getValue()} />,
  }),
  columnHelper.accessor('submissionDate', {
    header: 'Submitted',
    cell: info => <span className="text-sm text-gray-500">{format(new Date(info.getValue()), 'MMM d, yyyy')}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <MoreHorizontal size={16} />
      </button>
    )
  })
];

export const InnovationList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const filteredData = MOCK_INNOVATIONS.filter(inv => 
    inv.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inv.code.toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Innovations Directory</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track all innovations across the ecosystem.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center">
            <Download size={16} className="mr-2" /> Export
          </button>
          <Link to="/dashboard/innovations/new" className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Submit Innovation
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID or Title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm flex items-center w-full sm:w-auto justify-center">
            <Filter size={16} className="mr-2 text-gray-400" /> Advanced Filters
          </button>
        </div>
      </div>

      {/* Table */}
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
                    No innovations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
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
