import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  searchQuery: string;
  roleFilter: string | null;
  statusFilter: string | null;
  selectedUserIds: string[];
  page: number;
  pageSize: number;
}

const initialState: UsersState = {
  searchQuery: '',
  roleFilter: null,
  statusFilter: null,
  selectedUserIds: [],
  page: 1,
  pageSize: 10,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setRoleFilter: (state, action: PayloadAction<string | null>) => {
      state.roleFilter = action.payload;
      state.page = 1;
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.statusFilter = action.payload;
      state.page = 1;
    },
    setSelectedUsers: (state, action: PayloadAction<string[]>) => {
      state.selectedUserIds = action.payload;
    },
    toggleUserSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedUserIds.includes(id)) {
        state.selectedUserIds = state.selectedUserIds.filter(userId => userId !== id);
      } else {
        state.selectedUserIds.push(id);
      }
    },
    clearSelection: (state) => {
      state.selectedUserIds = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
});

export const {
  setSearchQuery,
  setRoleFilter,
  setStatusFilter,
  setSelectedUsers,
  toggleUserSelection,
  clearSelection,
  setPage,
  setPageSize,
} = usersSlice.actions;

export default usersSlice.reducer;
