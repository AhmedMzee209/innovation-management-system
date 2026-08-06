import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  unreadCount: number;
  filterStatus: 'All' | 'Unread';
  searchQuery: string;
  selectedNotificationId: string | null;
}

const initialState: NotificationState = {
  unreadCount: 0,
  filterStatus: 'All',
  searchQuery: '',
  selectedNotificationId: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    clearUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    setFilterStatus: (state, action: PayloadAction<'All' | 'Unread'>) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedNotification: (state, action: PayloadAction<string | null>) => {
      state.selectedNotificationId = action.payload;
    }
  },
});

export const { 
  setUnreadCount, 
  incrementUnreadCount, 
  clearUnreadCount,
  setFilterStatus,
  setSearchQuery,
  setSelectedNotification
} = notificationSlice.actions;
export default notificationSlice.reducer;
