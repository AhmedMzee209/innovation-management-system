import { Layers, Search, Loader2, Plus, X } from 'lucide-react';
import { CategoryCard } from '@/components/dashboard/innovations/cards/CategoryCard';
import { useState } from 'react';
import { useInnovationCategories, useCreateInnovationCategory, useInnovations } from '@/hooks/useInnovation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';

export const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: 'Lightbulb' });
  
  const { data: categories = [], isLoading, isError } = useInnovationCategories();
  const { data: innovations = [] } = useInnovations();
  const { mutate: createCategory, isPending: isCreating } = useCreateInnovationCategory();

  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.roles?.includes('SUPER_ADMIN') || user?.role === 'SUPER_ADMIN' || user?.roles?.includes('INNOVATION_DIRECTOR') || user?.role === 'INNOVATION_DIRECTOR' || user?.roles?.includes('CENTRAL_HUB_MANAGER') || user?.role === 'CENTRAL_HUB_MANAGER';

  const filteredCategories = categories.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCount = (categoryName: string) => innovations.filter(i => i.categoryName === categoryName).length;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name) return;
    createCategory(newCategory, {
      onSuccess: () => {
        toast.success("Category created successfully");
        setIsModalOpen(false);
        setNewCategory({ name: '', description: '', icon: 'Lightbulb' });
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to create category");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-[#0098c8] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500">
        Failed to load categories. Please try again.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <Layers className="mr-3 text-[#0098c8]" size={28} />
            Innovation Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse the diverse domains of research and innovation across the university.</p>
        </div>
        {isAdmin && (
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#0098c8] hover:bg-[#007aa3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Add Category
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories by name or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#0098c8] dark:text-white transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(cat => (
          <CategoryCard key={cat.id} category={cat} count={getCount(cat.name)} />
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            No categories found matching "{searchQuery}"
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                <input required value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white" placeholder="e.g. Artificial Intelligence" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea rows={3} value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#0098c8] bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white" placeholder="Brief description of the category..." />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" disabled={isCreating} className="px-4 py-2 text-sm font-medium text-white bg-[#0098c8] hover:bg-[#007aa3] rounded-lg disabled:opacity-50 flex items-center transition-colors shadow-sm">
                  {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
