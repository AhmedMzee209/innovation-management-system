import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InnovationCategory, InnovationStage } from '@/data/mockInnovations';

interface InnovationState {
  searchQuery: string;
  categoryFilter: InnovationCategory | null;
  stageFilter: InnovationStage | null;
  schoolFilter: string | null;
  selectedIds: string[];
}

const initialState: InnovationState = {
  searchQuery: '',
  categoryFilter: null,
  stageFilter: null,
  schoolFilter: null,
  selectedIds: [],
};

const innovationSlice = createSlice({
  name: 'innovation',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<InnovationCategory | null>) => {
      state.categoryFilter = action.payload;
    },
    setStageFilter: (state, action: PayloadAction<InnovationStage | null>) => {
      state.stageFilter = action.payload;
    },
    setSchoolFilter: (state, action: PayloadAction<string | null>) => {
      state.schoolFilter = action.payload;
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(i => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    selectAll: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    }
  },
});

export const { 
  setSearchQuery, 
  setCategoryFilter, 
  setStageFilter, 
  setSchoolFilter, 
  toggleSelection, 
  selectAll, 
  clearSelection 
} = innovationSlice.actions;

export default innovationSlice.reducer;
