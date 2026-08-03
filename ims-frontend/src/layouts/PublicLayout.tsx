import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrustedBy } from '@/components/public/home/TrustedBy';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <TrustedBy />
      <Footer />
    </div>
  );
};
