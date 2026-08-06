import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  currentFolderId: string | null;
  viewMode: 'grid' | 'list';
  searchQuery: string;
  selectedDocumentIds: string[];
  previewDocumentId: string | null;
}

const initialState: DocumentState = {
  currentFolderId: null,
  viewMode: 'grid',
  searchQuery: '',
  selectedDocumentIds: [],
  previewDocumentId: null,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
      state.selectedDocumentIds = []; // clear selection on navigate
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleDocumentSelection: (state, action: PayloadAction<string>) => {
      if (state.selectedDocumentIds.includes(action.payload)) {
        state.selectedDocumentIds = state.selectedDocumentIds.filter(id => id !== action.payload);
      } else {
        state.selectedDocumentIds.push(action.payload);
      }
    },
    clearSelection: (state) => {
      state.selectedDocumentIds = [];
    },
    setPreviewDocument: (state, action: PayloadAction<string | null>) => {
      state.previewDocumentId = action.payload;
    }
  },
});

export const { 
  setCurrentFolder, 
  setViewMode, 
  setSearchQuery, 
  toggleDocumentSelection,
  clearSelection,
  setPreviewDocument
} = documentSlice.actions;

export default documentSlice.reducer;
