import { Megaphone, ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateFormData, resetForm } from '@/store/slices/announcementSlice';

export const CreateAnnouncement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData } = useSelector((state: RootState) => state.announcement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      dispatch(resetForm());
      navigate('/dashboard/announcements');
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      
      <div className="mb-6">
        <Link to="/dashboard/announcements" className="text-sm font-medium text-gray-500 hover:text-[#0098c8] flex items-center mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Announcements
        </Link>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          Publish Announcement
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Broadcast a message to users across the platform.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Announcement Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => dispatch(updateFormData({ title: e.target.value }))}
                placeholder="e.g., SUZA Innovation Week 2026"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0098c8] outline-none transition-all dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => dispatch(updateFormData({ category: e.target.value as any }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0098c8] outline-none transition-all dark:text-white"
                >
                  <option value="General">General</option>
                  <option value="Event">Event</option>
                  <option value="Funding Opportunity">Funding Opportunity</option>
                  <option value="System Update">System Update</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Target Audience</label>
                <select 
                  value={formData.audience}
                  onChange={(e) => dispatch(updateFormData({ audience: e.target.value as any }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0098c8] outline-none transition-all dark:text-white"
                >
                  <option value="All Users">All Users (University-wide)</option>
                  <option value="Students">Students Only</option>
                  <option value="Academic Staff">Academic Staff Only</option>
                  <option value="Hub Managers">Hub Managers Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Priority Level</label>
              <div className="flex gap-4">
                {['Low', 'Medium', 'High'].map(p => (
                  <label key={p} className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="priority" 
                      value={p}
                      checked={formData.priority === p}
                      onChange={(e) => dispatch(updateFormData({ priority: e.target.value as any }))}
                      className="w-4 h-4 text-[#0098c8] focus:ring-[#0098c8] border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Message Content</label>
              <textarea 
                required
                value={formData.content}
                onChange={(e) => dispatch(updateFormData({ content: e.target.value }))}
                placeholder="Write the full announcement details here..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#0098c8] outline-none transition-all dark:text-white resize-none"
              ></textarea>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => { dispatch(resetForm()); navigate('/dashboard/announcements'); }}
                className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center"
              >
                <Send size={16} className="mr-2" /> Publish Announcement
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
