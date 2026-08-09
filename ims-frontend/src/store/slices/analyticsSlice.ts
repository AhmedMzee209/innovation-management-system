import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsFilterState {
  dateRange: '7d' | '30d' | '90d' | '1y' | 'all';
  school: string;
  department: string;
  hub: string;
  category: string;
}

const initialState: AnalyticsFilterState = {
  dateRange: '30d',
  school: 'All Schools',
  department: 'All Departments',
  hub: 'All Hubs',
  category: 'All Categories',
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<AnalyticsFilterState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = analyticsSlice.actions;
export default analyticsSlice.reducer;
