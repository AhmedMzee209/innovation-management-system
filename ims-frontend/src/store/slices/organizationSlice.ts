import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrganizationState {
  searchQuery: string;
  isTreeExpanded: boolean;
}

const initialState: OrganizationState = {
  searchQuery: '',
  isTreeExpanded: true,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrgSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleTree: (state) => {
      state.isTreeExpanded = !state.isTreeExpanded;
    },
  },
});

export const { setOrgSearchQuery, toggleTree } = organizationSlice.actions;
export default organizationSlice.reducer;
