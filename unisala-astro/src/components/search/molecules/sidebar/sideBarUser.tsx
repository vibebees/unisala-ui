import * as Avatar from '@radix-ui/react-avatar';
import type { User } from '../cards/userCard';

interface SidebarUsersProps {
  users: User[];
}


export const SidebarUsers = ({ users }: SidebarUsersProps) => {
    if (!users.length) return null;
  
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
        <h3 className="font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">
          People to follow
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 sm:gap-3">
              <Avatar.Root>
                <Avatar.Image
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <Avatar.Fallback className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700">
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
          ))}
        </div>
        {users.length > 5 && (
          <button className="mt-3 sm:mt-4 text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            See all
          </button>
        )}
      </div>
    );
  };
  