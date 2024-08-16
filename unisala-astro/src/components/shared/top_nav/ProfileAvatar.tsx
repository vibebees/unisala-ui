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
import { authenticated, getCache } from "@/utils/cache";
import DarkModeToggle from "@/components/ui/theme-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileIcon } from "@/components/packages/icons/profile";

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
      <div className="relative flex-grow max-w-2xl">

       
      </div>

      <ThemeToggle />
      {/* <a href="/auth">
        <ProfileIcon />
      </a> */}
    </div>
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <Avatar>
            <AvatarImage
              className="select-none"
              src="https://github.com/shadcn.png"
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
