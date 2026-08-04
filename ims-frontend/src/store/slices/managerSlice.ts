import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ManagerState {
  searchQuery: string;
  roleFilter: string | null;
}

const initialState: ManagerState = {
  searchQuery: '',
  roleFilter: null,
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setManagerSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setManagerRoleFilter: (state, action: PayloadAction<string | null>) => {
      state.roleFilter = action.payload;
    },
  },
});

export const { setManagerSearch, setManagerRoleFilter } = managerSlice.actions;
export default managerSlice.reducer;
