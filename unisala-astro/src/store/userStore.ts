import { atom } from "nanostores";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  authenticated: boolean;
}

export const userStore = atom<User>({
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  authenticated: false,
});

export const setUser = (user: User) => {
  userStore.set(user);
};

export const clearUser = () => {
  userStore.set({
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    authenticated: false,
  });
};
