import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WizardState {
  step: number;
  data: {
    title: string;
    description: string;
    type: string;
    categoryId: string;
    providerName: string;
    website: string;
    eligibleSchools: string[];
    requiredDocuments: string[];
  };
}

const initialState: WizardState = {
  step: 1,
  data: {
    title: '',
    description: '',
    type: '',
    categoryId: '',
    providerName: '',
    website: '',
    eligibleSchools: [],
    requiredDocuments: []
  },
};

const opportunityWizardSlice = createSlice({
  name: 'opportunityWizard',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateData: (state, action: PayloadAction<Partial<WizardState['data']>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetWizard: (state) => {
      state.step = 1;
      state.data = initialState.data;
    },
  },
});

export const { setStep, updateData, resetWizard } = opportunityWizardSlice.actions;
export default opportunityWizardSlice.reducer;
