import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationStatus } from '@/data/mockFunding';

interface FundingAppState {
  appSearchQuery: string;
  appStatusFilter: ApplicationStatus | 'All';
  
  // Wizard State
  wizardStep: number;
  wizardData: {
    startupId: string;
    programId: string;
    requestedAmount: number;
    budgetBreakdown: {
      equipment: number;
      operations: number;
      marketing: number;
      humanResources: number;
      research: number;
      other: number;
    };
    [key: string]: any;
  };
}

const initialWizardData = {
  startupId: '',
  programId: '',
  requestedAmount: 0,
  budgetBreakdown: {
    equipment: 0,
    operations: 0,
    marketing: 0,
    humanResources: 0,
    research: 0,
    other: 0,
  }
};

const initialState: FundingAppState = {
  appSearchQuery: '',
  appStatusFilter: 'All',
  wizardStep: 1,
  wizardData: initialWizardData,
};

const fundingAppSlice = createSlice({
  name: 'fundingApp',
  initialState,
  reducers: {
    setAppSearchQuery: (state, action: PayloadAction<string>) => {
      state.appSearchQuery = action.payload;
    },
    setAppStatusFilter: (state, action: PayloadAction<ApplicationStatus | 'All'>) => {
      state.appStatusFilter = action.payload;
    },
    setWizardStep: (state, action: PayloadAction<number>) => {
      state.wizardStep = action.payload;
    },
    updateWizardData: (state, action: PayloadAction<Partial<typeof initialWizardData>>) => {
      state.wizardData = { ...state.wizardData, ...action.payload };
    },
    updateBudgetBreakdown: (state, action: PayloadAction<Partial<typeof initialWizardData.budgetBreakdown>>) => {
      state.wizardData.budgetBreakdown = { ...state.wizardData.budgetBreakdown, ...action.payload };
    },
    resetWizard: (state) => {
      state.wizardStep = 1;
      state.wizardData = initialWizardData;
    }
  },
});

export const {
  setAppSearchQuery,
  setAppStatusFilter,
  setWizardStep,
  updateWizardData,
  updateBudgetBreakdown,
  resetWizard
} = fundingAppSlice.actions;

export default fundingAppSlice.reducer;
