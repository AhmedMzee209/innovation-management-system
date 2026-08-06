import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnnouncementCategory, AudienceType, Priority } from '@/data/mockMessaging';

interface AnnouncementFormState {
  title: string;
  content: string;
  category: AnnouncementCategory;
  audience: AudienceType;
  priority: Priority;
  expiresAt: string;
}

interface AnnouncementState {
  filterCategory: AnnouncementCategory | 'All';
  searchQuery: string;
  formData: AnnouncementFormState;
  currentStep: number;
}

const initialState: AnnouncementState = {
  filterCategory: 'All',
  searchQuery: '',
  formData: {
    title: '',
    content: '',
    category: 'General',
    audience: 'All Users',
    priority: 'Low',
    expiresAt: ''
  },
  currentStep: 1,
};

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<AnnouncementCategory | 'All'>) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<AnnouncementFormState>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.currentStep = 1;
    }
  },
});

export const { setFilterCategory, setSearchQuery, updateFormData, setStep, resetForm } = announcementSlice.actions;
export default announcementSlice.reducer;
