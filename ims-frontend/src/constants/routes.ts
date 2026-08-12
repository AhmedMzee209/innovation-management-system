export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
  },
  ERRORS: {
    NOT_FOUND: '*',
    UNAUTHORIZED: '/unauthorized',
    FORBIDDEN: '/forbidden',
  },
} as const;
