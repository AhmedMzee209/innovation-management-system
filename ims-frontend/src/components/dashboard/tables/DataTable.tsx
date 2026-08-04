import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: any[];
  data: TData[];
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      }
    }
  });

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 font-bold tracking-wider">
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center space-x-1",
                            header.column.getCanSort() ? "cursor-pointer select-none" : ""
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              <ChevronUp size={12} className={cn("mb-[-4px]", header.column.getIsSorted() === 'asc' ? "text-[#0098c8]" : "text-gray-300 dark:text-gray-600")} />
                              <ChevronDown size={12} className={cn(header.column.getIsSorted() === 'desc' ? "text-[#0098c8]" : "text-gray-300 dark:text-gray-600")} />
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-gray-700 dark:text-gray-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getPrePaginationRowModel().rows.length
          )}{' '}
          of {table.getPrePaginationRowModel().rows.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
