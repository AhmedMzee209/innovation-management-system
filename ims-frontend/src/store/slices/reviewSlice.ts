import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewStatus, ReviewPriority } from '@/data/mockReviews';

interface ReviewState {
  searchQuery: string;
  statusFilter: ReviewStatus | null;
  priorityFilter: ReviewPriority | null;
  reviewerFilter: string | null;
  selectedReviewIds: string[];
}

const initialState: ReviewState = {
  searchQuery: '',
  statusFilter: null,
  priorityFilter: null,
  reviewerFilter: null,
  selectedReviewIds: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<ReviewStatus | null>) => {
      state.statusFilter = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<ReviewPriority | null>) => {
      state.priorityFilter = action.payload;
    },
    setReviewerFilter: (state, action: PayloadAction<string | null>) => {
      state.reviewerFilter = action.payload;
    },
    toggleReviewSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedReviewIds.includes(id)) {
        state.selectedReviewIds = state.selectedReviewIds.filter(i => i !== id);
      } else {
        state.selectedReviewIds.push(id);
      }
    },
    selectAllReviews: (state, action: PayloadAction<string[]>) => {
      state.selectedReviewIds = action.payload;
    },
    clearReviewSelection: (state) => {
      state.selectedReviewIds = [];
    }
  },
});

export const { 
  setSearchQuery, 
  setStatusFilter, 
  setPriorityFilter,
  setReviewerFilter,
  toggleReviewSelection, 
  selectAllReviews, 
  clearReviewSelection 
} = reviewSlice.actions;

export default reviewSlice.reducer;
