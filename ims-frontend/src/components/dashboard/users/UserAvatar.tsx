import { cn } from '@/lib/utils';
import { UserStatus } from '@/data/mockUsers';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  status?: UserStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const UserAvatar = ({ firstName, lastName, imageUrl, status, size = 'md', className }: UserAvatarProps) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-24 h-24 text-2xl',
  };

  const indicatorSize = {
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4 border-2',
    xl: 'w-6 h-6 border-4',
  };

  const statusColors = {
    Active: 'bg-green-500',
    Inactive: 'bg-gray-400',
    Pending: 'bg-yellow-500',
    Suspended: 'bg-red-500',
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          className={cn("rounded-full object-cover border border-gray-200 dark:border-gray-700", sizeClasses[size])}
        />
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-bold bg-[#0098c8]/10 text-[#0098c8] dark:bg-[#0098c8]/20 border border-[#0098c8]/20",
            sizeClasses[size]
          )}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900",
            statusColors[status],
            indicatorSize[size]
          )}
        />
      )}
    </div>
  );
};
