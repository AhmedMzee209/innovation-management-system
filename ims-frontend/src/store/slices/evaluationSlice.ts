import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EvaluationScore } from '@/data/mockReviews';

interface EvaluationState {
  activeReviewId: string | null;
  scores: Record<string, number>; // criteriaId -> score
  remarks: Record<string, string>; // criteriaId -> remarks
  strengths: string;
  weaknesses: string;
  recommendations: string;
  decision: string | null;
}

const initialState: EvaluationState = {
  activeReviewId: null,
  scores: {},
  remarks: {},
  strengths: '',
  weaknesses: '',
  recommendations: '',
  decision: null,
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    initializeEvaluation: (state, action: PayloadAction<string>) => {
      state.activeReviewId = action.payload;
      state.scores = {};
      state.remarks = {};
      state.strengths = '';
      state.weaknesses = '';
      state.recommendations = '';
      state.decision = null;
    },
    setScore: (state, action: PayloadAction<{ criteriaId: string; score: number }>) => {
      state.scores[action.payload.criteriaId] = action.payload.score;
    },
    setRemark: (state, action: PayloadAction<{ criteriaId: string; remark: string }>) => {
      state.remarks[action.payload.criteriaId] = action.payload.remark;
    },
    setGlobalFeedback: (state, action: PayloadAction<{ field: 'strengths' | 'weaknesses' | 'recommendations'; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    setDecision: (state, action: PayloadAction<string>) => {
      state.decision = action.payload;
    },
    resetEvaluation: () => initialState,
  },
});

export const {
  initializeEvaluation,
  setScore,
  setRemark,
  setGlobalFeedback,
  setDecision,
  resetEvaluation
} = evaluationSlice.actions;

export default evaluationSlice.reducer;
