import { Routes, Route, Navigate } from 'react-router-dom';
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
import { Register } from '@/pages/auth/Register';
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

// Review Pages
import { ReviewDashboard } from '@/pages/dashboard/reviews/ReviewDashboard';
import { AssignedReviews } from '@/pages/dashboard/reviews/AssignedReviews';
import { ReviewDetails } from '@/pages/dashboard/reviews/ReviewDetails';
import { InnovationEvaluation } from '@/pages/dashboard/reviews/InnovationEvaluation';
import { ReviewerProfile } from '@/pages/dashboard/reviews/ReviewerProfile';
import { ReviewAnalytics } from '@/pages/dashboard/reviews/ReviewAnalytics';

import { StartupDashboard } from '@/pages/dashboard/startups/StartupDashboard';
import { StartupList } from '@/pages/dashboard/startups/StartupList';
import { StartupProfile } from '@/pages/dashboard/startups/StartupProfile';
import { CreateStartup } from '@/pages/dashboard/startups/CreateStartup';
import { StartupAnalytics } from '@/pages/dashboard/startups/StartupAnalytics';

import { MentorshipDashboard } from '@/pages/dashboard/mentorship/MentorshipDashboard';
import { MentorDirectory } from '@/pages/dashboard/mentorship/MentorDirectory';
import { MentorProfile } from '@/pages/dashboard/mentorship/MentorProfile';
import { SessionCalendar } from '@/pages/dashboard/mentorship/SessionCalendar';
import { MentoringSessions } from '@/pages/dashboard/mentorship/MentoringSessions';
import { SessionDetails } from '@/pages/dashboard/mentorship/SessionDetails';
import { ActionPlans } from '@/pages/dashboard/mentorship/ActionPlans';
import { MentorshipAnalytics } from '@/pages/dashboard/mentorship/MentorshipAnalytics';

import { FundingDashboard } from '@/pages/dashboard/funding/FundingDashboard';
import { FundingPrograms } from '@/pages/dashboard/funding/FundingPrograms';
import { ProgramDetails } from '@/pages/dashboard/funding/ProgramDetails';
import { ApplyFunding } from '@/pages/dashboard/funding/ApplyFunding';
import { FundingApplications } from '@/pages/dashboard/funding/FundingApplications';
import { ApplicationDetails } from '@/pages/dashboard/funding/ApplicationDetails';
import { ApplicationEvaluation } from '@/pages/dashboard/funding/ApplicationEvaluation';
import { FundingDisbursements } from '@/pages/dashboard/funding/FundingDisbursements';
import { DisbursementDetails } from '@/pages/dashboard/funding/DisbursementDetails';
import { FundingAnalytics } from '@/pages/dashboard/funding/FundingAnalytics';

import { CompetitionDashboard } from '@/pages/dashboard/competitions/CompetitionDashboard';
import { CompetitionList } from '@/pages/dashboard/competitions/CompetitionList';
import { CreateCompetition } from '@/pages/dashboard/competitions/CreateCompetition';
import { CompetitionDetails } from '@/pages/dashboard/competitions/CompetitionDetails';
import { CompetitionParticipants } from '@/pages/dashboard/competitions/CompetitionParticipants';
import { CompetitionJudges } from '@/pages/dashboard/competitions/CompetitionJudges';
import { PitchingSchedule } from '@/pages/dashboard/competitions/PitchingSchedule';
import { CompetitionResults } from '@/pages/dashboard/competitions/CompetitionResults';
import { CompetitionAnalytics } from '@/pages/dashboard/competitions/CompetitionAnalytics';
import { CompetitionRegistration } from '@/pages/dashboard/competitions/CompetitionRegistration';
import { JudgeAssignment } from '@/pages/dashboard/competitions/JudgeAssignment';
import { CompetitionEvaluation } from '@/pages/dashboard/competitions/CompetitionEvaluation';

// Opportunity Management
import { OpportunityDashboard } from '@/pages/dashboard/opportunities/OpportunityDashboard';
import { OpportunityMarketplace } from '@/pages/dashboard/opportunities/OpportunityMarketplace';
import { OpportunityDetails } from '@/pages/dashboard/opportunities/OpportunityDetails';
import { CreateOpportunity } from '@/pages/dashboard/opportunities/CreateOpportunity';
import { SavedOpportunities } from '@/pages/dashboard/opportunities/SavedOpportunities';
import { MyApplications } from '@/pages/dashboard/opportunities/MyApplications';
import { ApplicationDetails as OpportunityAppDetails } from '@/pages/dashboard/opportunities/ApplicationDetails';
import { OpportunityCategories } from '@/pages/dashboard/opportunities/OpportunityCategories';
import { OpportunityProviders } from '@/pages/dashboard/opportunities/OpportunityProviders';
import { OpportunityReports } from '@/pages/dashboard/opportunities/OpportunityReports';
import { OpportunityAnalytics } from '@/pages/dashboard/opportunities/OpportunityAnalytics';

