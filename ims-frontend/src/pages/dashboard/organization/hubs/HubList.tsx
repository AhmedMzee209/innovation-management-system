import { Globe, Plus, Search, Loader2 } from 'lucide-react';
import { useInnovationHubs, useDeleteInnovationHub } from '@/hooks/useOrganization';
import { HubCard } from '@/components/dashboard/organization/cards/HubCard';
import { HubModal } from '@/components/dashboard/organization/modals/HubModal';
import { useState } from 'react';
import { InnovationHubResponse } from '@/types/organization';
import Swal from 'sweetalert2';

export const HubList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHub, setSelectedHub] = useState<InnovationHubResponse | null>(null);

  const { data: hubs = [], isLoading } = useInnovationHubs();
  const deleteMutation = useDeleteInnovationHub();

  const handleEdit = (hub: InnovationHubResponse) => {
    setSelectedHub(hub);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedHub(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the innovation hub.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (hub.officeLocation && hub.officeLocation.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Globe className="mr-3 text-[#0098c8]" size={28} />
            Innovation Hubs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage Central and School-level innovation hubs across SUZA.</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus size={16} className="mr-2" /> Add Hub
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search hubs by name, code or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={36} className="animate-spin text-[#0098c8] mb-2" />
          <p className="text-sm text-gray-500">Loading innovation hubs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHubs.map(hub => (
            <HubCard key={hub.id} hub={hub} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
          {filteredHubs.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <Globe size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">No innovation hubs found</p>
              <p className="text-sm">Try adjusting your search query or add a new hub.</p>
            </div>
          )}
        </div>
      )}

      <HubModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} hub={selectedHub} />
    </div>
  );
};
