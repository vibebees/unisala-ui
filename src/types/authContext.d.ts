interface IAuthContext {
  user: IUser | null;
  token: string;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
