import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsAdminState {
  isDirty: boolean;
  isSaving: boolean;
  activeSection: string;
}

const initialState: SettingsAdminState = {
  isDirty: false,
  isSaving: false,
  activeSection: 'general',
};

export const settingsAdminSlice = createSlice({
  name: 'settingsAdmin',
  initialState,
  reducers: {
    setDirty: (state, action: PayloadAction<boolean>) => { state.isDirty = action.payload; },
    setSaving: (state, action: PayloadAction<boolean>) => { state.isSaving = action.payload; },
    setActiveSection: (state, action: PayloadAction<string>) => { state.activeSection = action.payload; },
  },
});

export const { setDirty, setSaving, setActiveSection } = settingsAdminSlice.actions;
export default settingsAdminSlice.reducer;
