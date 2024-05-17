/* eslint-disable no-unused-vars */
interface IPost {
  __typename: string;
  section: string;
  postText: string;
  admissionAndApplicationRating: number;
  financialAidAndScholarshipRating: number;
  academicProgramsAndDepartmentRating: number;
  studentLifeAndServiceRating: number;
  careerAndAlumniResourceRating: number;
  upVoted: boolean;
  postTag: string;
  images: string[];
  upVoteCount: number;
  postCommentsCount: number;
  comment: Icomment[];
  type: "post" | "event" | "university" | "suggestedSpace" | "suggestedOrgs";
  saved: boolean;
  videoURL: string;
  event: IEvent;
  tags: ISpaceOrg[];
  date: string;
  _id: string;
  user: IUser;
  elevatorInfo: IElevatorInfo;
  studentCharges: IStudentCharges;
  suggestedOrgs: {
    name: string;
    type: string;
    spaces: ISpaceOrg[];
  };
  suggestedSpace: {
    name: string;
    type: string;
    spaces: ISpaceOrg[];
  };
  userEvaluation: IUserEvaluation;
  unitId: string;
  applied_level: string;
  status: boolean;
  attempt: number;
  university: string;
  conversation: string;
  major: string;
  uniName: string;
  similarSchools: ISimilarSchools;
  testScore: ITestScores;
  postType: string;
  levelOfStudy: string;
  gpa: number;
  testScoreMark: string;
  preferredLocation: string;
  anonymityOption: boolean;
  relationToMajor: boolean;
  attendAgain: boolean;
  universitySearch: string;
  reviewSubCategories: string;
  videoURL: string;
}

interface IEvent {
  _id: string;
  user: IUser;
  spaceOrg: ISpaceOrg;
  title: string;
  description: string;
  address: string;
  eventDate: string;
  interestedUsers: string[];
  images: string[];
  isRegistered: boolean;
}

enum EPostType {
  suggestMeUniversity = "suggestMeUniversity",
  questionAboutUniversity = "questionAboutUniversity",
  reviewUniversity = "reviewUniversity",
  others = "others",
  event = "event",
}

interface IsuggestMeUniversity {
  id: EPostType.suggestMeUniversity;
  levelOfStudy?: string;
  major?: string;
  preferredLocation?: string;
  postText: string;
  testScores?: string;
  testScoreMark?: {};
  gpa?: number;
}

interface IquestionAboutUniversity {
  id: EPostType.questionAboutUniversity;
  postText: string;
  levelOfStudy?: string;
  reviewSubCategories?: string;
  universitySearch?: string;
  unitId?: number;
}

interface IreviewUniversity {
  id: EPostType.reviewUniversity;
  levelOfStudy?: string;
  postText?: string;
  unitId?: number;
  universitySearch?: string;
  admissionAndApplicationRating?: number;
  financialAidAndScholarshipRating?: number;
  academicProgramsAndDepartmentRating?: number;
  major?: string;
  studentLifeAndServiceRating?: number;
  careerAndAlumniResourceRating?: number;
}

interface Iothers {
  id: EPostType.others;
  postText?: string;
}

interface Ievents {
  id: EPostType.event;
  spaceId: string;
  description: string;
  title: string;
  address: string;
  eventDate: string;
  images: string[];
}

type TPostDataType =
  | IsuggestMeUniversity
  | IquestionAboutUniversity
  | IreviewUniversity
  | Ievents
  | Iothers
  | null;