// Document Management
import { DocumentDashboard } from '@/pages/dashboard/documents/DocumentDashboard';
import { DocumentLibrary } from '@/pages/dashboard/documents/DocumentLibrary';
import { UploadDocuments } from '@/pages/dashboard/documents/UploadDocuments';
import { DocumentDetails } from '@/pages/dashboard/documents/DocumentDetails';
import { DocumentCategories } from '@/pages/dashboard/documents/DocumentCategories';
import { DocumentReports } from '@/pages/dashboard/documents/DocumentReports';
import { DocumentAnalytics } from '@/pages/dashboard/documents/DocumentAnalytics';

// Messaging & Notifications
import { NotificationDashboard } from '@/pages/dashboard/messaging/NotificationDashboard';
import { NotificationCenter } from '@/pages/dashboard/messaging/NotificationCenter';
import { Messages } from '@/pages/dashboard/messaging/Messages';
import { Announcements } from '@/pages/dashboard/messaging/Announcements';
import { CreateAnnouncement } from '@/pages/dashboard/messaging/CreateAnnouncement';
import { NotificationPreferences } from '@/pages/dashboard/messaging/NotificationPreferences';
import { MessagingAnalytics } from '@/pages/dashboard/messaging/MessagingAnalytics';

// Analytics & Reports
import { ExecutiveDashboard } from '@/pages/dashboard/analytics/ExecutiveDashboard';
import { InnovationAnalytics } from '@/pages/dashboard/analytics/InnovationAnalytics';
import { StartupAnalytics as GlobalStartupAnalytics } from '@/pages/dashboard/analytics/StartupAnalytics';
import { FundingAnalytics as GlobalFundingAnalytics } from '@/pages/dashboard/analytics/FundingAnalytics';
import { CompetitionAnalytics as GlobalCompetitionAnalytics } from '@/pages/dashboard/analytics/CompetitionAnalytics';
import { MentorshipAnalytics as GlobalMentorshipAnalytics } from '@/pages/dashboard/analytics/MentorshipAnalytics';
import { OpportunityAnalytics as GlobalOpportunityAnalytics } from '@/pages/dashboard/analytics/OpportunityAnalytics';
import { OrganizationAnalytics } from '@/pages/dashboard/analytics/OrganizationAnalytics';
import { ReportsCenter } from '@/pages/dashboard/analytics/ReportsCenter';
import { CustomDashboard } from '@/pages/dashboard/analytics/CustomDashboard';

