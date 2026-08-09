import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MonitoringState {
  timeRange: '1h' | '6h' | '24h' | '7d';
  activeMetrics: string[];
  autoRefresh: boolean;
}

const initialState: MonitoringState = {
  timeRange: '24h',
  activeMetrics: ['cpu', 'ram', 'requests', 'errors'],
  autoRefresh: true,
};

export const monitoringSlice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    setTimeRange: (state, action: PayloadAction<MonitoringState['timeRange']>) => { state.timeRange = action.payload; },
    toggleMetric: (state, action: PayloadAction<string>) => {
      const idx = state.activeMetrics.indexOf(action.payload);
      if (idx >= 0) state.activeMetrics.splice(idx, 1);
      else state.activeMetrics.push(action.payload);
    },
    setAutoRefresh: (state, action: PayloadAction<boolean>) => { state.autoRefresh = action.payload; },
  },
});

export const { setTimeRange, toggleMetric, setAutoRefresh } = monitoringSlice.actions;
export default monitoringSlice.reducer;
