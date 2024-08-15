import { clearCache, setCache } from "@/utils/cache";
import { atom } from "nanostores";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
  id: string;
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
}

export const $user = atom<User>({
  email: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  id: "",
  newUser: false,
  refreshToken: "",
  authenticated: false,
});

export const setUser = (user: User) => {

  $user.set(user);

  setCache("authData", user);
};

export const clearUser = () => {
  $user.set({
    email: "",
    firstName: "",
    lastName: "",
    accessToken: "",
    id: "",
    newUser: false,
    refreshToken: "",
    authenticated: false,
  });
  clearCache();
};
