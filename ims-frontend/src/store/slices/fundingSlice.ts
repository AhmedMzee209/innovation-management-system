import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FundingProgramStatus, FundingType } from '@/data/mockFunding';

interface FundingState {
  programSearchQuery: string;
  programTypeFilter: FundingType | 'All';
  programStatusFilter: FundingProgramStatus | 'All';
  selectedProgramId: string | null;
}

const initialState: FundingState = {
  programSearchQuery: '',
  programTypeFilter: 'All',
  programStatusFilter: 'All',
  selectedProgramId: null,
};

const fundingSlice = createSlice({
  name: 'funding',
  initialState,
  reducers: {
    setProgramSearchQuery: (state, action: PayloadAction<string>) => {
      state.programSearchQuery = action.payload;
    },
    setProgramTypeFilter: (state, action: PayloadAction<FundingType | 'All'>) => {
      state.programTypeFilter = action.payload;
    },
    setProgramStatusFilter: (state, action: PayloadAction<FundingProgramStatus | 'All'>) => {
      state.programStatusFilter = action.payload;
    },
    setSelectedProgram: (state, action: PayloadAction<string | null>) => {
      state.selectedProgramId = action.payload;
    },
  },
});

export const { 
  setProgramSearchQuery, 
  setProgramTypeFilter, 
  setProgramStatusFilter,
  setSelectedProgram
} = fundingSlice.actions;

export default fundingSlice.reducer;
