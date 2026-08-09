import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SystemState {
  refreshInterval: number; // seconds
  isRefreshing: boolean;
  lastRefreshed: string | null;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const initialState: SystemState = {
  refreshInterval: 30,
  isRefreshing: false,
  lastRefreshed: null,
  maintenanceMode: false,
  maintenanceMessage: 'System is currently under maintenance. Please try again later.',
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setRefreshInterval: (state, action: PayloadAction<number>) => { state.refreshInterval = action.payload; },
    setRefreshing: (state, action: PayloadAction<boolean>) => { state.isRefreshing = action.payload; },
    setLastRefreshed: (state, action: PayloadAction<string>) => { state.lastRefreshed = action.payload; },
    toggleMaintenanceMode: (state) => { state.maintenanceMode = !state.maintenanceMode; },
    setMaintenanceMessage: (state, action: PayloadAction<string>) => { state.maintenanceMessage = action.payload; },
  },
});

export const { setRefreshInterval, setRefreshing, setLastRefreshed, toggleMaintenanceMode, setMaintenanceMessage } = systemSlice.actions;
export default systemSlice.reducer;
