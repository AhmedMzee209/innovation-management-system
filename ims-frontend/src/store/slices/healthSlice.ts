import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthState {
  alertThreshold: { cpu: number; ram: number; disk: number };
  showOfflineOnly: boolean;
  sortBy: 'name' | 'status' | 'latency';
}

const initialState: HealthState = {
  alertThreshold: { cpu: 80, ram: 85, disk: 90 },
  showOfflineOnly: false,
  sortBy: 'name',
};

export const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    setAlertThreshold: (state, action: PayloadAction<Partial<HealthState['alertThreshold']>>) => {
      state.alertThreshold = { ...state.alertThreshold, ...action.payload };
    },
    toggleOfflineOnly: (state) => { state.showOfflineOnly = !state.showOfflineOnly; },
    setHealthSort: (state, action: PayloadAction<HealthState['sortBy']>) => { state.sortBy = action.payload; },
  },
});

export const { setAlertThreshold, toggleOfflineOnly, setHealthSort } = healthSlice.actions;
export default healthSlice.reducer;
