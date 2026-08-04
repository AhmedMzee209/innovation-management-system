import { UserDetails } from './users/UserDetails';

// We reuse the UserDetails view for the Profile since it's structurally the same data presentation,
// just showing the logged-in user. In a real app, we'd pass the auth user ID to UserDetails,
// or have UserDetails pull it if no ID is provided in the route.
export const Profile = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto pt-6 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">My Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your personal information and preferences.</p>
      </div>
      <UserDetails />
    </div>
  );
};
