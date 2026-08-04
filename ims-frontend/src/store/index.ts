import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';
import settingsReducer from './slices/settingsSlice';
import dashboardReducer from './slices/dashboardSlice';

import usersReducer from './slices/usersSlice';
import rolesReducer from './slices/rolesSlice';
import organizationReducer from './slices/organizationSlice';
import schoolReducer from './slices/schoolSlice';
import departmentReducer from './slices/departmentSlice';
import hubReducer from './slices/hubSlice';
import managerReducer from './slices/managerSlice';
import innovationReducer from './slices/innovationSlice';
import innovationWizardReducer from './slices/innovationWizardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notification: notificationReducer,
    settings: settingsReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    roles: rolesReducer,
    organization: organizationReducer,
    school: schoolReducer,
    department: departmentReducer,
    hub: hubReducer,
    manager: managerReducer,
    innovation: innovationReducer,
    innovationWizard: innovationWizardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
