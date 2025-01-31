/* eslint-disable no-unused-vars */

interface IAuthContext {
  user: IAuthData | null;
  authenticated: boolean;
  UpdateAuth: (data: IAuthData) => void;
  ClearAuth: () => void;
  UpdateNewUser: () => void;
  loading: boolean;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  oneLinerBio?: string;
  coverPicture?: string;
  picture?: string;
  location?: string;
  name?: string;
  interestedSubjects?: string;
  position?: string;
}

interface IAuthData extends IUser {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
  role: string | number;
}
