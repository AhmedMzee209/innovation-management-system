import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WidgetConfig {
  id: string;
  type: 'kpi' | 'line' | 'bar' | 'pie' | 'area';
  title: string;
  visible: boolean;
  order: number;
}

interface DashboardState {
  isSidebarOpen: boolean;
  isRightPanelOpen: boolean;
  isEditing: boolean;
  widgets: WidgetConfig[];
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'w1', type: 'kpi', title: 'Overall Performance', visible: true, order: 0 },
  { id: 'w2', type: 'line', title: 'Innovation Growth', visible: true, order: 1 },
  { id: 'w3', type: 'pie', title: 'School Distribution', visible: true, order: 2 },
  { id: 'w4', type: 'bar', title: 'Monthly Submissions', visible: true, order: 3 },
  { id: 'w5', type: 'area', title: 'Funding Utilization', visible: true, order: 4 },
  { id: 'w6', type: 'pie', title: 'Startup Stages', visible: false, order: 5 },
];

const initialState: DashboardState = {
  isSidebarOpen: true, // Default to open on desktop
  isRightPanelOpen: false,
  isEditing: false,
  widgets: DEFAULT_WIDGETS,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleRightPanel: (state) => {
      state.isRightPanelOpen = !state.isRightPanelOpen;
    },
    setRightPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isRightPanelOpen = action.payload;
    },
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing;
    },
    toggleWidgetVisibility: (state, action: PayloadAction<string>) => {
      const widget = state.widgets.find(w => w.id === action.payload);
      if (widget) {
        widget.visible = !widget.visible;
      }
    },
    moveWidget: (state, action: PayloadAction<{ id: string, direction: 'up' | 'down' }>) => {
      const { id, direction } = action.payload;
      const index = state.widgets.findIndex(w => w.id === id);
      if (index === -1) return;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < state.widgets.length) {
        const tempOrder = state.widgets[index].order;
        state.widgets[index].order = state.widgets[newIndex].order;
        state.widgets[newIndex].order = tempOrder;
        state.widgets.sort((a, b) => a.order - b.order);
      }
    },
    resetDashboard: (state) => {
      state.widgets = DEFAULT_WIDGETS;
    }
  },
});

export const { 
  toggleSidebar, 
  setSidebarOpen, 
  toggleRightPanel, 
  setRightPanelOpen,
  toggleEditMode,
  toggleWidgetVisibility,
  moveWidget,
  resetDashboard
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
