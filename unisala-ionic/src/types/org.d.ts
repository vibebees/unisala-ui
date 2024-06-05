interface ResStatus {
  __typename: string;
  success: boolean;
  message: string;
}

interface User {
  __typename: string;
  _id: string;
  firstName: string;
  lastName: string;
  picture: string | null;
  username: string;
}

interface SpaceOrg {
  __typename: string;
  name: string;
  _id: string;
  description: string;
  profileImage: string | null;
  coverImage: string | null;
  image: string | null;
  admin: User;
  role: string | null;
  isJoined: boolean;
}

interface OrgSpaceResponse {
  __typename: string;
  status: ResStatus;
  data: SpaceOrg;
}

// eslint-disable-next-line no-unused-vars
interface GetOrgSpaceByIdResponse {
  getOrgSpaceById: OrgSpaceResponse;
}
