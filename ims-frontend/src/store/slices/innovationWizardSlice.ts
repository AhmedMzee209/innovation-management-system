import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WizardState {
  currentStep: number;
  formData: any; // Using any for dummy form aggregation
  isSubmitting: boolean;
  isComplete: boolean;
}

const initialState: WizardState = {
  currentStep: 1,
  formData: {},
  isSubmitting: false,
  isComplete: false,
};

const innovationWizardSlice = createSlice({
  name: 'innovationWizard',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 6) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    goToStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= 6) {
        state.currentStep = action.payload;
      }
    },
    updateFormData: (state, action: PayloadAction<any>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },
    resetWizard: (state) => {
      return initialState;
    }
  },
});

export const { 
  nextStep, 
  prevStep, 
  goToStep, 
  updateFormData, 
  setSubmitting, 
  setComplete,
  resetWizard 
} = innovationWizardSlice.actions;

export default innovationWizardSlice.reducer;
