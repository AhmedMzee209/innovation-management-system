import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StartupStage, IncubationStatus, FundingStatus } from '@/data/mockStartups';

interface StartupState {
  searchQuery: string;
  stageFilter: StartupStage | null;
  incubationFilter: IncubationStatus | null;
  fundingFilter: FundingStatus | null;
  selectedStartupIds: string[];
}

const initialState: StartupState = {
  searchQuery: '',
  stageFilter: null,
  incubationFilter: null,
  fundingFilter: null,
  selectedStartupIds: [],
};

const startupSlice = createSlice({
  name: 'startup',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStageFilter: (state, action: PayloadAction<StartupStage | null>) => {
      state.stageFilter = action.payload;
    },
    setIncubationFilter: (state, action: PayloadAction<IncubationStatus | null>) => {
      state.incubationFilter = action.payload;
    },
    setFundingFilter: (state, action: PayloadAction<FundingStatus | null>) => {
      state.fundingFilter = action.payload;
    },
    toggleStartupSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedStartupIds.includes(id)) {
        state.selectedStartupIds = state.selectedStartupIds.filter(i => i !== id);
      } else {
        state.selectedStartupIds.push(id);
      }
    },
    selectAllStartups: (state, action: PayloadAction<string[]>) => {
      state.selectedStartupIds = action.payload;
    },
    clearStartupSelection: (state) => {
      state.selectedStartupIds = [];
    }
  },
});

export const { 
  setSearchQuery, 
  setStageFilter, 
  setIncubationFilter,
  setFundingFilter,
  toggleStartupSelection, 
  selectAllStartups, 
  clearStartupSelection 
} = startupSlice.actions;

export default startupSlice.reducer;
