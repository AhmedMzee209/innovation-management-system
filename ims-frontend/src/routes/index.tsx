import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

// Layouts
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { EmptyLayout } from '@/layouts/EmptyLayout';

// Routes Wrappers
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { Ecosystem } from '@/pages/public/Ecosystem';
import { Schools } from '@/pages/public/Schools';

// Error Pages
import { NotFound } from '@/pages/errors/NotFound';
import { Unauthorized } from '@/pages/errors/Unauthorized';
import { Forbidden } from '@/pages/errors/Forbidden';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/schools" element={<Schools />} />
          {/* Placeholders for others to prevent 404 while navigating */}
          <Route path="/hubs" element={<div className="pt-24 text-center">Hubs Placeholder</div>} />
          <Route path="/showcase" element={<div className="pt-24 text-center">Showcase Placeholder</div>} />
          <Route path="/events" element={<div className="pt-24 text-center">Events Placeholder</div>} />
          <Route path="/faq" element={<div className="pt-24 text-center">FAQ Placeholder</div>} />
          <Route path="/contact" element={<div className="pt-24 text-center">Contact Placeholder</div>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.PUBLIC.LOGIN} element={<div>Login Placeholder</div>} />
          <Route path={ROUTES.PUBLIC.FORGOT_PASSWORD} element={<div>Forgot Password Placeholder</div>} />
          <Route path="/register" element={<div>Register Placeholder</div>} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.PROTECTED.DASHBOARD} element={<div>Dashboard Placeholder</div>} />
          <Route path={ROUTES.PROTECTED.PROFILE} element={<div>Profile Placeholder</div>} />
          <Route path={ROUTES.PROTECTED.SETTINGS} element={<div>Settings Placeholder</div>} />
        </Route>
      </Route>

      {/* Error Routes */}
      <Route element={<EmptyLayout />}>
        <Route path={ROUTES.ERRORS.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.ERRORS.FORBIDDEN} element={<Forbidden />} />
        <Route path={ROUTES.ERRORS.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
