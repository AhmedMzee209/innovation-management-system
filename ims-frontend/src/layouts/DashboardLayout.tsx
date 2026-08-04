import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { TopNav } from '@/components/dashboard/layout/TopNav';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden selection:bg-[#0098c8]/20 selection:text-[#0098c8] font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-0">
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent focus:outline-none scroll-smooth flex flex-col">
          <div className="flex-1 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
          
          {/* Dashboard Footer */}
          <footer 
            className="mt-auto py-6 text-center text-white shrink-0 shadow-inner"
            style={{ backgroundColor: '#0098c8' }}
          >
            <p className="text-xs font-bold text-white/90">
              &copy; {new Date().getFullYear()} State University of Zanzibar (SUZA). All rights reserved. | Innovation Management System
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

