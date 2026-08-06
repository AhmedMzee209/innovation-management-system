import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MentorshipState {
  searchQuery: string;
  industryFilter: string | null;
  expertiseFilter: string | null;
  selectedMentorId: string | null;
}

const initialState: MentorshipState = {
  searchQuery: '',
  industryFilter: null,
  expertiseFilter: null,
  selectedMentorId: null,
};

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIndustryFilter: (state, action: PayloadAction<string | null>) => {
      state.industryFilter = action.payload;
    },
    setExpertiseFilter: (state, action: PayloadAction<string | null>) => {
      state.expertiseFilter = action.payload;
    },
    setSelectedMentor: (state, action: PayloadAction<string | null>) => {
      state.selectedMentorId = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.industryFilter = null;
      state.expertiseFilter = null;
    }
  },
});

export const { 
  setSearchQuery, 
  setIndustryFilter, 
  setExpertiseFilter,
  setSelectedMentor,
  clearFilters
} = mentorshipSlice.actions;

export default mentorshipSlice.reducer;
