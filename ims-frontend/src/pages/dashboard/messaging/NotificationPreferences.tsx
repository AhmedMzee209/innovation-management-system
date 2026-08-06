import { useState } from 'react';
import { Bell, Mail, Smartphone, Globe, Shield, Save } from 'lucide-react';

export const NotificationPreferences = () => {
  const [prefs, setPrefs] = useState({
    email: {
      mentorship: true,
      funding: true,
      competitions: true,
      announcements: false,
      messages: true
    },
    push: {
      mentorship: true,
      funding: true,
      competitions: true,
      announcements: true,
      messages: true
    },
    sms: {
      mentorship: false,
      funding: true,
      competitions: false,
      announcements: false,
      messages: false
    }
  });

  const togglePref = (channel: 'email' | 'push' | 'sms', category: keyof typeof prefs.email) => {
    setPrefs(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [category]: !prev[channel][category]
      }
    }));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
          <Shield className="mr-3 text-[#0098c8]" size={28} />
          Notification Preferences
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control how and when you receive alerts from the system.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="col-span-1 font-bold text-sm text-gray-900 dark:text-white">Category</div>
          <div className="col-span-1 flex items-center justify-center gap-2 font-bold text-sm text-gray-600 dark:text-gray-300">
            <Mail size={16} /> Email
          </div>
          <div className="col-span-1 flex items-center justify-center gap-2 font-bold text-sm text-gray-600 dark:text-gray-300">
            <Globe size={16} /> Push
          </div>
          <div className="col-span-1 flex items-center justify-center gap-2 font-bold text-sm text-gray-600 dark:text-gray-300">
            <Smartphone size={16} /> SMS
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {[
            { id: 'messages', label: 'Direct Messages', desc: 'When someone sends you a direct message.' },
            { id: 'announcements', label: 'Announcements', desc: 'University and Hub-wide broadcasts.' },
            { id: 'funding', label: 'Funding Updates', desc: 'Alerts regarding your funding applications.' },
            { id: 'mentorship', label: 'Mentorship Sessions', desc: 'Reminders and updates for mentorship.' },
            { id: 'competitions', label: 'Competitions', desc: 'Event milestones and judging assignments.' }
          ].map((cat) => (
            <div key={cat.id} className="grid grid-cols-4 gap-4 p-6 items-center">
              <div className="col-span-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{cat.label}</h4>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
              
              <div className="col-span-1 flex justify-center">
                <Toggle 
                  checked={prefs.email[cat.id as keyof typeof prefs.email]} 
                  onChange={() => togglePref('email', cat.id as keyof typeof prefs.email)} 
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <Toggle 
                  checked={prefs.push[cat.id as keyof typeof prefs.push]} 
                  onChange={() => togglePref('push', cat.id as keyof typeof prefs.push)} 
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <Toggle 
                  checked={prefs.sms[cat.id as keyof typeof prefs.sms]} 
                  onChange={() => togglePref('sms', cat.id as keyof typeof prefs.sms)} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button className="px-6 py-2.5 bg-[#0098c8] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#007ba1] transition-colors flex items-center">
            <Save size={16} className="mr-2" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <button 
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0098c8] focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
      checked ? 'bg-[#0098c8]' : 'bg-gray-200 dark:bg-gray-700'
    }`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      checked ? 'translate-x-6' : 'translate-x-1'
    }`} />
  </button>
);
