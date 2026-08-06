import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WizardState {
  step: number;
  data: {
    // Step 1: Info
    name: string;
    description: string;
    type: string;
    category: string;
    bannerColor: string;
    // Step 2: Schedule
    registrationStart: string;
    registrationEnd: string;
    startDate: string;
    endDate: string;
    venue: string;
    // Step 3: Eligibility
    maxTeams: number;
    // Step 4: Judging
    prizePool: number;
    organizer: string;
  };
}

const initialState: WizardState = {
  step: 1,
  data: {
    name: '',
    description: '',
    type: 'Hackathon',
    category: 'Technology',
    bannerColor: 'from-[#0098c8] to-blue-800',
    registrationStart: '',
    registrationEnd: '',
    startDate: '',
    endDate: '',
    venue: '',
    maxTeams: 20,
    prizePool: 0,
    organizer: '',
  },
};

const competitionWizardSlice = createSlice({
  name: 'competitionWizard',
  initialState,
  reducers: {
    setWizardStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateWizardData: (state, action: PayloadAction<Partial<WizardState['data']>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetWizard: (state) => {
      state.step = 1;
      state.data = initialState.data;
    },
  },
});

export const { setWizardStep, updateWizardData, resetWizard } = competitionWizardSlice.actions;
export default competitionWizardSlice.reducer;
