import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackupState {
  currentPage: number;
  filterType: string;
  filterStatus: string;
  isBackingUp: boolean;
  isRestoring: boolean;
  selectedBackupId: string | null;
  showBackupModal: boolean;
  showRestoreModal: boolean;
}

const initialState: BackupState = {
  currentPage: 1,
  filterType: 'All',
  filterStatus: 'All',
  isBackingUp: false,
  isRestoring: false,
  selectedBackupId: null,
  showBackupModal: false,
  showRestoreModal: false,
};

export const backupSlice = createSlice({
  name: 'backup',
  initialState,
  reducers: {
    setBackupPage: (state, action: PayloadAction<number>) => { state.currentPage = action.payload; },
    setBackupType: (state, action: PayloadAction<string>) => { state.filterType = action.payload; state.currentPage = 1; },
    setBackupStatus: (state, action: PayloadAction<string>) => { state.filterStatus = action.payload; state.currentPage = 1; },
    setIsBackingUp: (state, action: PayloadAction<boolean>) => { state.isBackingUp = action.payload; },
    setIsRestoring: (state, action: PayloadAction<boolean>) => { state.isRestoring = action.payload; },
    setSelectedBackup: (state, action: PayloadAction<string | null>) => { state.selectedBackupId = action.payload; },
    setShowBackupModal: (state, action: PayloadAction<boolean>) => { state.showBackupModal = action.payload; },
    setShowRestoreModal: (state, action: PayloadAction<boolean>) => { state.showRestoreModal = action.payload; },
  },
});

export const { setBackupPage, setBackupType, setBackupStatus, setIsBackingUp, setIsRestoring, setSelectedBackup, setShowBackupModal, setShowRestoreModal } = backupSlice.actions;
export default backupSlice.reducer;
