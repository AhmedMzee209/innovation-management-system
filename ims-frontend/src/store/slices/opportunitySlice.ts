import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OpportunityType, OpportunityStatus } from '@/data/mockOpportunities';

interface OpportunityState {
  searchQuery: string;
  selectedCategory: string | 'All';
  selectedType: OpportunityType | 'All';
  selectedStatus: OpportunityStatus | 'All';
  bookmarkedIds: string[];
}

const initialState: OpportunityState = {
  searchQuery: '',
  selectedCategory: 'All',
  selectedType: 'All',
  selectedStatus: 'All',
  bookmarkedIds: ['opp_1', 'opp_4', 'opp_12'], // Pre-fill some mock bookmarks
};

const opportunitySlice = createSlice({
  name: 'opportunity',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<OpportunityType | 'All'>) => {
      state.selectedType = action.payload;
    },
    setSelectedStatus: (state, action: PayloadAction<OpportunityStatus | 'All'>) => {
      state.selectedStatus = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      if (state.bookmarkedIds.includes(action.payload)) {
        state.bookmarkedIds = state.bookmarkedIds.filter(id => id !== action.payload);
      } else {
        state.bookmarkedIds.push(action.payload);
      }
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.selectedType = 'All';
      state.selectedStatus = 'All';
    }
  },
});

export const { 
  setSearchQuery, 
  setSelectedCategory, 
  setSelectedType, 
  setSelectedStatus,
  toggleBookmark,
  clearFilters
} = opportunitySlice.actions;

export default opportunitySlice.reducer;
