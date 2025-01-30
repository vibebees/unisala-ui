 
interface ITopSpace {
  _id: string;
  name: string;
}
interface SpaceReferenceProps {
  spaceCard?: boolean;
  references: ITopSpace[];
}

interface ISpaceOrg {
  _id: string;
  name: string;
  description: string;
  profileImage: string;
  coverImage: string;
  admin: IUser;
  members: IUser[];
  students: IUser[];
  alumini: IUser[];
  posts: IUser;
  faqs: IUser;
  annoucements: IUser;
  events: IUser;
  isActive: boolean;
  websiteLink: string;
  fundMeLink: string;
  unitid: string;
  totalStudents: number;
  isJoined: boolean;
  role: string;
  image: string;
}
