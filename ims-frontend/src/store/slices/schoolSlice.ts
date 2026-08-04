import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchoolState {
  searchQuery: string;
  statusFilter: string | null;
  selectedSchoolIds: string[];
}

const initialState: SchoolState = {
  searchQuery: '',
  statusFilter: null,
  selectedSchoolIds: [],
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSchoolSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSchoolStatus: (state, action: PayloadAction<string | null>) => {
      state.statusFilter = action.payload;
    },
    toggleSchoolSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedSchoolIds.includes(id)) {
        state.selectedSchoolIds = state.selectedSchoolIds.filter(sId => sId !== id);
      } else {
        state.selectedSchoolIds.push(id);
      }
    },
    clearSchoolSelection: (state) => {
      state.selectedSchoolIds = [];
    }
  },
});

export const { setSchoolSearch, setSchoolStatus, toggleSchoolSelection, clearSchoolSelection } = schoolSlice.actions;
export default schoolSlice.reducer;
