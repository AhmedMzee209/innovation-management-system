import { useState } from 'react';
import { MOCK_SESSIONS } from '@/data/mockMentorship';
import { MOCK_USERS } from '@/data/mockUsers';
import { MOCK_STARTUPS } from '@/data/mockStartups';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, MapPin, Plus } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const SessionCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('week');

  const nextWeek = () => setCurrentDate(addDays(currentDate, view === 'week' ? 7 : 30));
  const prevWeek = () => setCurrentDate(addDays(currentDate, view === 'week' ? -7 : -30));
  const today = () => setCurrentDate(new Date());

  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    
    return (
      <div className="grid grid-cols-7 border-t border-gray-200 dark:border-gray-800">
        {[...Array(7)].map((_, i) => {
          const date = addDays(startDate, i);
          const isToday = isSameDay(date, new Date());
          const daySessions = MOCK_SESSIONS.filter(s => isSameDay(parseISO(s.date), date))
                                           .sort((a, b) => a.time.localeCompare(b.time));

          return (
            <div key={i} className={cn(
              "min-h-[400px] border-r border-gray-200 dark:border-gray-800 p-2",
              isToday ? "bg-blue-50/30 dark:bg-blue-900/10" : ""
            )}>
              <div className="text-center mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase">{format(date, 'EEE')}</p>
                <p className={cn(
                  "text-lg font-black mt-1 w-8 h-8 mx-auto flex items-center justify-center rounded-full",
                  isToday ? "bg-[#0098c8] text-white" : "text-gray-900 dark:text-white"
                )}>{format(date, 'd')}</p>
              </div>

              <div className="space-y-2">
                {daySessions.map(session => {
                  const startup = MOCK_STARTUPS.find(s => s.id === session.startupId);
                  const isCompleted = session.status === 'Completed';
                  const isCancelled = session.status === 'Cancelled' || session.status === 'No Show';

                  return (
                    <Link 
                      to={`/dashboard/mentorship/sessions/${session.id}`}
                      key={session.id} 
                      className={cn(
                        "block p-2 rounded border text-left transition-colors group",
                        isCompleted ? "bg-green-50 border-green-200 hover:border-green-300 dark:bg-green-900/20 dark:border-green-900" :
                        isCancelled ? "bg-red-50 border-red-200 hover:border-red-300 dark:bg-red-900/20 dark:border-red-900" :
                        "bg-blue-50 border-blue-200 hover:border-blue-300 dark:bg-blue-900/20 dark:border-blue-900"
                      )}
                    >
                      <p className={cn(
                        "text-[10px] font-bold mb-1",
                        isCompleted ? "text-green-700 dark:text-green-400" :
                        isCancelled ? "text-red-700 dark:text-red-400" :
                        "text-blue-700 dark:text-blue-400"
                      )}>{session.time}</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:underline">{startup?.name}</p>
                      <div className="flex items-center mt-1 text-[10px] text-gray-500">
                        {session.meetingType === 'Virtual' ? <Video size={10} className="mr-1" /> : <MapPin size={10} className="mr-1" />}
                        <span className="truncate">{session.meetingType}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = addDays(startDate, 34); // Ensure 5 rows of 7 days
    
    const dateFormat = "d";
    const rows = [];
    
    let days = [];
    let day = startDate;
    let formattedDate = "";
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        const daySessions = MOCK_SESSIONS.filter(s => isSameDay(parseISO(s.date), day));
        
        days.push(
          <div
            className={cn(
              "min-h-[120px] p-2 border-b border-r border-gray-200 dark:border-gray-800 transition-colors",
              !isCurrentMonth ? "bg-gray-50 dark:bg-gray-900/50 text-gray-400" : "bg-white dark:bg-gray-900",
              isToday ? "bg-blue-50/30 dark:bg-blue-900/10" : ""
            )}
            key={day.toISOString()}
          >
            <div className="flex justify-end">
              <span className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold",
                isToday ? "bg-[#0098c8] text-white" : isCurrentMonth ? "text-gray-900 dark:text-white" : "text-gray-400"
              )}>
                {formattedDate}
              </span>
            </div>
            
            <div className="mt-2 space-y-1">
              {daySessions.slice(0, 3).map(session => (
                <div key={session.id} className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded truncate font-medium",
                  session.status === 'Completed' ? "bg-green-100 text-green-700" :
                  session.status === 'Cancelled' ? "bg-red-100 text-red-700" :
                  "bg-blue-100 text-blue-700"
                )}>
                  {session.time} - {MOCK_STARTUPS.find(s => s.id === session.startupId)?.name}
                </div>
              ))}
              {daySessions.length > 3 && (
                <div className="text-[10px] text-gray-500 font-bold px-1.5">
                  +{daySessions.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return (
      <div>
        <div className="grid grid-cols-7 border-t border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200 dark:border-gray-800">
              {day}
            </div>
          ))}
        </div>
        <div className="border-l border-gray-200 dark:border-gray-800">
          {rows}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center">
            <CalendarIcon className="mr-3 text-[#0098c8]" size={28} />
            Session Calendar
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and view all upcoming mentorship sessions.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              onClick={() => setView('month')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-bold transition-all",
                view === 'month' ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-bold transition-all",
                view === 'week' ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              Week
            </button>
          </div>
          
          <button className="px-4 py-2 bg-[#0098c8] text-white rounded-lg text-sm font-bold hover:bg-[#007aa3] transition-colors shadow-sm flex items-center">
            <Plus size={16} className="mr-2" /> Schedule
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Calendar Header Control */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {format(currentDate, view === 'month' ? 'MMMM yyyy' : 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <button onClick={today} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Today
            </button>
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button onClick={prevWeek} className="p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-700">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextWeek} className="p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {view === 'week' ? renderWeekView() : renderMonthView()}
          </div>
        </div>

      </div>
    </div>
  );
};
