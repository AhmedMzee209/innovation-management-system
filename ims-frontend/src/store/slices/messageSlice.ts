import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  activeConversationId: string | null;
  searchQuery: string;
  isSidebarVisible: boolean; // For mobile responsiveness
}

const initialState: MessageState = {
  activeConversationId: null,
  searchQuery: '',
  isSidebarVisible: true,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      // Auto-hide sidebar on mobile when conversation selected
      if (action.payload && window.innerWidth < 768) {
        state.isSidebarVisible = false;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    setSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    }
  },
});

export const { setActiveConversation, setSearchQuery, toggleSidebar, setSidebarVisible } = messageSlice.actions;
export default messageSlice.reducer;
