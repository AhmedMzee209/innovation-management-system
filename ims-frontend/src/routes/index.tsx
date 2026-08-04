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
import { GuestRoute } from './GuestRoute';

// Public Pages
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { Ecosystem } from '@/pages/public/Ecosystem';
import { Schools } from '@/pages/public/Schools';

// Error Pages
import { NotFound } from '@/pages/errors/NotFound';
import { Unauthorized } from '@/pages/errors/Unauthorized';
import { Forbidden } from '@/pages/errors/Forbidden';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';
import { VerifyEmail } from '@/pages/auth/VerifyEmail';
import { SessionExpired } from '@/pages/auth/SessionExpired';

import { DashboardHome } from '@/pages/dashboard/DashboardHome';
import { Profile } from '@/pages/dashboard/Profile';
import { Settings } from '@/pages/dashboard/Settings';
import { Notifications } from '@/pages/dashboard/Notifications';

// RBAC & User Management Pages
import { UserList } from '@/pages/dashboard/users/UserList';
import { CreateUser } from '@/pages/dashboard/users/CreateUser';
import { EditUser } from '@/pages/dashboard/users/EditUser';
import { UserDetails } from '@/pages/dashboard/users/UserDetails';
import { RoleList } from '@/pages/dashboard/roles/RoleList';
import { Permissions } from '@/pages/dashboard/roles/Permissions';

// Organization Pages
import { OrganizationDashboard } from '@/pages/dashboard/organization/OrganizationDashboard';
import { SchoolList } from '@/pages/dashboard/organization/schools/SchoolList';
import { SchoolDetails } from '@/pages/dashboard/organization/schools/SchoolDetails';
import { DepartmentList } from '@/pages/dashboard/organization/departments/DepartmentList';
import { HubList } from '@/pages/dashboard/organization/hubs/HubList';
import { HubDetails } from '@/pages/dashboard/organization/hubs/HubDetails';
import { ManagerList } from '@/pages/dashboard/organization/managers/ManagerList';

// Innovation Pages
import { InnovationDashboard } from '@/pages/dashboard/innovations/InnovationDashboard';
import { InnovationList } from '@/pages/dashboard/innovations/InnovationList';
import { InnovationDetails } from '@/pages/dashboard/innovations/InnovationDetails';
import { SubmitInnovation } from '@/pages/dashboard/innovations/SubmitInnovation';
import { Categories } from '@/pages/dashboard/innovations/Categories';

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

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
            <Route path={ROUTES.PUBLIC.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/session-expired" element={<SessionExpired />} />
            <Route path="/register" element={<div>Register Placeholder</div>} />
          </Route>
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.PROTECTED.DASHBOARD} element={<DashboardHome />} />
          <Route path={ROUTES.PROTECTED.PROFILE} element={<Profile />} />
          <Route path={ROUTES.PROTECTED.SETTINGS} element={<Settings />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          
          {/* User Management & RBAC */}
          <Route path="/dashboard/users" element={<UserList />} />
          <Route path="/dashboard/users/new" element={<CreateUser />} />
          <Route path="/dashboard/users/:id" element={<UserDetails />} />
          <Route path="/dashboard/users/:id/edit" element={<EditUser />} />
          <Route path="/dashboard/roles" element={<RoleList />} />
          <Route path="/dashboard/roles/permissions" element={<Permissions />} />
          
          {/* Placeholders for other dashboard routes */}
          {/* Organization Module */}
          <Route path="/dashboard/organization" element={<OrganizationDashboard />} />
          <Route path="/dashboard/schools" element={<SchoolList />} />
          <Route path="/dashboard/schools/:id" element={<SchoolDetails />} />
          <Route path="/dashboard/departments" element={<DepartmentList />} />
          <Route path="/dashboard/hubs" element={<HubList />} />
          <Route path="/dashboard/hubs/:id" element={<HubDetails />} />
          <Route path="/dashboard/managers" element={<ManagerList />} />

          {/* Innovation Module */}
          <Route path="/dashboard/innovations" element={<InnovationList />} />
          <Route path="/dashboard/innovations/new" element={<SubmitInnovation />} />
          <Route path="/dashboard/innovations/:id" element={<InnovationDetails />} />
          <Route path="/dashboard/innovations/categories" element={<Categories />} />
          
          <Route path="/dashboard/analytics" element={<div className="p-6 font-bold">Analytics Module Placeholder</div>} />
          <Route path="/dashboard/reviews" element={<div className="p-6 font-bold">Reviews Module Placeholder</div>} />
          <Route path="/dashboard/startups" element={<div className="p-6 font-bold">Startups Module Placeholder</div>} />
          <Route path="/dashboard/mentorship" element={<div className="p-6 font-bold">Mentorship Module Placeholder</div>} />
          <Route path="/dashboard/funding" element={<div className="p-6 font-bold">Funding Module Placeholder</div>} />
          <Route path="/dashboard/competitions" element={<div className="p-6 font-bold">Competitions Module Placeholder</div>} />
          <Route path="/dashboard/opportunities" element={<div className="p-6 font-bold">Opportunities Module Placeholder</div>} />
          <Route path="/dashboard/documents" element={<div className="p-6 font-bold">Documents Module Placeholder</div>} />
          <Route path="/dashboard/showcase" element={<div className="p-6 font-bold">Showcase Management Placeholder</div>} />
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
