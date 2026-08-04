import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RolesState {
  searchQuery: string;
  selectedRole: string | null;
}

const initialState: RolesState = {
  searchQuery: '',
  selectedRole: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoleSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<string | null>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setRoleSearchQuery, setSelectedRole } = rolesSlice.actions;
export default rolesSlice.reducer;
