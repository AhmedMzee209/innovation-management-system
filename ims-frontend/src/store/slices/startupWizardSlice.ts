import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StartupWizardState {
  currentStep: number;
  selectedInnovationId: string | null;
  formData: Record<string, any>;
  isSubmitting: boolean;
}

const initialState: StartupWizardState = {
  currentStep: 1,
  selectedInnovationId: null,
  formData: {},
  isSubmitting: false,
};

const startupWizardSlice = createSlice({
  name: 'startupWizard',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 5);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    setSelectedInnovation: (state, action: PayloadAction<string | null>) => {
      state.selectedInnovationId = action.payload;
      // Reset form when changing innovation
      state.formData = {};
      state.currentStep = 1;
    },
    updateFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetWizard: () => initialState,
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setSelectedInnovation,
  updateFormData,
  setSubmitting,
  resetWizard
} = startupWizardSlice.actions;

export default startupWizardSlice.reducer;
