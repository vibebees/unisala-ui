import * as Avatar from '@radix-ui/react-avatar';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  oneLinerBio: string | null;
  picture: string | null;
  name: string;
  _id: string;
}

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const fullName = user.name || `${user.firstName} ${user.lastName}`;
  const profileUrl = `/signature/${fullName.replace(/\s+/g, '-')}-${user._id}`;

  return (
    <a 
      href={profileUrl}
      className="block no-underline"
      data-astro-reload
    >
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
        <Avatar.Root>
          <Avatar.Image
            src={user.picture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username || fullName}`}
            alt={fullName}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
          />
          <Avatar.Fallback 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            {fullName[0]?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>

        <div className="flex-grow min-w-0">
          <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
            {fullName}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
            {user.oneLinerBio || `@${user.username}`}
          </p>
        </div>

        <div className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
          View Profile
        </div>
      </div>
    </a>
  );
};