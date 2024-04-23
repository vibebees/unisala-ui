/* eslint-disable no-unused-vars */
interface ILoginInput {
  email: string;
  password: string;
  spaceOrgName: string | null;
  type: string | null;
  code: string | null;
}

interface ILoginInputErrors {
  email?: string;
  password?: string | null;
}

interface ISignupInput extends ILoginInput {
  firstName: string;
  lastName: string;
}

interface ISignupErrors extends ILoginInputErrors {
  firstName?: string;
  lastName?: string;
}
