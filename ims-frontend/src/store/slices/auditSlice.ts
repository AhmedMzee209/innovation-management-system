import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuditState {
  searchQuery: string;
  filterModule: string;
  filterAction: string;
  filterStatus: string;
  filterUser: string;
  dateFrom: string;
  dateTo: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
}

const initialState: AuditState = {
  searchQuery: '',
  filterModule: 'All',
  filterAction: 'All',
  filterStatus: 'All',
  filterUser: '',
  dateFrom: '',
  dateTo: '',
  sortBy: 'timestamp',
  sortDir: 'desc',
  currentPage: 1,
  pageSize: 25,
};

export const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    setAuditSearch: (state, action: PayloadAction<string>) => { state.searchQuery = action.payload; state.currentPage = 1; },
    setAuditModule: (state, action: PayloadAction<string>) => { state.filterModule = action.payload; state.currentPage = 1; },
    setAuditAction: (state, action: PayloadAction<string>) => { state.filterAction = action.payload; state.currentPage = 1; },
    setAuditStatus: (state, action: PayloadAction<string>) => { state.filterStatus = action.payload; state.currentPage = 1; },
    setAuditUser: (state, action: PayloadAction<string>) => { state.filterUser = action.payload; state.currentPage = 1; },
    setDateRange: (state, action: PayloadAction<{ from: string; to: string }>) => { state.dateFrom = action.payload.from; state.dateTo = action.payload.to; state.currentPage = 1; },
    setAuditSort: (state, action: PayloadAction<{ by: string; dir: 'asc' | 'desc' }>) => { state.sortBy = action.payload.by; state.sortDir = action.payload.dir; },
    setAuditPage: (state, action: PayloadAction<number>) => { state.currentPage = action.payload; },
    setAuditPageSize: (state, action: PayloadAction<number>) => { state.pageSize = action.payload; state.currentPage = 1; },
    resetAuditFilters: () => initialState,
  },
});

export const { setAuditSearch, setAuditModule, setAuditAction, setAuditStatus, setAuditUser, setDateRange, setAuditSort, setAuditPage, setAuditPageSize, resetAuditFilters } = auditSlice.actions;
export default auditSlice.reducer;
