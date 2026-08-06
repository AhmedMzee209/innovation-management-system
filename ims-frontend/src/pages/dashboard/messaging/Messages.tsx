import { ChatSidebar } from '@/components/dashboard/messaging/ChatSidebar';
import { ChatWindow } from '@/components/dashboard/messaging/ChatWindow';

export const Messages = () => {
  return (
    <div className="flex w-full h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 overflow-hidden">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};