// Public Showcase
import { ShowcaseDashboard } from '@/pages/showcase/ShowcaseDashboard';
import { InnovationGallery } from '@/pages/showcase/InnovationGallery';
import { InnovationDetail } from '@/pages/showcase/InnovationDetail';
import { StartupShowcase } from '@/pages/showcase/StartupShowcase';
import { StartupDetail } from '@/pages/showcase/StartupDetail';
import { ResearchShowcase } from '@/pages/showcase/ResearchShowcase';
import { SuccessStories } from '@/pages/showcase/SuccessStories';
import { AwardsRecognition } from '@/pages/showcase/AwardsRecognition';
import { InnovationTimeline } from '@/pages/showcase/InnovationTimeline';
import { EventsGallery } from '@/pages/showcase/EventsGallery';
import { CompetitionWinners } from '@/pages/showcase/CompetitionWinners';
import { PartnerOrganizations } from '@/pages/showcase/PartnerOrganizations';
import { InnovationEcosystem } from '@/pages/showcase/InnovationEcosystem';
import { PublicSearch } from '@/pages/showcase/PublicSearch';
import { FeaturedInnovators } from '@/pages/showcase/FeaturedInnovators';

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
          {/* Showcase routes */}
          <Route path="/showcase" element={<ShowcaseDashboard />} />
          <Route path="/showcase/innovations" element={<InnovationGallery />} />
          <Route path="/showcase/innovations/:id" element={<InnovationDetail />} />
          <Route path="/showcase/startups" element={<StartupShowcase />} />
          <Route path="/showcase/startups/:id" element={<StartupDetail />} />
          <Route path="/showcase/research" element={<ResearchShowcase />} />
          <Route path="/showcase/success-stories" element={<SuccessStories />} />
          <Route path="/showcase/awards" element={<AwardsRecognition />} />
          <Route path="/showcase/timeline" element={<InnovationTimeline />} />
          <Route path="/showcase/events" element={<EventsGallery />} />
          <Route path="/showcase/competition-winners" element={<CompetitionWinners />} />
          <Route path="/showcase/partners" element={<PartnerOrganizations />} />
          <Route path="/showcase/ecosystem" element={<InnovationEcosystem />} />
          <Route path="/showcase/search" element={<PublicSearch />} />
          <Route path="/showcase/innovators" element={<FeaturedInnovators />} />
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
            <Route path="/register" element={<Register />} />
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
          <Route path="/dashboard/innovations/dashboard" element={<InnovationDashboard />} />
          <Route path="/dashboard/innovations" element={<InnovationList />} />
          <Route path="/dashboard/innovations/new" element={<SubmitInnovation />} />
          <Route path="/dashboard/innovations/:id" element={<InnovationDetails />} />
          <Route path="/dashboard/innovations/categories" element={<Categories />} />
          
          {/* Review Module */}
          <Route path="/dashboard/reviews/dashboard" element={<ReviewDashboard />} />
          <Route path="/dashboard/reviews" element={<AssignedReviews />} />
          <Route path="/dashboard/reviews/analytics" element={<ReviewAnalytics />} />
          <Route path="/dashboard/reviews/:id" element={<ReviewDetails />} />
          <Route path="/dashboard/reviews/:id/evaluate" element={<InnovationEvaluation />} />
          <Route path="/dashboard/reviewers" element={<ReviewerProfile />} />
          
          <Route path="/dashboard/analytics" element={<div className="p-6 font-bold">Analytics Module Placeholder</div>} />
          
          {/* Startup Module */}
          <Route path="/dashboard/startups/dashboard" element={<StartupDashboard />} />
          <Route path="/dashboard/startups" element={<StartupList />} />
          <Route path="/dashboard/startups/analytics" element={<StartupAnalytics />} />
          <Route path="/dashboard/startups/new" element={<CreateStartup />} />
          <Route path="/dashboard/startups/:id" element={<StartupProfile />} />
          
          {/* Mentorship Module */}
          <Route path="/dashboard/mentorship/dashboard" element={<MentorshipDashboard />} />
          <Route path="/dashboard/mentorship/mentors" element={<MentorDirectory />} />
          <Route path="/dashboard/mentors/:id" element={<MentorProfile />} />
          <Route path="/dashboard/mentorship/calendar" element={<SessionCalendar />} />
          <Route path="/dashboard/mentorship/sessions" element={<MentoringSessions />} />
          <Route path="/dashboard/mentorship/sessions/:id" element={<SessionDetails />} />
          <Route path="/dashboard/mentorship/action-plans" element={<ActionPlans />} />
          <Route path="/dashboard/mentorship/analytics" element={<MentorshipAnalytics />} />
          
          {/* Funding Module */}
          <Route path="/dashboard/funding/dashboard" element={<FundingDashboard />} />
          <Route path="/dashboard/funding/programs" element={<FundingPrograms />} />
          <Route path="/dashboard/funding/programs/:id" element={<ProgramDetails />} />
          <Route path="/dashboard/funding/apply" element={<ApplyFunding />} />
          <Route path="/dashboard/funding/applications" element={<FundingApplications />} />
          <Route path="/dashboard/funding/applications/:id" element={<ApplicationDetails />} />
          <Route path="/dashboard/funding/applications/:id/evaluate" element={<ApplicationEvaluation />} />
          <Route path="/dashboard/funding/disbursements" element={<FundingDisbursements />} />
          <Route path="/dashboard/funding/disbursements/:id" element={<DisbursementDetails />} />
          <Route path="/dashboard/funding/analytics" element={<FundingAnalytics />} />
          
          {/* Competitions Module */}
          <Route path="/dashboard/competitions/dashboard" element={<CompetitionDashboard />} />
          <Route path="/dashboard/competitions/list" element={<CompetitionList />} />
          <Route path="/dashboard/competitions/new" element={<CreateCompetition />} />
          <Route path="/dashboard/competitions/participants" element={<CompetitionParticipants />} />
          <Route path="/dashboard/competitions/judges" element={<CompetitionJudges />} />
          <Route path="/dashboard/competitions/pitch" element={<PitchingSchedule />} />
          <Route path="/dashboard/competitions/results" element={<CompetitionResults />} />
          <Route path="/dashboard/competitions/analytics" element={<CompetitionAnalytics />} />
          <Route path="/dashboard/competitions/evaluate/:sessionId/:participantId" element={<CompetitionEvaluation />} />
          <Route path="/dashboard/competitions/:id" element={<CompetitionDetails />} />
          <Route path="/dashboard/competitions/:id/register" element={<CompetitionRegistration />} />
          <Route path="/dashboard/competitions/:id/assign-judges" element={<JudgeAssignment />} />
          
          {/* Opportunity Management */}
          <Route path="/dashboard/opportunities/dashboard" element={<OpportunityDashboard />} />
          <Route path="/dashboard/opportunities/marketplace" element={<OpportunityMarketplace />} />
          <Route path="/dashboard/opportunities/new" element={<CreateOpportunity />} />
          <Route path="/dashboard/opportunities/saved" element={<SavedOpportunities />} />
          <Route path="/dashboard/opportunities/applications" element={<MyApplications />} />
          <Route path="/dashboard/opportunities/applications/:id" element={<OpportunityAppDetails />} />
          <Route path="/dashboard/opportunities/categories" element={<OpportunityCategories />} />
          <Route path="/dashboard/opportunities/providers" element={<OpportunityProviders />} />
          <Route path="/dashboard/opportunities/providers/:id" element={<OpportunityProviders />} />
          <Route path="/dashboard/opportunities/reports" element={<OpportunityReports />} />
          <Route path="/dashboard/opportunities/analytics" element={<OpportunityAnalytics />} />
          <Route path="/dashboard/opportunities/:id" element={<OpportunityDetails />} />
          
          {/* Document Management */}
          <Route path="/dashboard/documents" element={<Navigate to="/dashboard/documents/dashboard" replace />} />
          <Route path="/dashboard/documents/dashboard" element={<DocumentDashboard />} />
          <Route path="/dashboard/documents/library" element={<DocumentLibrary />} />
          <Route path="/dashboard/documents/upload" element={<UploadDocuments />} />
          <Route path="/dashboard/documents/categories" element={<DocumentCategories />} />
          <Route path="/dashboard/documents/reports" element={<DocumentReports />} />
          <Route path="/dashboard/documents/analytics" element={<DocumentAnalytics />} />
          <Route path="/dashboard/documents/:id/preview" element={<DocumentDetails />} />
          <Route path="/dashboard/documents/:id/versions" element={<DocumentDetails />} />
          <Route path="/dashboard/documents/:id" element={<DocumentDetails />} />
          
          {/* Messaging & Notifications */}
          <Route path="/dashboard/notifications/dashboard" element={<NotificationDashboard />} />
          <Route path="/dashboard/notifications/center" element={<NotificationCenter />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/announcements" element={<Announcements />} />
          <Route path="/dashboard/announcements/new" element={<CreateAnnouncement />} />
          <Route path="/dashboard/preferences/notifications" element={<NotificationPreferences />} />
          <Route path="/dashboard/messages/analytics" element={<MessagingAnalytics />} />
          
          {/* Analytics & Reports */}
          <Route path="/dashboard/analytics/executive" element={<ExecutiveDashboard />} />
          <Route path="/dashboard/analytics/innovation" element={<InnovationAnalytics />} />
          <Route path="/dashboard/analytics/startups" element={<GlobalStartupAnalytics />} />
          <Route path="/dashboard/analytics/funding" element={<GlobalFundingAnalytics />} />
          <Route path="/dashboard/analytics/competitions" element={<GlobalCompetitionAnalytics />} />
          <Route path="/dashboard/analytics/mentorship" element={<GlobalMentorshipAnalytics />} />
          <Route path="/dashboard/analytics/opportunities" element={<GlobalOpportunityAnalytics />} />
          <Route path="/dashboard/analytics/organization" element={<OrganizationAnalytics />} />
          <Route path="/dashboard/analytics/reports" element={<ReportsCenter />} />
          <Route path="/dashboard/analytics/custom" element={<CustomDashboard />} />

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
