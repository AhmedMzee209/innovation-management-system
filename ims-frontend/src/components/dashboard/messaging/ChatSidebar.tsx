import { Search, Pin, MessageSquare, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSearchQuery, setActiveConversation, toggleSidebar } from '@/store/slices/messageSlice';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS } from '@/data/mockMessaging';
import { format, formatDistanceToNow, isToday } from 'date-fns';
import { cn } from '@/lib/utils';

export const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { searchQuery, activeConversationId, isSidebarVisible } = useSelector((state: RootState) => state.message);

  // Derive conversation list with latest message and unread counts
  const conversations = MOCK_CONVERSATIONS.map(conv => {
    const messages = MOCK_MESSAGES.filter(m => m.conversationId === conv.id);
    const lastMsg = messages[messages.length - 1];
    const unreadCount = messages.filter(m => !m.isRead && m.senderId !== MOCK_USERS[0].id).length;
    
    // Determine title and avatar for UI
    let title = 'Conversation';
    let avatarUrl = '';
    
    if (conv.isGroup) {
      title = conv.groupName || 'Group Chat';
      avatarUrl = conv.groupAvatar || '';
    } else {
      const otherUser = MOCK_USERS.find(u => u.id === conv.participants.find(p => p !== MOCK_USERS[0].id));
      title = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown User';
      avatarUrl = otherUser?.avatarUrl || `https://ui-avatars.com/api/?name=${otherUser?.firstName}+${otherUser?.lastName}`;
    }

    return { ...conv, lastMsg, unreadCount, title, avatarUrl };
  }).filter(conv => conv.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const pinned = conversations.filter(c => c.isPinned);
  const recent = conversations.filter(c => !c.isPinned);

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isToday(date) ? format(date, 'h:mm a') : formatDistanceToNow(date, { addSuffix: true });
  };

  if (!isSidebarVisible) return null;

  return (
    <div className={cn(
      "w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-[calc(100vh-4rem)]",
      !isSidebarVisible && "hidden md:flex" // on mobile, hide if not visible
    )}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <MessageSquare className="mr-2 text-[#0098c8]" size={24} />
            Messages
          </h2>
          <button className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[#0098c8] flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
            <Plus size={18} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-medium outline-none dark:text-white focus:ring-2 focus:ring-[#0098c8] transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
        {pinned.length > 0 && (
          <div className="mb-4">
            <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
              <Pin size={12} className="mr-1" /> Pinned
            </h3>
            {pinned.map(conv => (
              <ConversationItem 
                key={conv.id} 
                conv={conv} 
                isActive={activeConversationId === conv.id} 
                onClick={() => dispatch(setActiveConversation(conv.id))} 
                time={formatTime(conv.lastMsg?.createdAt)}
              />
            ))}
          </div>
        )}

        <div>
          <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent</h3>
          {recent.map(conv => (
            <ConversationItem 
              key={conv.id} 
              conv={conv} 
              isActive={activeConversationId === conv.id} 
              onClick={() => dispatch(setActiveConversation(conv.id))} 
              time={formatTime(conv.lastMsg?.createdAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ConversationItem = ({ conv, isActive, onClick, time }: { conv: any, isActive: boolean, onClick: () => void, time: string }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 flex items-start transition-colors",
        isActive 
          ? "bg-blue-50/80 dark:bg-blue-900/20 border-l-2 border-[#0098c8]" 
          : "border-l-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50"
      )}
    >
      <div className="relative mr-3 shrink-0">
        <img src={conv.avatarUrl} alt={conv.title} className="w-12 h-12 rounded-xl object-cover" />
        {conv.unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 text-[9px] font-bold text-white flex items-center justify-center">
            {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className={cn(
            "text-sm truncate",
            conv.unreadCount > 0 ? "font-bold text-gray-900 dark:text-white" : "font-semibold text-gray-700 dark:text-gray-200"
          )}>{conv.title}</h4>
          <span className={cn(
            "text-[11px] shrink-0 ml-2",
            conv.unreadCount > 0 ? "font-bold text-[#0098c8]" : "text-gray-400"
          )}>{time}</span>
        </div>
        <p className={cn(
          "text-xs truncate",
          conv.unreadCount > 0 ? "font-semibold text-gray-800 dark:text-gray-300" : "text-gray-500"
        )}>
          {conv.lastMsg?.senderId === MOCK_USERS[0].id && "You: "}
          {conv.lastMsg?.attachments ? '📎 Attachment' : conv.lastMsg?.content}
        </p>
      </div>
    </button>
  );
};
