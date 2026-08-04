import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  isSidebarOpen: boolean;
  isRightPanelOpen: boolean;
}

const initialState: DashboardState = {
  isSidebarOpen: true, // Default to open on desktop
  isRightPanelOpen: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
    setRightPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isRightPanelOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleRightPanel, setRightPanelOpen } = dashboardSlice.actions;
export default dashboardSlice.reducer;
