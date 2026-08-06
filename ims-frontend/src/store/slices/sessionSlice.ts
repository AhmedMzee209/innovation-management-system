import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  calendarView: 'day' | 'week' | 'month' | 'agenda';
  selectedDate: string; // ISO Date
  isScheduleModalOpen: boolean;
  selectedSessionId: string | null;
  searchQuery: string;
}

const initialState: SessionState = {
  calendarView: 'month',
  selectedDate: new Date().toISOString(),
  isScheduleModalOpen: false,
  selectedSessionId: null,
  searchQuery: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCalendarView: (state, action: PayloadAction<'day' | 'week' | 'month' | 'agenda'>) => {
      state.calendarView = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    openScheduleModal: (state) => {
      state.isScheduleModalOpen = true;
    },
    closeScheduleModal: (state) => {
      state.isScheduleModalOpen = false;
    },
    setSelectedSession: (state, action: PayloadAction<string | null>) => {
      state.selectedSessionId = action.payload;
    },
    setSessionSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setCalendarView,
  setSelectedDate,
  openScheduleModal,
  closeScheduleModal,
  setSelectedSession,
  setSessionSearch,
} = sessionSlice.actions;

export default sessionSlice.reducer;
