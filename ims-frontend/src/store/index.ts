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
import reviewReducer from './slices/reviewSlice';
import evaluationReducer from './slices/evaluationSlice';
import startupReducer from './slices/startupSlice';
import startupWizardReducer from './slices/startupWizardSlice';
import mentorshipReducer from './slices/mentorshipSlice';
import sessionReducer from './slices/sessionSlice';
import fundingReducer from './slices/fundingSlice';
import fundingAppReducer from './slices/fundingAppSlice';
import competitionReducer from './slices/competitionSlice';
import competitionWizardReducer from './slices/competitionWizardSlice';
import opportunityReducer from './slices/opportunitySlice';
import opportunityWizardReducer from './slices/opportunityWizardSlice';
import documentReducer from './slices/documentSlice';
import uploadReducer from './slices/uploadSlice';
import messageReducer from './slices/messageSlice';
import announcementReducer from './slices/announcementSlice';

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
    review: reviewReducer,
    evaluation: evaluationReducer,
    startup: startupReducer,
    startupWizard: startupWizardReducer,
    mentorship: mentorshipReducer,
    session: sessionReducer,
    funding: fundingReducer,
    fundingApp: fundingAppReducer,
    competition: competitionReducer,
    competitionWizard: competitionWizardReducer,
    opportunity: opportunityReducer,
    opportunityWizard: opportunityWizardReducer,
    document: documentReducer,
    upload: uploadReducer,
    message: messageReducer,
    announcement: announcementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
