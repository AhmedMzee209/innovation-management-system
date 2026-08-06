import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompetitionStatus } from '@/data/mockCompetitions';

interface CompetitionState {
  searchQuery: string;
  statusFilter: CompetitionStatus | 'All';
  categoryFilter: string;
}

const initialState: CompetitionState = {
  searchQuery: '',
  statusFilter: 'All',
  categoryFilter: 'All',
};

const competitionSlice = createSlice({
  name: 'competition',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<CompetitionStatus | 'All'>) => {
      state.statusFilter = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
  },
});

export const { setSearchQuery, setStatusFilter, setCategoryFilter } = competitionSlice.actions;
export default competitionSlice.reducer;
