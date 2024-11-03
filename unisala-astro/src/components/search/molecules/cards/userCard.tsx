import * as Avatar from '@radix-ui/react-avatar';

export interface User {
    id: string;
    name: string;
    bio: string;
    avatar: string;
    followersCount: number;
  }
  interface UserCardProps {
    user: User;
  }
  
  
  export const UserCard = ({ user }: UserCardProps) => (
    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
      <Avatar.Root>
        <Avatar.Image
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
        />
        <Avatar.Fallback className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 dark:bg-gray-700">
          {user.name[0]}
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex-grow min-w-0">
        <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
          {user.name}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {user.bio}
        </p>
      </div>
      <button className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
        Follow
      </button>
    </div>
  );
  