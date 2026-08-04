import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepartmentState {
  searchQuery: string;
  schoolFilter: string | null;
}

const initialState: DepartmentState = {
  searchQuery: '',
  schoolFilter: null,
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartmentSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setDepartmentSchoolFilter: (state, action: PayloadAction<string | null>) => {
      state.schoolFilter = action.payload;
    },
  },
});

export const { setDepartmentSearch, setDepartmentSchoolFilter } = departmentSlice.actions;
export default departmentSlice.reducer;
