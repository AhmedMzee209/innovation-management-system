import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ShowcaseCategory } from '@/data/mockShowcase';

interface ShowcaseState {
  searchQuery: string;
  activeCategory: ShowcaseCategory | 'All';
  sortBy: 'latest' | 'popular' | 'trending';
  currentPage: number;
  pageSize: number;
  viewMode: 'grid' | 'list';
  activeTab: 'innovations' | 'startups' | 'research' | 'events' | 'awards' | 'innovators';
}

const initialState: ShowcaseState = {
  searchQuery: '',
  activeCategory: 'All',
  sortBy: 'latest',
  currentPage: 1,
  pageSize: 12,
  viewMode: 'grid',
  activeTab: 'innovations',
};

const showcaseSlice = createSlice({
  name: 'showcase',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setActiveCategory: (state, action: PayloadAction<ShowcaseCategory | 'All'>) => {
      state.activeCategory = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<ShowcaseState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<ShowcaseState['activeTab']>) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchQuery, setActiveCategory, setSortBy,
  setPage, setViewMode, setActiveTab, resetFilters
} = showcaseSlice.actions;
export default showcaseSlice.reducer;
