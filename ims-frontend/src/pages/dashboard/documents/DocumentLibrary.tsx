import { useMemo } from 'react';
import { MOCK_DOCUMENTS, MOCK_FOLDERS } from '@/data/mockDocuments';
import { MOCK_USERS } from '@/data/mockUsers';
import { Folder, Search, Filter, Grid, List, ChevronRight, Home, Upload, FileText } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentFolder, setViewMode, setSearchQuery } from '@/store/slices/documentSlice';
import { DocumentCard } from '@/components/dashboard/documents/DocumentCard';
import { FolderCard } from '@/components/dashboard/documents/FolderCard';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const columnHelper = createColumnHelper<typeof MOCK_DOCUMENTS[0]>();

export const DocumentLibrary = () => {
  const dispatch = useDispatch();
  const { currentFolderId, viewMode, searchQuery } = useSelector((state: RootState) => state.document);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Derived state
  const currentFolder = MOCK_FOLDERS.find(f => f.id === currentFolderId);
  
  const breadcrumbs = useMemo(() => {
    const crumbs = [];
    let curr = currentFolder;
    while (curr) {
      crumbs.unshift(curr);
      curr = MOCK_FOLDERS.find(f => f.id === curr?.parentId);
    }
    return crumbs;
  }, [currentFolder]);

  // Filtering
  const displayFolders = MOCK_FOLDERS.filter(f => f.parentId === currentFolderId && f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayDocs = MOCK_DOCUMENTS.filter(d => d.folderId === currentFolderId && d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Table Setup
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => (
        <div className="flex items-center">
          <FileText size={16} className="text-gray-400 mr-3" />
          <span className="font-bold text-gray-900 dark:text-white">{info.getValue()}</span>
        </div>
      )
    }),
    columnHelper.accessor('ownerId', {
      header: 'Owner',
      cell: info => {
        const user = MOCK_USERS.find(u => u.id === info.getValue());
        return (
          <div className="flex items-center">
            <img src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`} alt="avatar" className="w-6 h-6 rounded-full mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.firstName} {user?.lastName}</span>
          </div>
        );
      }
    }),
    columnHelper.accessor('lastModified', {
      header: 'Last Modified',
      cell: info => <span className="text-sm text-gray-500">{format(new Date(info.getValue()), 'MMM d, yyyy')}</span>
    }),
    columnHelper.accessor('size', {
      header: 'Size',
      cell: info => {
        const bytes = info.getValue();
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return <span className="text-sm text-gray-500">{parseFloat((bytes / Math.pow(k, i)).toFixed(1))} {sizes[i]}</span>;
      }
    })
  ];

  const table = useReactTable({
    data: displayDocs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center mb-2">
            <Folder className="mr-3 text-amber-500" size={28} />
            Document Library
          </h1>
          <nav className="flex items-center text-sm font-medium text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
            <button 
              onClick={() => dispatch(setCurrentFolder(null))}
              className={`hover:text-[#0098c8] flex items-center transition-colors ${currentFolderId === null ? 'text-gray-900 dark:text-white font-bold' : ''}`}
            >
              <Home size={14} className="mr-1.5" /> Root
            </button>
            {breadcrumbs.map(crumb => (
              <span key={crumb.id} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-gray-400" />
                <button 
                  onClick={() => dispatch(setCurrentFolder(crumb.id))}
                  className={`hover:text-[#0098c8] transition-colors ${currentFolderId === crumb.id ? 'text-gray-900 dark:text-white font-bold' : ''}`}
                >
                  {crumb.name}
                </button>
              </span>
            ))}
          </nav>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/documents/upload" className="px-5 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
            <Upload size={18} className="mr-2" /> Upload
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-2 pl-4 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search in this folder..." 
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-8 pr-4 py-2 bg-transparent text-sm font-medium outline-none dark:text-white"
          />
        </div>
        <div className="w-full md:w-px h-px md:h-8 bg-gray-200 dark:bg-gray-800" />
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <button className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter size={18} />
          </button>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shrink-0">
            <button 
              onClick={() => dispatch(setViewMode('grid'))}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => dispatch(setViewMode('list'))}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        <div className="space-y-8">
          {displayFolders.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Folders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {displayFolders.map(f => (
                  <FolderCard key={f.id} folder={f} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Files</h3>
            {displayDocs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {displayDocs.map(d => (
                  <DocumentCard key={d.id} document={d} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No files found</h3>
                <p className="text-gray-500 text-sm mt-1">Upload a file or create a new folder.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
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
                {/* Folders in List View */}
                {displayFolders.map(folder => (
                  <tr key={folder.id} onDoubleClick={() => dispatch(setCurrentFolder(folder.id))} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group">
                    <td colSpan={columns.length} className="p-4">
                      <div className="flex items-center">
                        <Folder size={18} className="text-amber-500 mr-3 fill-amber-100 dark:fill-amber-900/30" />
                        <span className="font-bold text-gray-900 dark:text-white group-hover:text-[#0098c8] transition-colors">{folder.name}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Files in List View */}
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
                
                {displayDocs.length === 0 && displayFolders.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="p-12 text-center text-gray-500">
                      <FileText size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                      <p className="text-lg font-bold text-gray-900 dark:text-white">This folder is empty</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
