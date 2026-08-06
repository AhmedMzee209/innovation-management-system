import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface UploadState {
  isUploadQueueOpen: boolean;
  items: UploadItem[];
}

const initialState: UploadState = {
  isUploadQueueOpen: false,
  items: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addFilesToQueue: (state, action: PayloadAction<File[]>) => {
      const newItems = action.payload.map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: 'pending' as const
      }));
      state.items.push(...newItems);
      state.isUploadQueueOpen = true;
    },
    updateProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.progress = action.payload.progress;
        item.status = 'uploading';
      }
    },
    markCompleted: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.progress = 100;
        item.status = 'completed';
      }
    },
    markError: (state, action: PayloadAction<{ id: string; error: string }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.status = 'error';
        item.error = action.payload.error;
      }
    },
    toggleQueueVisibility: (state) => {
      state.isUploadQueueOpen = !state.isUploadQueueOpen;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(i => i.status !== 'completed');
      if (state.items.length === 0) {
        state.isUploadQueueOpen = false;
      }
    }
  },
});

export const { 
  addFilesToQueue, 
  updateProgress, 
  markCompleted, 
  markError, 
  toggleQueueVisibility,
  clearCompleted
} = uploadSlice.actions;

export default uploadSlice.reducer;
