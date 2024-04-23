/* eslint-disable no-unused-vars */

interface IAuthContext {
  user: IAuthData | null;
  authenticated: boolean;
  UpdateAuth: (data: IAuthData) => void;
  ClearAuth: () => void;
  loading: boolean;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
}

interface IAuthData extends IUser {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
  role: string | number;
}
