import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSidebarVisible } from '@/store/slices/messageSlice';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS } from '@/data/mockMessaging';
import { ArrowLeft, MoreVertical, Phone, Video, Paperclip, Send, Smile, Info, FileText } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWindow = () => {
  const dispatch = useDispatch();
  const { activeConversationId, isSidebarVisible } = useSelector((state: RootState) => state.message);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversationId]);

  if (!activeConversationId) {
    return (
      <div className={`hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900/50`}>
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0098c8]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your Messages</h2>
          <p className="text-sm text-gray-500">Send private photos and messages to a friend or group.</p>
        </div>
      </div>
    );
  }

  const conv = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);
  if (!conv) return null;

  const messages = MOCK_MESSAGES.filter(m => m.conversationId === conv.id);
  
  let title = conv.groupName || 'Group Chat';
  let avatarUrl = conv.groupAvatar || '';
  let status = `${conv.participants.length} members`;

  if (!conv.isGroup) {
    const otherUser = MOCK_USERS.find(u => u.id === conv.participants.find(p => p !== MOCK_USERS[0].id));
    title = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown User';
    avatarUrl = otherUser?.avatarUrl || `https://ui-avatars.com/api/?name=${otherUser?.firstName}+${otherUser?.lastName}`;
    status = 'Online'; // Mock status
  }

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d, yyyy');
  };

  // Group messages by day
  const groupedMessages: { [key: string]: typeof messages } = {};
  messages.forEach(msg => {
    const dateLabel = formatMessageDate(msg.createdAt);
    if (!groupedMessages[dateLabel]) groupedMessages[dateLabel] = [];
    groupedMessages[dateLabel].push(msg);
  });

  return (
    <div className={`flex-1 flex flex-col h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900/50 ${!isSidebarVisible ? 'flex' : 'hidden md:flex'}`}>
      
      {/* Header */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center">
          <button 
            onClick={() => dispatch(setSidebarVisible(true))}
            className="mr-3 md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <img src={avatarUrl} alt={title} className="w-10 h-10 rounded-xl object-cover mr-3" />
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{title}</h2>
            <p className="text-[11px] text-[#0098c8] font-medium">{status}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
            <Phone size={18} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#0098c8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
            <Video size={18} />
          </button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
          <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {Object.entries(groupedMessages).map(([dateLabel, msgs]) => (
          <div key={dateLabel}>
            <div className="flex justify-center mb-6">
              <span className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-wider shadow-sm">
                {dateLabel}
              </span>
            </div>
            
            <div className="space-y-4">
              {msgs.map((msg, idx) => {
                const isMe = msg.senderId === MOCK_USERS[0].id;
                const sender = MOCK_USERS.find(u => u.id === msg.senderId);
                const showAvatar = idx === msgs.length - 1 || msgs[idx + 1].senderId !== msg.senderId;

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}
                  >
                    {!isMe && showAvatar && (
                      <img src={sender?.avatarUrl || `https://ui-avatars.com/api/?name=${sender?.firstName}`} alt="avatar" className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
                    )}
                    {!isMe && !showAvatar && <div className="w-8 mr-2"></div>}
                    
                    <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && conv.isGroup && showAvatar && (
                        <span className="text-[10px] text-gray-500 ml-1 mb-1 font-medium">{sender?.firstName} {sender?.lastName}</span>
                      )}
                      
                      <div className={`
                        relative px-4 py-2.5 shadow-sm
                        ${isMe 
                          ? 'bg-[#0098c8] text-white rounded-2xl rounded-tr-sm' 
                          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-tl-sm'
                        }
                      `}>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className={`flex items-center gap-2 p-2 rounded-xl mb-2 ${isMe ? 'bg-white/20' : 'bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700'}`}>
                            <FileText size={20} className={isMe ? 'text-white' : 'text-[#0098c8]'} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-bold truncate ${isMe ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{msg.attachments[0].name}</p>
                              <p className={`text-[10px] ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>{msg.attachments[0].size}</p>
                            </div>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        
                        <div className={`text-[9px] font-medium flex items-center justify-end mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                          {format(new Date(msg.createdAt), 'h:mm a')}
                          {isMe && msg.isRead && (
                            <svg className="w-3.5 h-3.5 ml-1 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      {/* Message Actions - Hover */}
                      <div className={`hidden group-hover:flex items-center gap-1 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"><Smile size={14} /></button>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"><MoreVertical size={14} /></button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shrink-0">
        <div className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-2xl p-1 shadow-sm border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-[#0098c8]/50 focus-within:border-[#0098c8] transition-all">
          <button className="p-3 text-gray-400 hover:text-[#0098c8] transition-colors shrink-0">
            <Paperclip size={20} />
          </button>
          
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 scrollbar-hide"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputText.trim()) setInputText('');
              }
            }}
          />
          
          <button className="p-3 text-gray-400 hover:text-amber-500 transition-colors shrink-0">
            <Smile size={20} />
          </button>
          <button 
            className={`p-3 rounded-xl shrink-0 transition-colors ${inputText.trim() ? 'bg-[#0098c8] text-white' : 'bg-transparent text-gray-300 dark:text-gray-600'}`}
          >
            <Send size={20} className={inputText.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};
