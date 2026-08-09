import { Settings, Save, RotateCcw, LayoutDashboard, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleEditMode, toggleWidgetVisibility, moveWidget, resetDashboard } from '@/store/slices/dashboardSlice';
import { KPIWidget } from '@/components/dashboard/analytics/KPIWidget';
import { ChartCard } from '@/components/dashboard/analytics/ChartCard';
import { MOCK_KPIS, MOCK_MONTHLY_TRENDS, MOCK_SCHOOL_DISTRIBUTION, MOCK_FUNDING_BUDGET, MOCK_STARTUP_STAGES } from '@/data/mockAnalytics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#0098c8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const CustomDashboard = () => {
  const dispatch = useDispatch();
  const { isEditing, widgets } = useSelector((state: RootState) => state.dashboard);

  const visibleWidgets = [...widgets].filter(w => w.visible).sort((a, b) => a.order - b.order);

  const renderWidgetContent = (type: string) => {
    switch(type) {
      case 'kpi':
        return <KPIWidget title="Overall Score" value="84/100" trend="Top 10%" trendUp={true} icon={<LayoutDashboard size={24} />} />;
      case 'line':
        return (
          <ChartCard title="Innovation Growth">
            <LineChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="submissions" stroke="#0098c8" strokeWidth={3} />
            </LineChart>
          </ChartCard>
        );
      case 'pie':
        return (
          <ChartCard title="Distribution">
            <PieChart>
              <Pie data={MOCK_SCHOOL_DISTRIBUTION} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {MOCK_SCHOOL_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartCard>
        );
      case 'bar':
        return (
          <ChartCard title="Monthly Submissions">
            <BarChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="submissions" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>
        );
      case 'area':
        return (
          <ChartCard title="Funding Utilization">
            <AreaChart data={MOCK_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="funding" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </AreaChart>
          </ChartCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <LayoutDashboard className="mr-3 text-[#0098c8]" size={28} />
            Custom Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Personalize your view by enabling, disabling, and reordering widgets.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button onClick={() => dispatch(resetDashboard())} className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center">
                <RotateCcw size={16} className="mr-2" /> Reset
              </button>
              <button onClick={() => dispatch(toggleEditMode())} className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
                <Save size={16} className="mr-2" /> Done Editing
              </button>
            </>
          ) : (
            <button onClick={() => dispatch(toggleEditMode())} className="px-4 py-2 border border-[#0098c8] text-[#0098c8] bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center">
              <Settings size={16} className="mr-2" /> Edit Layout
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-500 mb-4 uppercase tracking-wider">Widget Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[...widgets].sort((a, b) => a.order - b.order).map((widget, index) => (
                  <div key={widget.id} className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => dispatch(toggleWidgetVisibility(widget.id))}
                        className={`p-1.5 rounded-lg transition-colors ${widget.visible ? 'text-[#0098c8] bg-blue-50 dark:bg-blue-900/30' : 'text-gray-400 bg-gray-100 dark:bg-gray-800'}`}
                      >
                        {widget.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <span className={`text-sm font-bold ${widget.visible ? 'text-gray-900 dark:text-white' : 'text-gray-400 line-through'}`}>
                        {widget.title}
                      </span>
                    </div>
                    {widget.visible && (
                      <div className="flex flex-col">
                        <button onClick={() => dispatch(moveWidget({ id: widget.id, direction: 'up' }))} disabled={index === 0} className="text-gray-400 hover:text-[#0098c8] disabled:opacity-30"><ArrowUp size={14} /></button>
                        <button onClick={() => dispatch(moveWidget({ id: widget.id, direction: 'down' }))} disabled={index === widgets.length - 1} className="text-gray-400 hover:text-[#0098c8] disabled:opacity-30"><ArrowDown size={14} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {visibleWidgets.map((widget) => (
            <motion.div 
              key={widget.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={widget.type === 'kpi' ? 'lg:col-span-2' : ''}
            >
              {renderWidgetContent(widget.type)}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {visibleWidgets.length === 0 && (
          <div className="lg:col-span-2 py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard is Empty</h3>
            <p className="text-sm text-gray-500 mb-4">Click "Edit Layout" to add widgets.</p>
            <button onClick={() => dispatch(toggleEditMode())} className="px-4 py-2 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors inline-flex items-center">
              <Settings size={16} className="mr-2" /> Edit Layout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
