import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogState {
  activeTab: 'system' | 'activity' | 'error';
  searchQuery: string;
  filterSeverity: string;
  filterModule: string;
  currentPage: number;
  pageSize: number;
  showResolved: boolean;
}

const initialState: LogState = {
  activeTab: 'system',
  searchQuery: '',
  filterSeverity: 'All',
  filterModule: 'All',
  currentPage: 1,
  pageSize: 50,
  showResolved: true,
};

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setLogTab: (state, action: PayloadAction<LogState['activeTab']>) => { state.activeTab = action.payload; state.currentPage = 1; },
    setLogSearch: (state, action: PayloadAction<string>) => { state.searchQuery = action.payload; state.currentPage = 1; },
    setLogSeverity: (state, action: PayloadAction<string>) => { state.filterSeverity = action.payload; state.currentPage = 1; },
    setLogModule: (state, action: PayloadAction<string>) => { state.filterModule = action.payload; state.currentPage = 1; },
    setLogPage: (state, action: PayloadAction<number>) => { state.currentPage = action.payload; },
    toggleShowResolved: (state) => { state.showResolved = !state.showResolved; },
  },
});

export const { setLogTab, setLogSearch, setLogSeverity, setLogModule, setLogPage, toggleShowResolved } = logSlice.actions;
export default logSlice.reducer;
