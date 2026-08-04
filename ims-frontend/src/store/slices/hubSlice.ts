import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HubState {
  searchQuery: string;
  typeFilter: string | null;
}

const initialState: HubState = {
  searchQuery: '',
  typeFilter: null,
};

const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    setHubSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setHubTypeFilter: (state, action: PayloadAction<string | null>) => {
      state.typeFilter = action.payload;
    },
  },
});

export const { setHubSearch, setHubTypeFilter } = hubSlice.actions;
export default hubSlice.reducer;
