import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $user, clearUser, setUser } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCache } from "@/utils/cache";
import DarkModeToggle from "@/components/ui/theme-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileIcon } from "@/components/packages/icons/profile";
import { SearchIcon } from "@/components/packages/icons/search";

const ProfileAvatar = () => {
  const user = useStore($user);

  useEffect(() => {
    const userCache: any = getCache("authData");
    if (
      userCache &&
      !user.authenticated &&
      userCache.accessToken &&
      userCache.refreshToken
    ) {
      setUser(userCache);
    }
  }, []);

  if (!user.authenticated) {
    return (
      <div className="flex gap-3 items-center">
        <a href="/universe/search?q=popular" data-astro-reload>
          <SearchIcon />
        </a>
        <a href="/auth" data-astro-reload>
          <ProfileIcon />
        </a>
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center">
      <a href="/universe/search?q=popular" data-astro-reload>
        <SearchIcon />
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <Avatar>
            <AvatarImage
              className="select-none"
              src={'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName}  
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-neutral-500 dark:text-neutral-300 font-normal">
            Signed in as{" "}
            <span className="font-semibold text-neutral-900 dark:text-neutral-50">
              {user.firstName}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a href={`/signature/${user?.firstName?.trim()}-${user?.lastName?.trim()}-${user.id}`} data-astro-reload className="w-full">
                Profile
              </a>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DarkModeToggle />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              clearUser();
            }}
          >
            Log out
            <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileAvatar;