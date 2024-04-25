/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISODate: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Act = {
  __typename?: 'ACT';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type ActScore = {
  __typename?: 'ACTScore';
  composite?: Maybe<TestScoreDetails>;
  english?: Maybe<TestScoreDetails>;
  math?: Maybe<TestScoreDetails>;
  percentSubmitted?: Maybe<Scalars['Int']['output']>;
  submitted?: Maybe<Scalars['Int']['output']>;
};

export type About = {
  __typename?: 'About';
  private?: Maybe<Scalars['Boolean']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type AboutQuery = {
  __typename?: 'AboutQuery';
  about?: Maybe<About>;
  status?: Maybe<ResStatus>;
};

export type Act = {
  __typename?: 'Act';
  composite?: Maybe<TestDataObj>;
  english?: Maybe<TestDataObj>;
  math?: Maybe<TestDataObj>;
  range?: Maybe<Range>;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  stateAbbreviation: Scalars['String']['output'];
  streetAddressOrPOBox: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type AfterCollege = {
  __typename?: 'AfterCollege';
  confidenceFindingJobSameFieldAfterGraduation?: Maybe<ConfidenceObj>;
  employed2YearAfterGraduation?: Maybe<EmployedAfter2YearObj>;
  graduationRate?: Maybe<GraduationRateObj>;
  medianEarning6YearsAfterGraduation?: Maybe<MedianEarningObj>;
  medianEarningsAfterGraduation?: Maybe<Scalars['Float']['output']>;
};

export type Aid = {
  __typename?: 'Aid';
  federalGrants?: Maybe<Grant>;
  general?: Maybe<Grant>;
  pellGrant?: Maybe<Grant>;
  stateGrants?: Maybe<Grant>;
  undergrad?: Maybe<Grant>;
};

export type AllEventResponse = {
  __typename?: 'AllEventResponse';
  data?: Maybe<Array<Maybe<SpaceEvent>>>;
  status?: Maybe<ResStatus>;
};

export type AllHistoryActivityResponse = {
  __typename?: 'AllHistoryActivityResponse';
  data?: Maybe<Array<Maybe<HistoryActivity>>>;
  status?: Maybe<ResStatus>;
};

export type AllOrgHistoryResponse = {
  __typename?: 'AllOrgHistoryResponse';
  data?: Maybe<Array<Maybe<OrgHistory>>>;
  status?: Maybe<ResStatus>;
};

export type Analytics = {
  __typename?: 'Analytics';
  eventRegistrations?: Maybe<Array<Maybe<EventRegistration>>>;
  faqViews?: Maybe<Array<Maybe<FaqView>>>;
  feedbackSubmitted?: Maybe<Scalars['Int']['output']>;
  invitation?: Maybe<Invitation>;
  monthlyVisits?: Maybe<Array<Maybe<MonthlyVisit>>>;
  postViews?: Maybe<Array<Maybe<PostView>>>;
  totalEvents?: Maybe<Scalars['Int']['output']>;
  totalFAQs?: Maybe<Scalars['Int']['output']>;
  totalPosts?: Maybe<Scalars['Int']['output']>;
  totalVisits?: Maybe<Scalars['Int']['output']>;
};

export type AnswerInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  answer?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['ISODate']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  step?: InputMaybe<Scalars['Int']['input']>;
};

export type AnswerQuery = {
  __typename?: 'AnswerQuery';
  _id?: Maybe<Scalars['ID']['output']>;
  answer?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['ISODate']['output']>;
  question?: Maybe<Scalars['String']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
};

export type Applicants = {
  __typename?: 'Applicants';
  acceptanceRate?: Maybe<Scalars['Float']['output']>;
  actRange?: Maybe<ScoreRange>;
  applicationFee?: Maybe<Scalars['Float']['output']>;
  earlyDecisionOrEarlyAction?: Maybe<Scalars['Boolean']['output']>;
  fallEnrollment?: Maybe<FallEnrollment>;
  highSchoolGpaRequirement?: Maybe<Scalars['String']['output']>;
  satOrActRequirement?: Maybe<Scalars['Boolean']['output']>;
  satRange?: Maybe<ScoreRange>;
};

export type ApplicantsType = {
  __typename?: 'ApplicantsType';
  totalAccepted?: Maybe<Scalars['Float']['output']>;
  totalApplicants?: Maybe<Scalars['Float']['output']>;
  totalEnrolled?: Maybe<TotalEnrolled>;
};

export type Aptitude_Test = {
  english?: InputMaybe<Scalars['Float']['input']>;
  maths?: InputMaybe<Scalars['Float']['input']>;
};

export type Awards = {
  __typename?: 'Awards';
  award_name?: Maybe<Scalars['String']['output']>;
  scholarship_amount?: Maybe<ScholarshipAmount>;
};

export type Badges = {
  __typename?: 'Badges';
  earnedBadges?: Maybe<Array<Maybe<EarnedBadges>>>;
  private?: Maybe<Scalars['Boolean']['output']>;
};

export type BestDescibesStudents = {
  __typename?: 'BestDescibesStudents';
  percentage?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BookmarkUniversityResponse = {
  __typename?: 'BookmarkUniversityResponse';
  status?: Maybe<ResStatus>;
  unitIds?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
};

export type Calander = {
  __typename?: 'Calander';
  system?: Maybe<Scalars['String']['output']>;
};

export type CampusLife = {
  __typename?: 'CampusLife';
  freshmanLiveOnCampus?: Maybe<Scalars['Float']['output']>;
  poll?: Maybe<Poll>;
};

export type Comment = {
  __typename?: 'Comment';
  _id?: Maybe<Scalars['ID']['output']>;
  commentImage?: Maybe<Scalars['String']['output']>;
  commentText?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  repliesCount?: Maybe<Scalars['Float']['output']>;
  replyTo?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type CommentDetails = {
  __typename?: 'CommentDetails';
  _id?: Maybe<Scalars['ID']['output']>;
  commentImage?: Maybe<Scalars['String']['output']>;
  commentText?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  repliesCount?: Maybe<Scalars['Float']['output']>;
  replyTo?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  username?: Maybe<Scalars['String']['output']>;
};

export type ConfidenceObj = {
  __typename?: 'ConfidenceObj';
  totalResponse?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type ConnectionType = {
  __typename?: 'ConnectionType';
  receiverId?: Maybe<Scalars['ID']['output']>;
  requestorId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export enum ContentType {
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Cost = {
  __typename?: 'Cost';
  averageTotalAidAwarded?: Maybe<Scalars['Float']['output']>;
  nationalAverageAid?: Maybe<Scalars['Float']['output']>;
  netPrice?: Maybe<Scalars['Float']['output']>;
  percentageReceivingAid?: Maybe<Scalars['Float']['output']>;
};

export type CostOfAttendance = {
  __typename?: 'CostOfAttendance';
  inDistrict?: Maybe<Scalars['Int']['output']>;
  inState?: Maybe<Scalars['Int']['output']>;
  outOfState?: Maybe<Scalars['Int']['output']>;
};

export type CustomFilterInput = {
  operator?: InputMaybe<Scalars['String']['input']>;
  property?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type DateRange = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type Diversity = {
  __typename?: 'Diversity';
  africanAmerican?: Maybe<DiversityObj>;
  all?: Maybe<DiversityObj>;
  americanIndianOrAlaskaNative?: Maybe<DiversityObj>;
  asian?: Maybe<DiversityObj>;
  hispanic?: Maybe<DiversityObj>;
  nativeHawaiianOrPacificIslander?: Maybe<DiversityObj>;
  nonResidentAlien?: Maybe<DiversityObj>;
  twoOrMoreRaces?: Maybe<DiversityObj>;
  unknownEthnicity?: Maybe<DiversityObj>;
  white?: Maybe<DiversityObj>;
};

export type DiversityObj = {
  __typename?: 'DiversityObj';
  associate?: Maybe<Scalars['Float']['output']>;
  bachelors?: Maybe<Scalars['Float']['output']>;
  masters?: Maybe<Scalars['Float']['output']>;
};

export type EarnedBadges = {
  __typename?: 'EarnedBadges';
  date?: Maybe<Scalars['ISODate']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Education = {
  __typename?: 'Education';
  private?: Maybe<Scalars['Boolean']['output']>;
  schools?: Maybe<Array<Maybe<Schools>>>;
};

export type ElevatorInfo = {
  __typename?: 'ElevatorInfo';
  address?: Maybe<Address>;
  calander?: Maybe<Calander>;
  city?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownTyple?: Maybe<Scalars['String']['output']>;
  urls?: Maybe<Urls>;
};

export type EmployedAfter2YearObj = {
  __typename?: 'EmployedAfter2YearObj';
  national?: Maybe<Scalars['Float']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
};

export type English_Test = {
  score?: InputMaybe<Scalars['Float']['input']>;
};

export type Enrollees = {
  __typename?: 'Enrollees';
  fullTime?: Maybe<YearlyApplicantData>;
  partTime?: Maybe<YearlyApplicantData>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Enrollment = {
  __typename?: 'Enrollment';
  allStudents?: Maybe<StudentObj>;
  continuing?: Maybe<StudentObj>;
  undergrad?: Maybe<StudentObj>;
};

export type EnrollmentByRace = {
  __typename?: 'EnrollmentByRace';
  americanIndianOrAlaskaNative?: Maybe<Scalars['Int']['output']>;
  asian?: Maybe<Scalars['Int']['output']>;
  blackOrAfricanAmerican?: Maybe<Scalars['Int']['output']>;
  grandTotal?: Maybe<Scalars['Int']['output']>;
  hispanic?: Maybe<Scalars['Int']['output']>;
  nativeHawaiianOrOtherPacificIslander?: Maybe<Scalars['Int']['output']>;
  nonresidentAlien?: Maybe<Scalars['Int']['output']>;
  white?: Maybe<Scalars['Int']['output']>;
};

export type Event = {
  date?: InputMaybe<Scalars['ISODate']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type EventInterestedUser = {
  __typename?: 'EventInterestedUser';
  userId?: Maybe<Scalars['String']['output']>;
};

export type EventRegistration = {
  __typename?: 'EventRegistration';
  count?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['ID']['output']>;
};

export type FaqView = {
  __typename?: 'FAQView';
  faqId?: Maybe<Scalars['ID']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type FallEnrollment = {
  __typename?: 'FallEnrollment';
  men?: Maybe<ApplicantsType>;
  total?: Maybe<ApplicantsType>;
  women?: Maybe<ApplicantsType>;
};

export type FamousRatedUniversityQuery = {
  __typename?: 'FamousRatedUniversityQuery';
  major?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  unitIds?: Maybe<Array<Maybe<FamousUniversity>>>;
};

export type FamousUniversity = {
  __typename?: 'FamousUniversity';
  alias?: Maybe<Scalars['String']['output']>;
  departmentRating?: Maybe<Scalars['Float']['output']>;
  totalPeopleVoted?: Maybe<Scalars['Int']['output']>;
  uniName?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type Fee = {
  __typename?: 'Fee';
  fee?: Maybe<Scalars['Float']['output']>;
};

export type FeeStructure = {
  __typename?: 'FeeStructure';
  inState?: Maybe<InAndOutStateFee>;
  otherExpenses?: Maybe<Scalars['Float']['output']>;
  outState?: Maybe<InAndOutStateFee>;
  roomAndBoard?: Maybe<Scalars['Float']['output']>;
};

export type FeedQueryInput = {
  afterCursor?: InputMaybe<Scalars['String']['input']>;
  beforeCursor?: InputMaybe<Scalars['String']['input']>;
  commentsLimit?: InputMaybe<Scalars['Int']['input']>;
  continueFrom?: InputMaybe<Scalars['String']['input']>;
  customFilter?: InputMaybe<CustomFilterInput>;
  excludeContentTypes?: InputMaybe<Array<InputMaybe<ContentType>>>;
  feedId?: InputMaybe<Scalars['ID']['input']>;
  feedType?: InputMaybe<Scalars['String']['input']>;
  filterByDateRange?: InputMaybe<DateRange>;
  filterByTags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  includeComments?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchKeyword?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SortBy>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type FeesUnderAndGrad = {
  __typename?: 'FeesUnderAndGrad';
  grad?: Maybe<UndergradAndGradFeeObj>;
  undergrad?: Maybe<UndergradAndGradFeeObj>;
};

export type FinancialAidSchema = {
  __typename?: 'FinancialAidSchema';
  averageAmountAid?: Maybe<Scalars['Int']['output']>;
  inDistrict?: Maybe<StudentCohort>;
  inState?: Maybe<StudentCohort>;
  numberOfStudentInThatFall?: Maybe<Scalars['Int']['output']>;
  outOfState?: Maybe<StudentCohort>;
  percentOfAllUndergraduatesInThatFall?: Maybe<Scalars['Int']['output']>;
  totalNumberOfUndergraduatesInThatFall?: Maybe<Scalars['Int']['output']>;
  undergraudate?: Maybe<UndergraduateInfo>;
  unitId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type FirstTimeUndergraduates = {
  __typename?: 'FirstTimeUndergraduates';
  foreignCountries?: Maybe<Scalars['Int']['output']>;
  inState?: Maybe<Scalars['Int']['output']>;
  outOfState?: Maybe<Scalars['Int']['output']>;
};

export type Gpa = {
  __typename?: 'GPA';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type GenerateReferral = {
  __typename?: 'GenerateReferral';
  referral?: Maybe<GenerateReferralCode>;
  status?: Maybe<ResStatus>;
};

export type GenerateReferralCode = {
  __typename?: 'GenerateReferralCode';
  _id?: Maybe<Scalars['ID']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  enrollUserId?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  expiresAt?: Maybe<Scalars['ISODate']['output']>;
  ipAddress?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  referredBy?: Maybe<Scalars['ID']['output']>;
};

export type GetAllOrgSpaceResponse = {
  __typename?: 'GetAllOrgSpaceResponse';
  data?: Maybe<Array<Maybe<SpaceOrg>>>;
  status?: Maybe<ResStatus>;
};

export type GetPostDetailsQuery = {
  __typename?: 'GetPostDetailsQuery';
  post?: Maybe<PostComment>;
  status?: Maybe<ResStatus>;
};

export type GetPostQuery = {
  __typename?: 'GetPostQuery';
  data?: Maybe<Post>;
  status?: Maybe<ResStatus>;
};

export type GetUserQuery = {
  __typename?: 'GetUserQuery';
  connectionType?: Maybe<ConnectionType>;
  status?: Maybe<ResStatus>;
  user?: Maybe<User>;
};

export type Graduate = {
  __typename?: 'Graduate';
  inDistrict?: Maybe<Tuition>;
  inState?: Maybe<Tuition>;
  outOfState?: Maybe<Tuition>;
};

export type GraduationRateObj = {
  __typename?: 'GraduationRateObj';
  national?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type GraduationRates = {
  __typename?: 'GraduationRates';
  americanIndianOrAlaskaNative?: Maybe<Scalars['Int']['output']>;
  asian?: Maybe<Scalars['Int']['output']>;
  blackOrAfricanAmerican?: Maybe<Scalars['Int']['output']>;
  hispanic?: Maybe<Scalars['Int']['output']>;
  men?: Maybe<Scalars['Int']['output']>;
  nonResidentAlien?: Maybe<Scalars['Int']['output']>;
  raceEthnicityUnknown?: Maybe<Scalars['Int']['output']>;
  totalCohort?: Maybe<Scalars['Int']['output']>;
  twoOrMoreRaces?: Maybe<Scalars['Int']['output']>;
  unitId: Scalars['Int']['output'];
  white?: Maybe<Scalars['Int']['output']>;
  women?: Maybe<Scalars['Int']['output']>;
};

export type Grant = {
  __typename?: 'Grant';
  averageAmount?: Maybe<Scalars['Float']['output']>;
  averageAmountAidReceived?: Maybe<Scalars['Float']['output']>;
  percentageReceivingAid?: Maybe<Scalars['Float']['output']>;
};

export type Grants = {
  __typename?: 'Grants';
  aid?: Maybe<Aid>;
};

export type Guestbook = {
  __typename?: 'Guestbook';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type GuestbookQuery = {
  __typename?: 'GuestbookQuery';
  guestbook?: Maybe<Array<Maybe<Guestbook>>>;
  status?: Maybe<ResStatus>;
};

export type HistoryActivity = {
  __typename?: 'HistoryActivity';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  orgHistoryId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type HistoryActivityResponse = {
  __typename?: 'HistoryActivityResponse';
  data?: Maybe<HistoryActivity>;
  status?: Maybe<ResStatus>;
};

export type ImageResponse = {
  __typename?: 'ImageResponse';
  imageBuffer?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type InstitutionCharacterSchema = {
  __typename?: 'InstitutionCharacterSchema';
  address: Address;
  alias: Scalars['String']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  briefAddress?: Maybe<Scalars['String']['output']>;
  calendar?: Maybe<Scalars['String']['output']>;
  graduateOffering?: Maybe<Scalars['String']['output']>;
  grantsMedicalDegree?: Maybe<Scalars['String']['output']>;
  hasHospital?: Maybe<Scalars['String']['output']>;
  highestLevelOfOffering?: Maybe<Scalars['String']['output']>;
  library?: Maybe<Library>;
  majors?: Maybe<Array<Maybe<MajorObj>>>;
  missionStatement?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  ownType?: Maybe<Scalars['String']['output']>;
  pictures?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  undergraduateOffering?: Maybe<Scalars['String']['output']>;
  unitId: Scalars['Int']['output'];
  urls: Urls;
};

export type InterestedUser = {
  __typename?: 'InterestedUser';
  date?: Maybe<Scalars['ISODate']['output']>;
  user?: Maybe<User>;
};

export type InternationalFavAddress = {
  __typename?: 'InternationalFavAddress';
  city?: Maybe<Scalars['String']['output']>;
  stateAbbreviation?: Maybe<Scalars['String']['output']>;
  streetAddressOrPOBox?: Maybe<Scalars['String']['output']>;
};

export type InternationalFavUniversity = {
  __typename?: 'InternationalFavUniversity';
  address?: Maybe<InternationalFavAddress>;
  name?: Maybe<Scalars['String']['output']>;
  overallRating?: Maybe<Scalars['Float']['output']>;
  range?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  totalPeopleVoted?: Maybe<Scalars['Float']['output']>;
  unitId?: Maybe<Scalars['Float']['output']>;
};

export type InternationalFavorableUnits = {
  __typename?: 'InternationalFavorableUnits';
  costRange?: Maybe<Scalars['String']['output']>;
  livingArrangement?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  universities?: Maybe<Array<Maybe<InternationalFavUniversity>>>;
};

export type InterviewExperience = {
  __typename?: 'InterviewExperience';
  applied_level?: Maybe<Scalars['String']['output']>;
  attempt?: Maybe<Scalars['Float']['output']>;
  conversation?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
  unitId?: Maybe<Scalars['Float']['output']>;
  university?: Maybe<Scalars['String']['output']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  alumini?: Maybe<InvitationAnalytics>;
  student?: Maybe<InvitationAnalytics>;
};

export type InvitationAnalytics = {
  __typename?: 'InvitationAnalytics';
  _id: Scalars['ID']['output'];
  inviteButtonClicked?: Maybe<Scalars['Int']['output']>;
  massInvitedClicked?: Maybe<Scalars['Int']['output']>;
  totalInvitesSent?: Maybe<Scalars['Int']['output']>;
  totalJoinedAfterInvite?: Maybe<Scalars['Int']['output']>;
};

export enum LevelOfStudyEnum {
  Graduate = 'graduate',
  Phd = 'phd',
  Undergraduate = 'undergraduate'
}

export type Library = {
  __typename?: 'Library';
  digitalElectronicBook?: Maybe<Scalars['Float']['output']>;
  physicalBook?: Maybe<Scalars['Float']['output']>;
  physicalMedia?: Maybe<Scalars['Float']['output']>;
  recordedYear?: Maybe<Scalars['Float']['output']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  newUser?: Maybe<Scalars['Boolean']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
  spaceOrgName?: Maybe<Scalars['String']['output']>;
  userAddedToOrg?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type LoginResponseQuery = {
  __typename?: 'LoginResponseQuery';
  data?: Maybe<LoginResponse>;
  status?: Maybe<ResStatus>;
};

export type MajorObj = {
  __typename?: 'MajorObj';
  pollTotalGraduates?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MajorSchema = {
  __typename?: 'MajorSchema';
  _id?: Maybe<Scalars['ID']['output']>;
  major_name?: Maybe<Scalars['String']['output']>;
  universities?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type MedianEarningObj = {
  __typename?: 'MedianEarningObj';
  nationalEarning?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type MonthlyVisit = {
  __typename?: 'MonthlyVisit';
  count?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['String']['output']>;
};

export type NewSchool = {
  __typename?: 'NewSchool';
  admissionInfo?: Maybe<UniversityAdmission>;
  departmentRatings?: Maybe<Array<Maybe<UniDepartment>>>;
  elevatorInfo?: Maybe<InstitutionCharacterSchema>;
  financialAid?: Maybe<FinancialAidSchema>;
  graduationRate?: Maybe<GraduationRates>;
  professors?: Maybe<Array<Maybe<Professor>>>;
  scholarshipInfo?: Maybe<ScholarshipResponse>;
  similarSchools?: Maybe<SimilarSchools>;
  studentCharges?: Maybe<StudentChargesSchema>;
  studentsStats?: Maybe<StudentEnrollment>;
  testScore?: Maybe<TestScoreSchema>;
  unitId?: Maybe<Scalars['Float']['output']>;
  userEvaluation?: Maybe<UserEvaluation>;
};

export type NewSchoolScholarship = {
  __typename?: 'NewSchoolScholarship';
  elevatorInfo?: Maybe<InstitutionCharacterSchema>;
  overallRating?: Maybe<Scalars['Float']['output']>;
  scholarshipInfo?: Maybe<Array<Maybe<Scholarship>>>;
  studentCharges?: Maybe<StudentChargesSchema>;
  totalPeopleVoted?: Maybe<Scalars['Float']['output']>;
};

export type NewSchoolUniversity = {
  __typename?: 'NewSchoolUniversity';
  name?: Maybe<Scalars['String']['output']>;
  pictures?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type NewsFeedQuery = {
  __typename?: 'NewsFeedQuery';
  data?: Maybe<Array<Maybe<PostNewsFeed>>>;
  status?: Maybe<ResStatus>;
};

export enum NodeEnum {
  Others = 'others',
  QuestionAboutUniversity = 'questionAboutUniversity',
  ReviewUniversity = 'reviewUniversity',
  SuggestMeUniversity = 'suggestMeUniversity'
}

export type NonImagesSchool = {
  __typename?: 'NonImagesSchool';
  name?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Float']['output']>;
};

export type NotificationList = {
  __typename?: 'NotificationList';
  _id: Scalars['ID']['output'];
  date?: Maybe<Scalars['ISODate']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  webRoute?: Maybe<Scalars['String']['output']>;
};

export type NotificationListQuery = {
  __typename?: 'NotificationListQuery';
  notifications?: Maybe<Array<Maybe<NotificationList>>>;
  status?: Maybe<ResStatus>;
};

export type OrgEvent = {
  __typename?: 'OrgEvent';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventDate?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  interestedUsers?: Maybe<Array<Maybe<EventInterestedUser>>>;
  isRegistered?: Maybe<Scalars['Boolean']['output']>;
  spaceOrg?: Maybe<SpaceOrg>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type OrgHistory = {
  __typename?: 'OrgHistory';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  orgId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type OrgHistoryActivityResponse = {
  __typename?: 'OrgHistoryActivityResponse';
  data?: Maybe<SingleHistoryActivityResponse>;
  status?: Maybe<ResStatus>;
};

export type OrgHistoryResponse = {
  __typename?: 'OrgHistoryResponse';
  data?: Maybe<OrgHistory>;
  status?: Maybe<ResStatus>;
};

export type OrgHistoryYearResponse = {
  __typename?: 'OrgHistoryYearResponse';
  data?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  status?: Maybe<ResStatus>;
};

export type OrgSpaceResponse = {
  __typename?: 'OrgSpaceResponse';
  data?: Maybe<SpaceOrg>;
  status?: Maybe<ResStatus>;
};

export type OtherPollsObj = {
  __typename?: 'OtherPollsObj';
  poll?: Maybe<Scalars['String']['output']>;
  totalResponse?: Maybe<Scalars['Float']['output']>;
  valueRated?: Maybe<Scalars['Float']['output']>;
};

export type OtherSchoolObj = {
  __typename?: 'OtherSchoolObj';
  grade?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<Scalars['Float']['output']>;
  school?: Maybe<School>;
};

export type PaginationQuery = {
  __typename?: 'PaginationQuery';
  count?: Maybe<Scalars['Float']['output']>;
  lastPage?: Maybe<Scalars['Float']['output']>;
  limit?: Maybe<Scalars['Float']['output']>;
  offset?: Maybe<Scalars['Float']['output']>;
};

export type Poll = {
  __typename?: 'Poll';
  otherPolls?: Maybe<Array<Maybe<OtherPollsObj>>>;
  wordBestDescribe?: Maybe<Array<Maybe<WordBestDescribe>>>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  academicProgramsAndDepartmentRating?: Maybe<Scalars['Int']['output']>;
  admissionAndApplicationRating?: Maybe<Scalars['Int']['output']>;
  anonymityOption?: Maybe<Scalars['Boolean']['output']>;
  attendAgain?: Maybe<Scalars['Boolean']['output']>;
  careerAndAlumniResourceRating?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Array<Maybe<PostCommentQuery>>>;
  date?: Maybe<Scalars['ISODate']['output']>;
  financialAidAndScholarshipRating?: Maybe<Scalars['Int']['output']>;
  gpa?: Maybe<Scalars['Float']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  levelOfStudy?: Maybe<Scalars['String']['output']>;
  postCommentsCount?: Maybe<Scalars['Float']['output']>;
  postImage?: Maybe<Scalars['String']['output']>;
  postTag?: Maybe<Scalars['String']['output']>;
  postText?: Maybe<Scalars['String']['output']>;
  postType?: Maybe<Scalars['String']['output']>;
  preferredLocation?: Maybe<Scalars['String']['output']>;
  relationToMajor?: Maybe<Scalars['Boolean']['output']>;
  reviewSubCategories?: Maybe<Scalars['String']['output']>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  studentLifeAndServiceRating?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  testScoreMark?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uniId?: Maybe<Scalars['Int']['output']>;
  universitySearch?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
  videoURL?: Maybe<Scalars['String']['output']>;
};

export type PostComment = {
  __typename?: 'PostComment';
  _id: Scalars['ID']['output'];
  academicProgramsAndDepartmentRating?: Maybe<Scalars['Int']['output']>;
  admissionAndApplicationRating?: Maybe<Scalars['Int']['output']>;
  anonymityOption?: Maybe<Scalars['Boolean']['output']>;
  attendAgain?: Maybe<Scalars['Boolean']['output']>;
  careerAndAlumniResourceRating?: Maybe<Scalars['Int']['output']>;
  comments?: Maybe<Array<Maybe<CommentDetails>>>;
  date?: Maybe<Scalars['ISODate']['output']>;
  financialAidAndScholarshipRating?: Maybe<Scalars['Int']['output']>;
  gpa?: Maybe<Scalars['Float']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  levelOfStudy?: Maybe<Scalars['String']['output']>;
  postCommentsCount?: Maybe<Scalars['Float']['output']>;
  postImage?: Maybe<Scalars['String']['output']>;
  postText?: Maybe<Scalars['String']['output']>;
  postType?: Maybe<Scalars['String']['output']>;
  preferredLocation?: Maybe<Scalars['String']['output']>;
  relationToMajor?: Maybe<Scalars['Boolean']['output']>;
  reviewSubCategories?: Maybe<Scalars['String']['output']>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  studentLifeAndServiceRating?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Maybe<SpaceCategoryQuery>>>;
  testScoreMark?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  universitySearch?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  videoURL?: Maybe<Scalars['String']['output']>;
};

export type PostCommentQuery = {
  __typename?: 'PostCommentQuery';
  _id?: Maybe<Scalars['ID']['output']>;
  commentImage?: Maybe<Scalars['String']['output']>;
  commentText?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  replyTo?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};

export type PostNewsFeed = {
  __typename?: 'PostNewsFeed';
  _id?: Maybe<Scalars['ID']['output']>;
  academicProgramsAndDepartmentRating?: Maybe<Scalars['Int']['output']>;
  admissionAndApplicationRating?: Maybe<Scalars['Int']['output']>;
  anonymityOption?: Maybe<Scalars['Boolean']['output']>;
  applied_level?: Maybe<Scalars['String']['output']>;
  attempt?: Maybe<Scalars['Float']['output']>;
  attendAgain?: Maybe<Scalars['Boolean']['output']>;
  careerAndAlumniResourceRating?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Array<Maybe<PostCommentQuery>>>;
  conversation?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  elevatorInfo?: Maybe<InstitutionCharacterSchema>;
  event?: Maybe<OrgEvent>;
  financialAidAndScholarshipRating?: Maybe<Scalars['Int']['output']>;
  gpa?: Maybe<Scalars['Float']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  levelOfStudy?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  postCommentsCount?: Maybe<Scalars['Float']['output']>;
  postImage?: Maybe<Scalars['String']['output']>;
  postTag?: Maybe<Scalars['String']['output']>;
  postText?: Maybe<Scalars['String']['output']>;
  postType?: Maybe<Scalars['String']['output']>;
  preferredLocation?: Maybe<Scalars['String']['output']>;
  relationToMajor?: Maybe<Scalars['Boolean']['output']>;
  reviewSubCategories?: Maybe<Scalars['String']['output']>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  section?: Maybe<Scalars['String']['output']>;
  similarSchools?: Maybe<SimilarSchools>;
  status?: Maybe<Scalars['Boolean']['output']>;
  studentCharges?: Maybe<StudentChargesSchema>;
  studentLifeAndServiceRating?: Maybe<Scalars['Int']['output']>;
  suggestedOrgs?: Maybe<SuggestedSpace>;
  suggestedSpace?: Maybe<SuggestedSpace>;
  tags?: Maybe<Array<Maybe<SpaceCategory>>>;
  testScore?: Maybe<TestScoreSchema>;
  testScoreMark?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uniName?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  university?: Maybe<Scalars['String']['output']>;
  universitySearch?: Maybe<Scalars['String']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
  userEvaluation?: Maybe<UserEvaluation>;
  userId?: Maybe<Scalars['ID']['output']>;
  videoURL?: Maybe<Scalars['String']['output']>;
};

export type PostView = {
  __typename?: 'PostView';
  postId?: Maybe<Scalars['ID']['output']>;
  views?: Maybe<Scalars['Int']['output']>;
};

export type Posts = {
  __typename?: 'Posts';
  _id: Scalars['ID']['output'];
  date?: Maybe<Scalars['ISODate']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  postCommentsCount?: Maybe<Scalars['Float']['output']>;
  postImage?: Maybe<Scalars['String']['output']>;
  postText?: Maybe<Scalars['String']['output']>;
  saved?: Maybe<Scalars['Boolean']['output']>;
  tags?: Maybe<Array<Maybe<SpaceCategory>>>;
  type?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  upVoteCount?: Maybe<Scalars['Float']['output']>;
  upVoted?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
};

export type PriceOfAttendance = {
  __typename?: 'PriceOfAttendance';
  costOfAttendance: CostOfAttendance;
  id: Scalars['ID']['output'];
  otherExpenses: Scalars['Float']['output'];
  roomAndBoard: Scalars['Float']['output'];
};

export type Professor = {
  __typename?: 'Professor';
  _id?: Maybe<Scalars['ID']['output']>;
  levelOfDifficulty?: Maybe<Scalars['Float']['output']>;
  overallRating?: Maybe<Scalars['Float']['output']>;
  professorName?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Float']['output']>;
  wouldTakeAgain?: Maybe<Scalars['Float']['output']>;
};

export type PrototypeMerge = {
  __typename?: 'PrototypeMerge';
  totalCharacterRecords?: Maybe<Scalars['Float']['output']>;
  totalLibraryRecords?: Maybe<Scalars['Float']['output']>;
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['ID']['output'];
  category?: Maybe<Scalars['String']['output']>;
  dependsOn?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  nextQuestion?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Maybe<TypeObject>>>;
  qnsNumber?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  questions?: Maybe<Array<Maybe<Question>>>;
  status?: Maybe<ResStatus>;
};

export type Range = {
  __typename?: 'Range';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type RangeInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type Ranking = {
  __typename?: 'Ranking';
  rank?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  totalPlayers?: Maybe<Scalars['Float']['output']>;
};

export type Report = {
  __typename?: 'Report';
  academics?: Maybe<Scalars['Float']['output']>;
  atheltics?: Maybe<Scalars['Float']['output']>;
  average?: Maybe<Scalars['Float']['output']>;
  campus?: Maybe<Scalars['Float']['output']>;
  campusFood?: Maybe<Scalars['Float']['output']>;
  diversity?: Maybe<Scalars['Float']['output']>;
  dorms?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['Float']['output']>;
  partyScene?: Maybe<Scalars['Float']['output']>;
  professors?: Maybe<Scalars['Float']['output']>;
  safety?: Maybe<Scalars['Float']['output']>;
  studentLife?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type ResStatus = {
  __typename?: 'ResStatus';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ResponseQuery = {
  __typename?: 'ResponseQuery';
  status?: Maybe<ResStatus>;
};

export type ResponseStatus = {
  __typename?: 'ResponseStatus';
  status?: Maybe<ResStatus>;
};

export type Review = {
  __typename?: 'Review';
  rating?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  votes?: Maybe<Scalars['Float']['output']>;
};

export type RoadMap = {
  __typename?: 'RoadMap';
  _id?: Maybe<Scalars['ID']['output']>;
  answers?: Maybe<Array<Maybe<AnswerQuery>>>;
  currentStep?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type RoadMapResponse = {
  __typename?: 'RoadMapResponse';
  data?: Maybe<RoadMap>;
  status?: Maybe<ResStatus>;
};

export type Sat = {
  __typename?: 'SAT';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type SatScore = {
  __typename?: 'SATScore';
  math?: Maybe<TestScoreDetails>;
  percentSubmitted?: Maybe<Scalars['Int']['output']>;
  readingWriting?: Maybe<TestScoreDetails>;
  submitted?: Maybe<Scalars['Int']['output']>;
};

export type Scholarship = {
  __typename?: 'Scholarship';
  _id: Scalars['ID']['output'];
  act?: Maybe<Act>;
  address?: Maybe<Address>;
  alias?: Maybe<Scalars['String']['output']>;
  awards?: Maybe<Array<Maybe<Awards>>>;
  bio?: Maybe<Scalars['String']['output']>;
  briefAddress?: Maybe<Scalars['String']['output']>;
  calendar?: Maybe<Scalars['String']['output']>;
  gpa?: Maybe<Gpa>;
  graduateOffering?: Maybe<Scalars['String']['output']>;
  grantsMedicalDegree?: Maybe<Scalars['String']['output']>;
  hasHospital?: Maybe<Scalars['String']['output']>;
  highestLevelOfOffering?: Maybe<Scalars['String']['output']>;
  international_specific?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  library?: Maybe<Library>;
  majors?: Maybe<Array<Maybe<MajorObj>>>;
  missionStatement?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  non_score_eligibility_requirements?: Maybe<Scalars['String']['output']>;
  ownType?: Maybe<Scalars['String']['output']>;
  pictures?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sat?: Maybe<Sat>;
  scholarship_name?: Maybe<Scalars['String']['output']>;
  scholarship_url?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transfer_specific?: Maybe<Scalars['Boolean']['output']>;
  undergraduateOffering?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  university?: Maybe<School>;
  university_name?: Maybe<Scalars['String']['output']>;
  urls?: Maybe<Urls>;
};

export type ScholarshipAmount = {
  __typename?: 'ScholarshipAmount';
  amount?: Maybe<Scalars['String']['output']>;
  disbursement_schedule?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipInfoQuery = {
  __typename?: 'ScholarshipInfoQuery';
  act?: Maybe<Act>;
  awards?: Maybe<Array<Maybe<Awards>>>;
  gpa?: Maybe<Gpa>;
  international_specific?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  non_score_eligibility_requirements?: Maybe<Scalars['String']['output']>;
  sat?: Maybe<Sat>;
  scholarship_name?: Maybe<Scalars['String']['output']>;
  scholarship_url?: Maybe<Scalars['String']['output']>;
  transfer_specific?: Maybe<Scalars['Boolean']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  university_name?: Maybe<Scalars['String']['output']>;
};

export type ScholarshipResponse = {
  __typename?: 'ScholarshipResponse';
  scholarships?: Maybe<Array<Maybe<Scholarship>>>;
  status?: Maybe<ResStatus>;
};

export enum ScholarshipType {
  Act = 'act',
  Gpa = 'gpa',
  Sat = 'sat'
}

export type School = {
  __typename?: 'School';
  applicants?: Maybe<Applicants>;
  diversity?: Maybe<Diversity>;
  elevatorInfo?: Maybe<ElevatorInfo>;
  grants?: Maybe<Grants>;
  library?: Maybe<Library>;
  majors?: Maybe<Array<Maybe<MajorObj>>>;
  name?: Maybe<Scalars['String']['output']>;
  pictures?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  professors?: Maybe<Array<Maybe<Professor>>>;
  rankings?: Maybe<Array<Maybe<Ranking>>>;
  report?: Maybe<Report>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  similarSchools?: Maybe<Array<Maybe<OtherSchoolObj>>>;
  studentCharges?: Maybe<StudentCharges>;
  students?: Maybe<Students>;
  testScore?: Maybe<TestScore>;
  unitId?: Maybe<Scalars['Float']['output']>;
};

export type Schools = {
  __typename?: 'Schools';
  _id?: Maybe<Scalars['String']['output']>;
  degree?: Maybe<Scalars['String']['output']>;
  graduationDate?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  school?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
};

export type ScoreRange = {
  __typename?: 'ScoreRange';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type Scores = {
  __typename?: 'Scores';
  ACT_SCORE?: Maybe<MultiTests>;
  IELTS_SCORE?: Maybe<EnglishTest>;
  SAT_SCORE?: Maybe<MultiTests>;
  TOEFL_SCORE?: Maybe<EnglishTest>;
};

export type SearchKeyword = {
  __typename?: 'SearchKeyword';
  count?: Maybe<Scalars['Int']['output']>;
  keyword?: Maybe<Scalars['String']['output']>;
};

export type SearchPostQuery = {
  __typename?: 'SearchPostQuery';
  posts?: Maybe<Array<Maybe<Post>>>;
  status?: Maybe<ResStatus>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  items?: Maybe<Array<Maybe<SearchResult>>>;
  orgs?: Maybe<Array<Maybe<SpaceOrg>>>;
  spaces?: Maybe<Array<Maybe<SpaceCategory>>>;
  totalItems: Scalars['Int']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type SearchSchoolByUnitIdsQuery = {
  __typename?: 'SearchSchoolByUnitIdsQuery';
  elevatorInfo?: Maybe<InstitutionCharacterSchema>;
  scholarshipInfo?: Maybe<ScholarshipResponse>;
  scholarships?: Maybe<Array<Maybe<ScholarshipInfoQuery>>>;
  similarSchools?: Maybe<SimilarSchools>;
  studentCharges?: Maybe<StudentChargesSchema>;
  testScore?: Maybe<TestScoreSchema>;
  userEvaluation?: Maybe<UserEvaluation>;
};

export type SearchUniversityAnalytics = {
  __typename?: 'SearchUniversityAnalytics';
  count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  query?: Maybe<Scalars['String']['output']>;
  states?: Maybe<Scalars['String']['output']>;
  universityName?: Maybe<Scalars['String']['output']>;
};

export type SearchUniversityAnalyticsQuery = {
  __typename?: 'SearchUniversityAnalyticsQuery';
  authenticatedCountSearch?: Maybe<Scalars['Int']['output']>;
  mostAskedStates?: Maybe<Array<Maybe<SearchUniversityAnalytics>>>;
  mostFrequentQueries?: Maybe<Array<Maybe<SearchUniversityAnalytics>>>;
  mostSearchUniversity?: Maybe<Array<Maybe<SearchUniversityAnalytics>>>;
  unAuthenticateCountSearch?: Maybe<Scalars['Int']['output']>;
};

export type SearchUser = {
  __typename?: 'SearchUser';
  _id: Scalars['ID']['output'];
  coverPicture?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type SearchUserQuery = {
  __typename?: 'SearchUserQuery';
  status?: Maybe<ResStatus>;
  user?: Maybe<Array<Maybe<SearchUser>>>;
};

export type SignedUrl = {
  __typename?: 'SignedURL';
  key?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SimilarSchool = {
  __typename?: 'SimilarSchool';
  grade?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export type SimilarSchools = {
  __typename?: 'SimilarSchools';
  recommendedUniversity?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  similarSchools?: Maybe<Array<Maybe<SimilarSchool>>>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type SingleHistoryActivityResponse = {
  __typename?: 'SingleHistoryActivityResponse';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  historyActivity?: Maybe<Array<Maybe<HistoryActivity>>>;
  orgId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type SocialLinks = {
  __typename?: 'SocialLinks';
  facebook?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export enum SortBy {
  Comments = 'COMMENTS',
  Date = 'DATE',
  Upvotes = 'UPVOTES'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SpaceAllMembership = {
  __typename?: 'SpaceAllMembership';
  alumini?: Maybe<Array<Maybe<User>>>;
  members?: Maybe<Array<Maybe<User>>>;
  students?: Maybe<Array<Maybe<User>>>;
};

export type SpaceAllMembershipResponse = {
  __typename?: 'SpaceAllMembershipResponse';
  data?: Maybe<SpaceAllMembership>;
  status?: Maybe<ResStatus>;
};

export type SpaceCategory = {
  __typename?: 'SpaceCategory';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
};

export type SpaceCategoryQuery = {
  __typename?: 'SpaceCategoryQuery';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
};

export type SpaceEvent = {
  __typename?: 'SpaceEvent';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventDate?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  interestedUsers?: Maybe<Array<Maybe<InterestedUser>>>;
  isRegistered?: Maybe<Scalars['Boolean']['output']>;
  spaceOrg?: Maybe<SpaceOrg>;
  title?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type SpaceEventResponse = {
  __typename?: 'SpaceEventResponse';
  data?: Maybe<SpaceEvent>;
  status?: Maybe<ResStatus>;
};

export type SpaceMembership = {
  __typename?: 'SpaceMembership';
  _id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  spaceId?: Maybe<Scalars['ID']['output']>;
  user?: Maybe<User>;
};

export type SpaceMembershipResponse = {
  __typename?: 'SpaceMembershipResponse';
  data?: Maybe<Array<Maybe<SpaceMembership>>>;
  status?: Maybe<ResStatus>;
};

export type SpaceOrg = {
  __typename?: 'SpaceOrg';
  _id?: Maybe<Scalars['ID']['output']>;
  admin?: Maybe<User>;
  alumini?: Maybe<Array<Maybe<User>>>;
  analytics?: Maybe<Analytics>;
  announcements?: Maybe<Array<Maybe<User>>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Maybe<User>>>;
  faqs?: Maybe<Array<Maybe<User>>>;
  fundMeLink?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  invitations?: Maybe<Array<Maybe<User>>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isJoined?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Maybe<User>>>;
  profileImage?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  searchKeywords?: Maybe<Array<Maybe<SearchKeyword>>>;
  students?: Maybe<Array<Maybe<User>>>;
  totalStudents?: Maybe<Scalars['Int']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  websiteLink?: Maybe<Scalars['String']['output']>;
};

export type SpaceOrgEvent = {
  __typename?: 'SpaceOrgEvent';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventDate?: Maybe<Scalars['String']['output']>;
  orgId?: Maybe<Scalars['ID']['output']>;
  spaceId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type SpaceOrgEventResponse = {
  __typename?: 'SpaceOrgEventResponse';
  data?: Maybe<SpaceOrgEvent>;
  status?: Maybe<ResStatus>;
};

export type Status = {
  __typename?: 'Status';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type StudentCharges = {
  __typename?: 'StudentCharges';
  booksAndSupplies?: Maybe<Scalars['Float']['output']>;
  cost?: Maybe<Cost>;
  fees?: Maybe<FeesUnderAndGrad>;
  offCampus?: Maybe<FeeStructure>;
  offCampusWithFamily?: Maybe<FeeStructure>;
  onCampus?: Maybe<FeeStructure>;
  tutionAndFees?: Maybe<TutionAndFeesObj>;
};

export type StudentChargesSchema = {
  __typename?: 'StudentChargesSchema';
  combinedChargeForRoomAndBoard: Scalars['Float']['output'];
  graduate?: Maybe<Graduate>;
  graduateApplicationFee: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  undergraduate?: Maybe<Undergraduate>;
  undergraduateApplicationFee: Scalars['Float']['output'];
  unitId: Scalars['Int']['output'];
};

export type StudentCohort = {
  __typename?: 'StudentCohort';
  numberOfStudents?: Maybe<Scalars['Int']['output']>;
  percentOfStudents?: Maybe<Scalars['Int']['output']>;
};

export type StudentEnrollment = {
  __typename?: 'StudentEnrollment';
  enrollmentByRace?: Maybe<EnrollmentByRace>;
  firstTimeUndergraduates?: Maybe<FirstTimeUndergraduates>;
  graduateEnrollment?: Maybe<Scalars['Int']['output']>;
  totalEnrollment?: Maybe<Scalars['Int']['output']>;
  undergraduateEnrollment?: Maybe<Scalars['Int']['output']>;
  unitId: Scalars['Int']['output'];
};

export type Students = {
  __typename?: 'Students';
  afterCollege?: Maybe<AfterCollege>;
  bestDescribesStudents?: Maybe<Array<Maybe<BestDescibesStudents>>>;
  campusLife?: Maybe<CampusLife>;
  diversity?: Maybe<Diversity>;
  enrollment?: Maybe<Enrollment>;
  fullTimeEnrollment?: Maybe<Scalars['Float']['output']>;
};

export type Success = {
  __typename?: 'Success';
  result?: Maybe<PrototypeMerge>;
  status?: Maybe<Scalars['Boolean']['output']>;
};

export type SuggestedSpace = {
  __typename?: 'SuggestedSpace';
  name?: Maybe<Scalars['String']['output']>;
  spaces?: Maybe<Array<Maybe<SpaceCategory>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TestScore = {
  __typename?: 'TestScore';
  act?: Maybe<Act>;
  sat?: Maybe<Act>;
  satOrActRequirement?: Maybe<Scalars['Boolean']['output']>;
};

export type TestScoreDetails = {
  __typename?: 'TestScoreDetails';
  percentile25?: Maybe<Scalars['Int']['output']>;
  percentile75?: Maybe<Scalars['Int']['output']>;
};

export enum TestScoreEnum {
  Act = 'act',
  Gmat = 'gmat',
  Gre = 'gre',
  Sat = 'sat'
}

export type TestScoreMark = {
  actScore?: InputMaybe<Scalars['Float']['input']>;
  gmatScore?: InputMaybe<Scalars['Float']['input']>;
  greScore?: InputMaybe<Scalars['Float']['input']>;
  satScore?: InputMaybe<Scalars['Float']['input']>;
};

export type TestScoreOld = {
  __typename?: 'TestScoreOld';
  private?: Maybe<Scalars['Boolean']['output']>;
  scores?: Maybe<Scores>;
};

export type TestScoreSchema = {
  __typename?: 'TestScoreSchema';
  act?: Maybe<ActScore>;
  sat?: Maybe<SatScore>;
  unitId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type TokenQuery = {
  __typename?: 'TokenQuery';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type TokenResponseQuery = {
  __typename?: 'TokenResponseQuery';
  data?: Maybe<TokenQuery>;
  status?: Maybe<ResStatus>;
};

export type TopInterview = {
  __typename?: 'TopInterview';
  _id?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Float']['output']>;
  maxAttempt?: Maybe<Scalars['Float']['output']>;
  maxUniCount?: Maybe<Scalars['Float']['output']>;
};

export type TopInterviewQuery = {
  __typename?: 'TopInterviewQuery';
  interviewExperience?: Maybe<Array<Maybe<TopInterview>>>;
  status?: Maybe<ResStatus>;
};

export type TotalEnrolled = {
  __typename?: 'TotalEnrolled';
  fullTime?: Maybe<Scalars['Float']['output']>;
  partTime?: Maybe<Scalars['Float']['output']>;
};

export type Tuition = {
  __typename?: 'Tuition';
  id: Scalars['ID']['output'];
  perCreditHourCharge: Scalars['Float']['output'];
  requiredFees: Scalars['Float']['output'];
  tuition: Scalars['Float']['output'];
};

export type UndergradAndGradFeeObj = {
  __typename?: 'UndergradAndGradFeeObj';
  inState?: Maybe<Scalars['Float']['output']>;
  tutionAndFees?: Maybe<Scalars['Float']['output']>;
};

export type Undergraduate = {
  __typename?: 'Undergraduate';
  booksAndSupplies?: Maybe<Scalars['Float']['output']>;
  inDistrict?: Maybe<Tuition>;
  inState?: Maybe<Tuition>;
  offCampusNotWithFamily?: Maybe<PriceOfAttendance>;
  offCampusWithFamily?: Maybe<PriceOfAttendance>;
  onCampus?: Maybe<PriceOfAttendance>;
  outOfState?: Maybe<Tuition>;
};

export type UndergraduateInfo = {
  __typename?: 'UndergraduateInfo';
  studentLivingOffCampusNotWithFamily?: Maybe<Scalars['Int']['output']>;
  studentLivingOffCampusWithFamily?: Maybe<Scalars['Int']['output']>;
  studentLivingOnCampus?: Maybe<Scalars['Int']['output']>;
  totalStudent?: Maybe<Scalars['Int']['output']>;
};

export type UniAndProfessor = {
  __typename?: 'UniAndProfessor';
  overall_rating?: Maybe<Scalars['Float']['output']>;
  overall_rating_list?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  professor?: Maybe<Array<Maybe<Professor>>>;
  ratings_list?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  subject?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type UniAndProfessorQuery = {
  __typename?: 'UniAndProfessorQuery';
  data?: Maybe<Array<Maybe<UniAndProfessor>>>;
  status?: Maybe<ResStatus>;
};

export type UniDepartment = {
  __typename?: 'UniDepartment';
  overall_rating?: Maybe<Scalars['Float']['output']>;
  overall_rating_list?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  professor?: Maybe<Array<Maybe<Professor>>>;
  ratings_list?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  subject?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type UniDepartmentQuery = {
  __typename?: 'UniDepartmentQuery';
  data?: Maybe<Array<Maybe<UniDepartment>>>;
  status?: Maybe<ResStatus>;
};

export type UniProfessor = {
  __typename?: 'UniProfessor';
  _id?: Maybe<Scalars['ID']['output']>;
  levelOfDifficulty?: Maybe<Scalars['Float']['output']>;
  overallRating?: Maybe<Scalars['Float']['output']>;
  professorName?: Maybe<Scalars['String']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
  wouldTakeAgain?: Maybe<Scalars['Float']['output']>;
};

export type UniversityAdmission = {
  __typename?: 'UniversityAdmission';
  admissionTestScores?: Maybe<Scalars['String']['output']>;
  admissions?: Maybe<YearlyApplicantData>;
  applicants?: Maybe<YearlyApplicantData>;
  collegePrepProgram?: Maybe<Scalars['String']['output']>;
  competencies?: Maybe<Scalars['String']['output']>;
  enrollees?: Maybe<Enrollees>;
  openAdmissionPolicy?: Maybe<Scalars['String']['output']>;
  recommendations?: Maybe<Scalars['String']['output']>;
  schoolRecord?: Maybe<Scalars['String']['output']>;
  secondarySchoolGPA?: Maybe<Scalars['String']['output']>;
  secondarySchoolRank?: Maybe<Scalars['String']['output']>;
  testScores?: Maybe<TestScoreSchema>;
  toefl?: Maybe<Scalars['String']['output']>;
  unitId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type UniversityQuery = {
  __typename?: 'UniversityQuery';
  status?: Maybe<ResStatus>;
  university?: Maybe<Array<Maybe<NewSchool>>>;
};

export type Urls = {
  __typename?: 'Urls';
  admissions: Scalars['String']['output'];
  financialAid?: Maybe<Scalars['String']['output']>;
  home: Scalars['String']['output'];
  netPriceCalculator?: Maybe<Scalars['String']['output']>;
  onlineApplication?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  ACTScore?: Maybe<Scalars['Float']['output']>;
  IELTSSCORE?: Maybe<Scalars['Float']['output']>;
  SATScore?: Maybe<Scalars['Float']['output']>;
  TOEFLScore?: Maybe<Scalars['Float']['output']>;
  _id: Scalars['ID']['output'];
  about?: Maybe<About>;
  active?: Maybe<Scalars['Boolean']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  badges?: Maybe<Badges>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  blocked?: Maybe<Scalars['Boolean']['output']>;
  coverPicture?: Maybe<Scalars['String']['output']>;
  doj?: Maybe<Scalars['ISODate']['output']>;
  education?: Maybe<Education>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  highSchoolGPA?: Maybe<Scalars['Float']['output']>;
  highSchoolPercent?: Maybe<Scalars['Float']['output']>;
  interestedSpace?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  interestedSubjects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  interestedUni?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  lastName?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  oneLinerBio?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  predictedACTScore?: Maybe<Scalars['Float']['output']>;
  predictedHighSchoolGPA?: Maybe<Scalars['Float']['output']>;
  predictedIELTSScore?: Maybe<Scalars['Float']['output']>;
  predictedSATScore?: Maybe<Scalars['Float']['output']>;
  predictedTOEFLScore?: Maybe<Scalars['Float']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
  schoolGPA?: Maybe<Scalars['Float']['output']>;
  schoolPercent?: Maybe<Scalars['Float']['output']>;
  socialLinks?: Maybe<SocialLinks>;
  studyLevel?: Maybe<Scalars['String']['output']>;
  testScore?: Maybe<TestScoreOld>;
  userStatus?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type UserEvaluation = {
  __typename?: 'UserEvaluation';
  rankings?: Maybe<Array<Maybe<Ranking>>>;
  report?: Maybe<Report>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  status?: Maybe<ResStatus>;
  user?: Maybe<User>;
};

export type UserRoadMapQuery = {
  __typename?: 'UserRoadMapQuery';
  data?: Maybe<Array<Maybe<RoadMap>>>;
  status?: Maybe<ResStatus>;
};

export type WordBestDescribe = {
  __typename?: 'WordBestDescribe';
  pollPercentage?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type YearlyApplicantData = {
  __typename?: 'YearlyApplicantData';
  men?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  women?: Maybe<Scalars['Int']['output']>;
};

export type YearlyEnrolleeData = {
  __typename?: 'YearlyEnrolleeData';
  fullTime?: Maybe<YearlyEnrolleeSubData>;
  partTime?: Maybe<YearlyEnrolleeSubData>;
};

export type YearlyEnrolleeSubData = {
  __typename?: 'YearlyEnrolleeSubData';
  men?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  women?: Maybe<Scalars['Int']['output']>;
};

export type AddComment = {
  __typename?: 'addComment';
  data?: Maybe<Comment>;
  status?: Maybe<ResStatus>;
};

export type CommentList = {
  __typename?: 'commentList';
  data?: Maybe<Array<Maybe<Comment>>>;
  status?: Maybe<ResStatus>;
};

export type ConnectionList = {
  __typename?: 'connectionList';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type ConnectionListQuery = {
  __typename?: 'connectionListQuery';
  connectionList?: Maybe<Array<Maybe<ConnectionList>>>;
  count?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<ResStatus>;
};

export type EducationQuery = {
  __typename?: 'educationQuery';
  education?: Maybe<Education>;
  status?: Maybe<ResStatus>;
};

export type EnglishTest = {
  __typename?: 'englishTest';
  score?: Maybe<Scalars['Float']['output']>;
};

export type GetPostQuery = {
  __typename?: 'getPostQuery';
  data?: Maybe<Array<Maybe<Post>>>;
  status?: Maybe<ResStatus>;
};

export type InAndOutStateFee = {
  __typename?: 'inAndOutStateFee';
  fee?: Maybe<Fee>;
};

export type InterestedUniversity = {
  searchType?: InputMaybe<Scalars['String']['input']>;
  unitId?: InputMaybe<Scalars['Int']['input']>;
};

export type InterestedUniversityQuery = {
  __typename?: 'interestedUniversityQuery';
  searchType?: Maybe<Scalars['String']['output']>;
  unitId?: Maybe<Scalars['Int']['output']>;
};

export type InterviewExperienceList = {
  __typename?: 'interviewExperienceList';
  interviewExperience?: Maybe<Array<Maybe<InterviewExperience>>>;
  status?: Maybe<ResStatus>;
};

export type InterviewExperienceListQuery = {
  __typename?: 'interviewExperienceListQuery';
  interviewExperience?: Maybe<Array<Maybe<InterviewExperience>>>;
  pagination?: Maybe<PaginationQuery>;
  status?: Maybe<ResStatus>;
};

export type Links = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type MultiTests = {
  __typename?: 'multiTests';
  english?: Maybe<Scalars['Float']['output']>;
  maths?: Maybe<Scalars['Float']['output']>;
};

export type NewPost = {
  __typename?: 'newPost';
  post?: Maybe<NewlyAddedPost>;
  status?: Maybe<ResStatus>;
};

export type NewlyAddedPost = {
  __typename?: 'newlyAddedPost';
  _id?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['ISODate']['output']>;
  postImage?: Maybe<Scalars['String']['output']>;
  postTag?: Maybe<Scalars['String']['output']>;
  postText?: Maybe<Scalars['String']['output']>;
};

export type RootMutation = {
  __typename?: 'rootMutation';
  acceptConnectRequest?: Maybe<ResStatus>;
  /** Add a comment. Requires text or image as input. postId is mandatory */
  addComment?: Maybe<AddComment>;
  addEducation?: Maybe<EducationQuery>;
  addMember?: Maybe<ResStatus>;
  addOrgSpaceEvent?: Maybe<SpaceOrgEventResponse>;
  addPost?: Maybe<NewPost>;
  /** Space Category Mutation. */
  addQuestions?: Maybe<Response>;
  /** Space Category Mutation. */
  addSearchQuery?: Maybe<Response>;
  addSpaceCategory?: Maybe<SpaceCategoryResponse>;
  addTestScore?: Maybe<TestScoreQuery>;
  /** card values can be about, badges, education and testScore */
  addUserRoadMapSummary?: Maybe<RoadMapResponse>;
  bookmarkUniversity?: Maybe<ResStatus>;
  checkValidUsername?: Maybe<ResStatus>;
  createHistory?: Maybe<OrgHistoryResponse>;
  createHistoryActivity?: Maybe<HistoryActivityResponse>;
  /** Space Category Mutation. */
  createOrgSpace?: Maybe<OrgSpaceResponse>;
  deleteActivity?: Maybe<HistoryActivityResponse>;
  /** Delete comment. postId is mandatory */
  deleteComment?: Maybe<AddComment>;
  deleteEducation?: Maybe<EducationQuery>;
  deleteEventById?: Maybe<SpaceOrgEventResponse>;
  deleteGuestbookMessage?: Maybe<ResStatus>;
  deleteHistory?: Maybe<OrgHistoryResponse>;
  deleteOrgSpaceById?: Maybe<ResponseStatus>;
  /** Delete post. postId is mandatory */
  deletePost?: Maybe<ResStatus>;
  /** Add a post. Requires text or image as input. */
  deletePostImageById?: Maybe<ResStatus>;
  deleteProfileImage?: Maybe<ResStatus>;
  deleteSpaceCategoryById?: Maybe<ResponseStatus>;
  /** Space Category Mutation. */
  deleteSpaceCategoryImageById?: Maybe<ResponseStatus>;
  deleteTestScore?: Maybe<TestScoreQuery>;
  editAbout?: Maybe<AboutQuery>;
  editActivity?: Maybe<HistoryActivityResponse>;
  /** edit comment. postId is mandatory */
  editComment?: Maybe<AddComment>;
  editEducation?: Maybe<EducationQuery>;
  editGuestbookMessage?: Maybe<ResStatus>;
  editHistory?: Maybe<OrgHistoryResponse>;
  /** edit Post. postId is mandatory */
  editPost?: Maybe<GetPostQuery>;
  editProfile?: Maybe<UserQuery>;
  editSpaceCategoryById?: Maybe<SpaceCategoryResponse>;
  generateReferralCode?: Maybe<GenerateReferral>;
  login?: Maybe<LoginResponseQuery>;
  /** Read all notifications. */
  readAllNotifications?: Maybe<NotificationListQuery>;
  refreshToken?: Maybe<TokenResponseQuery>;
  register?: Maybe<ResponseQuery>;
  registeredUserByEventId?: Maybe<SpaceOrgEventResponse>;
  removeConnectRequest?: Maybe<ResStatus>;
  requestToJoinOrg?: Maybe<ResponseQuery>;
  /** Save. postId is mandatory */
  save?: Maybe<ResStatus>;
  sendConnectRequest?: Maybe<ResStatus>;
  sendGuestbookMessage?: Maybe<SendGuestbookMessageQuery>;
  sendVerficationMail?: Maybe<ResponseQuery>;
  sentGuestbookMessage?: Maybe<GuestbookQuery>;
  setUser?: Maybe<User>;
  toggleView?: Maybe<ToggleQuery>;
  /** Unsave. postId is mandatory */
  unSave?: Maybe<ResStatus>;
  /** Upvote. postId is mandatory */
  upVote?: Maybe<UpVote>;
  updateEventById?: Maybe<SpaceOrgEventResponse>;
  updateOrgSpaceById?: Maybe<OrgSpaceResponse>;
  uploadImage?: Maybe<ImageResponse>;
  verifyEmail?: Maybe<TokenResponseQuery>;
  verifyReferralCode?: Maybe<ResStatus>;
};


export type RootMutationAcceptConnectRequestArgs = {
  requestorId: Scalars['String']['input'];
};


export type RootMutationAddCommentArgs = {
  commentImage?: InputMaybe<Scalars['String']['input']>;
  commentText?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
  replyTo?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddEducationArgs = {
  degree?: InputMaybe<Scalars['String']['input']>;
  graduationDate: Scalars['String']['input'];
  major?: InputMaybe<Scalars['String']['input']>;
  school: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type RootMutationAddMemberArgs = {
  inviteUserRole: Scalars['String']['input'];
  inviteeEmail: Scalars['String']['input'];
  orgId: Scalars['ID']['input'];
};


export type RootMutationAddOrgSpaceEventArgs = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  eventDate: Scalars['String']['input'];
  spaceId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type RootMutationAddPostArgs = {
  academicProgramsAndDepartmentRating?: InputMaybe<Scalars['Int']['input']>;
  admissionAndApplicationRating?: InputMaybe<Scalars['Int']['input']>;
  anonymityOption?: InputMaybe<Scalars['Boolean']['input']>;
  attendAgain?: InputMaybe<Scalars['Boolean']['input']>;
  careerAndAlumniResourceRating?: InputMaybe<Scalars['Int']['input']>;
  financialAidAndScholarshipRating?: InputMaybe<Scalars['Int']['input']>;
  gpa?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  levelOfStudy?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  postTag?: InputMaybe<Scalars['String']['input']>;
  postText?: InputMaybe<Scalars['String']['input']>;
  preferredLocation?: InputMaybe<Scalars['String']['input']>;
  relationToMajor?: InputMaybe<Scalars['Boolean']['input']>;
  reviewSubCategories?: InputMaybe<Scalars['String']['input']>;
  studentLifeAndServiceRating?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  testScore?: InputMaybe<TestScoreEnum>;
  testScoreMark?: InputMaybe<TestScoreMark>;
  unitId?: InputMaybe<Scalars['Float']['input']>;
  universitySearch?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddSearchQueryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddSpaceCategoryArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  isOrgSpace?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationAddTestScoreArgs = {
  testScore?: InputMaybe<TestScores>;
};


export type RootMutationAddUserRoadMapSummaryArgs = {
  answers?: InputMaybe<AnswerInput>;
  currentStep?: InputMaybe<Scalars['Int']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationBookmarkUniversityArgs = {
  unitId: Scalars['Float']['input'];
};


export type RootMutationCheckValidUsernameArgs = {
  username: Scalars['String']['input'];
};


export type RootMutationCreateHistoryArgs = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  events?: InputMaybe<Array<InputMaybe<Event>>>;
  orgId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type RootMutationCreateHistoryActivityArgs = {
  date: Scalars['String']['input'];
  orgHistoryId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type RootMutationCreateOrgSpaceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type RootMutationDeleteActivityArgs = {
  activityId: Scalars['ID']['input'];
};


export type RootMutationDeleteCommentArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteEducationArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteEventByIdArgs = {
  eventId: Scalars['ID']['input'];
};


export type RootMutationDeleteGuestbookMessageArgs = {
  guestbookId: Scalars['String']['input'];
};


export type RootMutationDeleteHistoryArgs = {
  orgHistoryId: Scalars['ID']['input'];
};


export type RootMutationDeleteOrgSpaceByIdArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationDeletePostArgs = {
  postId: Scalars['String']['input'];
};


export type RootMutationDeletePostImageByIdArgs = {
  id: Scalars['String']['input'];
};


export type RootMutationDeleteSpaceCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationDeleteSpaceCategoryImageByIdArgs = {
  id: Scalars['ID']['input'];
};


export type RootMutationDeleteTestScoreArgs = {
  type: Scalars['String']['input'];
};


export type RootMutationEditAboutArgs = {
  about: Scalars['String']['input'];
};


export type RootMutationEditActivityArgs = {
  activityId: Scalars['ID']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type RootMutationEditCommentArgs = {
  commentId: Scalars['String']['input'];
  commentText: Scalars['String']['input'];
};


export type RootMutationEditEducationArgs = {
  degree?: InputMaybe<Scalars['String']['input']>;
  graduationDate: Scalars['String']['input'];
  id: Scalars['String']['input'];
  major?: InputMaybe<Scalars['String']['input']>;
  school: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type RootMutationEditGuestbookMessageArgs = {
  guestbookId: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type RootMutationEditHistoryArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  orgHistoryId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationEditPostArgs = {
  postId: Scalars['String']['input'];
  postText: Scalars['String']['input'];
};


export type RootMutationEditProfileArgs = {
  ACTScore?: InputMaybe<Scalars['Float']['input']>;
  IELTSSCORE?: InputMaybe<Scalars['Float']['input']>;
  SATScore?: InputMaybe<Scalars['Float']['input']>;
  TOEFLScore?: InputMaybe<Scalars['Float']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  highSchoolGPA?: InputMaybe<Scalars['Float']['input']>;
  highSchoolPercent?: InputMaybe<Scalars['Float']['input']>;
  interestedSpace?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  interestedSubjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  interestedUni?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lastName: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  oneLinerBio?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  predictedACTScore?: InputMaybe<Scalars['Float']['input']>;
  predictedHighSchoolGPA?: InputMaybe<Scalars['Float']['input']>;
  predictedIELTSScore?: InputMaybe<Scalars['Float']['input']>;
  predictedSATScore?: InputMaybe<Scalars['Float']['input']>;
  predictedTOEFLScore?: InputMaybe<Scalars['Float']['input']>;
  schoolGPA?: InputMaybe<Scalars['Float']['input']>;
  schoolPercent?: InputMaybe<Scalars['Float']['input']>;
  socialLinks?: InputMaybe<Links>;
  studyLevel?: InputMaybe<Scalars['String']['input']>;
  userStatus?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


export type RootMutationEditSpaceCategoryByIdArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type RootMutationLoginArgs = {
  code?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  spaceOrgName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationRegisterArgs = {
  code?: InputMaybe<Scalars['Float']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  spaceOrgName?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationRegisteredUserByEventIdArgs = {
  eventId: Scalars['ID']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type RootMutationRemoveConnectRequestArgs = {
  connecteeId: Scalars['String']['input'];
};


export type RootMutationRequestToJoinOrgArgs = {
  email: Scalars['String']['input'];
  orgId: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationSaveArgs = {
  postId: Scalars['String']['input'];
};


export type RootMutationSendConnectRequestArgs = {
  receiverId: Scalars['String']['input'];
};


export type RootMutationSendGuestbookMessageArgs = {
  message: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
};


export type RootMutationSendVerficationMailArgs = {
  email: Scalars['String']['input'];
};


export type RootMutationSentGuestbookMessageArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};


export type RootMutationToggleViewArgs = {
  card: Scalars['String']['input'];
};


export type RootMutationUnSaveArgs = {
  postId: Scalars['String']['input'];
};


export type RootMutationUpVoteArgs = {
  postId: Scalars['String']['input'];
};


export type RootMutationUpdateEventByIdArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventDate?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationUpdateOrgSpaceByIdArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type RootMutationUploadImageArgs = {
  file: Scalars['String']['input'];
};


export type RootMutationVerifyEmailArgs = {
  email: Scalars['String']['input'];
  verificationCode?: InputMaybe<Scalars['Int']['input']>;
};


export type RootMutationVerifyReferralCodeArgs = {
  code: Scalars['String']['input'];
};

export type RootQuery = {
  __typename?: 'rootQuery';
  /** get comments list. postId is mandatory */
  commentList?: Maybe<CommentList>;
  connectedList?: Maybe<ConnectionListQuery>;
  connectionTest?: Maybe<Scalars['Boolean']['output']>;
  correctMyScholarshipDs?: Maybe<Scalars['Boolean']['output']>;
  createPostFromUniversityContent?: Maybe<ResStatus>;
  createUniversityService?: Maybe<ResStatus>;
  fetchFeedV2?: Maybe<NewsFeedQuery>;
  fetchMyNewsFeed?: Maybe<NewsFeedQuery>;
  fetchNewsFeed?: Maybe<SearchPostQuery>;
  findConnection?: Maybe<SearchUserQuery>;
  generateNewsFeedSystem?: Maybe<NewsFeedQuery>;
  generateRecommendedUniversity?: Maybe<UniversityQuery>;
  generateSpaceNewsFeedSystem?: Maybe<NewsFeedQuery>;
  generateUniversityPost?: Maybe<NewsFeedQuery>;
  getAllEventBySpaceId?: Maybe<AllEventResponse>;
  getAllHistory?: Maybe<AllOrgHistoryResponse>;
  getAllHistoryActivity?: Maybe<AllHistoryActivityResponse>;
  getAllHistoryYear?: Maybe<OrgHistoryYearResponse>;
  getAllInterviewData?: Maybe<InterviewExperienceListQuery>;
  getAllMemberBySpaceId?: Maybe<SpaceAllMembershipResponse>;
  /** Get notification by userId */
  getAllNotifications?: Maybe<NotificationListQuery>;
  getAllPostByOrgSpaceId?: Maybe<GetPostQuery>;
  getAllPostBySpaceCategoryID?: Maybe<GetPostQuery>;
  /** Search Questions */
  getAllQuestions?: Maybe<QuestionResponse>;
  getAllSubSpacesByParentId?: Maybe<SpaceCategoryQuery>;
  getDicussionUniWall?: Maybe<Array<Maybe<PostNewsFeed>>>;
  getEventById?: Maybe<SpaceEventResponse>;
  getFamousUniversity?: Maybe<Array<Maybe<NewSchoolUniversity>>>;
  getHistory?: Maybe<OrgHistoryActivityResponse>;
  getInterviewExperience?: Maybe<InterviewExperienceList>;
  getOrgSpaceById?: Maybe<OrgSpaceResponse>;
  getOwnBookmarkUniversity?: Maybe<BookmarkUniversityResponse>;
  getOwnOrgSpaces?: Maybe<GetAllOrgSpaceResponse>;
  /** Search Space category By Name */
  getOwnSpaceCategory?: Maybe<SpaceCategoryQuery>;
  getParentDetailsBySubSpaceId?: Maybe<SpaceCategoryResponse>;
  /** Get post of specific users */
  getPostById?: Maybe<GetPostDetailsQuery>;
  getProfessors?: Maybe<Array<Maybe<Professor>>>;
  getS3SignedURL?: Maybe<S3SignedUrlQuery>;
  getScholarshipsAt?: Maybe<ScholarshipResponse>;
  getSchoolInfo?: Maybe<School>;
  getSearchUniversityAnalytics?: Maybe<SearchUniversityAnalyticsQuery>;
  getSimilarSchools?: Maybe<SimilarSchools>;
  getTopActiveSpaces?: Maybe<SpaceCategoryQuery>;
  getTopInterviewData?: Maybe<TopInterviewQuery>;
  getTopOrgSpace?: Maybe<GetAllOrgSpaceResponse>;
  getUniversityDetailsByUnitId?: Maybe<School>;
  getUpdatedSchoolInfo?: Maybe<NewSchool>;
  getUser?: Maybe<GetUserQuery>;
  getUserEvaluation?: Maybe<UserEvaluation>;
  /** Get user by username */
  getUserRoadMapSummary?: Maybe<UserRoadMapQuery>;
  getUsersBySpaceId?: Maybe<SpaceMembershipResponse>;
  intrestingFacts?: Maybe<Array<Maybe<StudentChargesSchema>>>;
  loadPostImageToImagesField?: Maybe<ResStatus>;
  migrateUniData?: Maybe<Scalars['Boolean']['output']>;
  myNewsFeeds?: Maybe<NewsFeedQuery>;
  pendingConnectionList?: Maybe<ConnectionListQuery>;
  receivedConnectionList?: Maybe<ConnectionListQuery>;
  receivedGuestbookList?: Maybe<GuestbookQuery>;
  /** get comments replies list. postId is mandatory */
  replyList?: Maybe<CommentList>;
  requestToJoinOrg?: Maybe<Scalars['Boolean']['output']>;
  savedList?: Maybe<UserPostList>;
  /** Search Questions */
  scholarshiAmountForAllUni?: Maybe<ScholarshipResponse>;
  scholarshipAtUni?: Maybe<ScholarshipResponse>;
  search?: Maybe<SearchResponse>;
  searchAllSchool?: Maybe<Array<Maybe<School>>>;
  searchFamousRatedUniversity?: Maybe<FamousRatedUniversityQuery>;
  searchInternationalFavorableUnits?: Maybe<Array<Maybe<InternationalFavorableUnits>>>;
  searchMajors?: Maybe<Array<Maybe<MajorSchema>>>;
  /**
   * Search Questions
   * test: Boolean
   */
  searchScholarship?: Maybe<ScholarshipResponse>;
  searchScholarship2?: Maybe<ScholarshipResponse>;
  searchSchool?: Maybe<Array<Maybe<InstitutionCharacterSchema>>>;
  searchSchoolByUnitIds?: Maybe<Array<Maybe<NewSchool>>>;
  searchSchoolDetails?: Maybe<Array<Maybe<NewSchool>>>;
  searchSpace?: Maybe<SpaceCategoryQuery>;
  searchSpaceCategory?: Maybe<SearchOneCategoryQuery>;
  searchUniversity?: Maybe<Array<Maybe<NewSchoolScholarship>>>;
  searchUniversityByQuery?: Maybe<UniDepartmentQuery>;
  searchUser?: Maybe<SearchUserQuery>;
  setSpaceCategory?: Maybe<Scalars['Boolean']['output']>;
  test?: Maybe<Scalars['Boolean']['output']>;
  universityWithNoImages?: Maybe<Array<Maybe<NonImagesSchool>>>;
  /** get upVoters list. postId is mandatory */
  upVoteList?: Maybe<UpVoteList>;
  uploadImage?: Maybe<Scalars['Boolean']['output']>;
  userInterviewExpUnis?: Maybe<Array<Maybe<School>>>;
  writer?: Maybe<Scalars['Boolean']['output']>;
};


export type RootQueryCommentListArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};


export type RootQueryConnectedListArgs = {
  userId: Scalars['String']['input'];
};


export type RootQueryCreatePostFromUniversityContentArgs = {
  userId: Scalars['String']['input'];
};


export type RootQueryFetchFeedV2Args = {
  feedQuery?: InputMaybe<FeedQueryInput>;
};


export type RootQueryFetchMyNewsFeedArgs = {
  page: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};


export type RootQueryFetchNewsFeedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryFindConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGenerateNewsFeedSystemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGenerateRecommendedUniversityArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGenerateSpaceNewsFeedSystemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGenerateUniversityPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllEventBySpaceIdArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  spaceId: Scalars['ID']['input'];
};


export type RootQueryGetAllHistoryArgs = {
  orgId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllHistoryActivityArgs = {
  endYear?: InputMaybe<Scalars['Int']['input']>;
  orgHistoryId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllHistoryYearArgs = {
  orgId: Scalars['ID']['input'];
};


export type RootQueryGetAllInterviewDataArgs = {
  attempt?: InputMaybe<Scalars['Int']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  uni?: InputMaybe<Scalars['String']['input']>;
  uniId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllMemberBySpaceIdArgs = {
  endYear?: InputMaybe<Scalars['Int']['input']>;
  spaceId: Scalars['ID']['input'];
  startYear?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllPostByOrgSpaceIdArgs = {
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllPostBySpaceCategoryIdArgs = {
  id: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetAllSubSpacesByParentIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetDicussionUniWallArgs = {
  page: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
  unitId?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetEventByIdArgs = {
  eventId: Scalars['ID']['input'];
};


export type RootQueryGetFamousUniversityArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetHistoryArgs = {
  orgHistoryId: Scalars['ID']['input'];
};


export type RootQueryGetInterviewExperienceArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  unitId: Scalars['Float']['input'];
};


export type RootQueryGetOrgSpaceByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetOwnOrgSpacesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetOwnSpaceCategoryArgs = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetParentDetailsBySubSpaceIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type RootQueryGetPostByIdArgs = {
  id: Scalars['String']['input'];
  user?: InputMaybe<Scalars['String']['input']>;
};


export type RootQueryGetProfessorsArgs = {
  major?: InputMaybe<Scalars['String']['input']>;
  overallRating?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  unitId?: InputMaybe<Scalars['Float']['input']>;
};


export type RootQueryGetScholarshipsAtArgs = {
  unitId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetSchoolInfoArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  unitId?: InputMaybe<Scalars['Float']['input']>;
};


export type RootQueryGetSimilarSchoolsArgs = {
  unitId?: InputMaybe<Scalars['Float']['input']>;
};


export type RootQueryGetTopActiveSpacesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryGetUniversityDetailsByUnitIdArgs = {
  unitId: Scalars['Int']['input'];
};


export type RootQueryGetUpdatedSchoolInfoArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  unitId?: InputMaybe<Scalars['Float']['input']>;
};


export type RootQueryGetUserArgs = {
  username: Scalars['String']['input'];
};


export type RootQueryGetUserEvaluationArgs = {
  unitId?: InputMaybe<Scalars['Float']['input']>;
};


export type RootQueryGetUserRoadMapSummaryArgs = {
  userId: Scalars['ID']['input'];
};


export type RootQueryGetUsersBySpaceIdArgs = {
  role: Scalars['String']['input'];
  spaceId: Scalars['ID']['input'];
};


export type RootQueryIntrestingFactsArgs = {
  act?: InputMaybe<RangeInput>;
  departmentRatings?: InputMaybe<RangeInput>;
  gpa?: InputMaybe<RangeInput>;
  graduateApplicationFee?: InputMaybe<RangeInput>;
  graduateInStateTuitionFee?: InputMaybe<RangeInput>;
  graduateOutOfStateTuitionFee?: InputMaybe<RangeInput>;
  inState?: InputMaybe<Scalars['Float']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  outOfState?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sat?: InputMaybe<RangeInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  undergraduateApplicationFee?: InputMaybe<RangeInput>;
  undergraduateInStateTuitionFee?: InputMaybe<RangeInput>;
  undergraduateOffCampusNotWithFamilyInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusWithFamilyInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOnCampusInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOnCampusOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOutOfStateTuitionFee?: InputMaybe<RangeInput>;
};


export type RootQueryMyNewsFeedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryReceivedGuestbookListArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};


export type RootQueryReplyListArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
};


export type RootQueryRequestToJoinOrgArgs = {
  email: Scalars['String']['input'];
  orgId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type RootQuerySavedListArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};


export type RootQueryScholarshipAtUniArgs = {
  unitId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuerySearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  org?: InputMaybe<Scalars['Boolean']['input']>;
  orgId?: InputMaybe<Scalars['ID']['input']>;
  q: Scalars['String']['input'];
  school?: InputMaybe<Scalars['Boolean']['input']>;
  space?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Scalars['Boolean']['input']>;
};


export type RootQuerySearchFamousRatedUniversityArgs = {
  major: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchInternationalFavorableUnitsArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  costRange?: InputMaybe<Scalars['String']['input']>;
  livingArrangement?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overallRating?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  range?: InputMaybe<Scalars['String']['input']>;
  stateAbbreviation?: InputMaybe<Scalars['String']['input']>;
  streetAddressOrPOBox?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  totalPeopleVoted?: InputMaybe<Scalars['Float']['input']>;
  unitId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuerySearchMajorsArgs = {
  name: Scalars['String']['input'];
};


export type RootQuerySearchScholarshipArgs = {
  act?: InputMaybe<Scalars['Int']['input']>;
  gpa?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sat?: InputMaybe<Scalars['Int']['input']>;
  uniId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuerySearchScholarship2Args = {
  act?: InputMaybe<RangeInput>;
  gpa?: InputMaybe<RangeInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sat?: InputMaybe<RangeInput>;
};


export type RootQuerySearchSchoolArgs = {
  brief?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchSchoolByUnitIdsArgs = {
  unitIds: Array<Scalars['Int']['input']>;
};


export type RootQuerySearchSchoolDetailsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type RootQuerySearchSpaceArgs = {
  searchString: Scalars['String']['input'];
};


export type RootQuerySearchSpaceCategoryArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  q: Scalars['String']['input'];
};


export type RootQuerySearchUniversityArgs = {
  act?: InputMaybe<RangeInput>;
  departmentRatings?: InputMaybe<RangeInput>;
  gpa?: InputMaybe<RangeInput>;
  graduateApplicationFee?: InputMaybe<RangeInput>;
  graduateInStateTuitionFee?: InputMaybe<RangeInput>;
  graduateOutOfStateTuitionFee?: InputMaybe<RangeInput>;
  inState?: InputMaybe<Scalars['Float']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  outOfState?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sat?: InputMaybe<RangeInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  undergraduateApplicationFee?: InputMaybe<RangeInput>;
  undergraduateInStateTuitionFee?: InputMaybe<RangeInput>;
  undergraduateOffCampusNotWithFamilyInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusNotWithFamilyOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusWithFamilyInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOffCampusWithFamilyOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOnCampusInStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOnCampusOutOfStateCostOfAttendance?: InputMaybe<RangeInput>;
  undergraduateOutOfStateTuitionFee?: InputMaybe<RangeInput>;
};


export type RootQuerySearchUniversityByQueryArgs = {
  gt?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  sub?: InputMaybe<Scalars['String']['input']>;
  uniId?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQuerySearchUserArgs = {
  searchString: Scalars['String']['input'];
};


export type RootQueryUpVoteListArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  postId: Scalars['String']['input'];
};

export type S3SignedUrlQuery = {
  __typename?: 's3SignedUrlQuery';
  response?: Maybe<SignedUrl>;
  status?: Maybe<ResStatus>;
};

export type SearchOneCategoryQuery = {
  __typename?: 'searchOneCategoryQuery';
  data?: Maybe<SpaceCategory>;
  status?: Maybe<ResStatus>;
};

export type SearchSchoolQuery = {
  __typename?: 'searchSchoolQuery';
  name?: Maybe<Scalars['String']['output']>;
};

export type SendGuestbookMessageQuery = {
  __typename?: 'sendGuestbookMessageQuery';
  status?: Maybe<ResStatus>;
};

export type SpaceCategory = {
  __typename?: 'spaceCategory';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isJoined?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type SpaceCategoryQuery = {
  __typename?: 'spaceCategoryQuery';
  spaceCategory?: Maybe<Array<Maybe<SpaceCategory>>>;
  status?: Maybe<ResStatus>;
};

export type SpaceCategoryResponse = {
  __typename?: 'spaceCategoryResponse';
  data?: Maybe<SpaceCategory>;
  status?: Maybe<ResStatus>;
};

export type StudentObj = {
  __typename?: 'studentObj';
  men?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  women?: Maybe<Scalars['Float']['output']>;
};

export type TestDataObj = {
  __typename?: 'testDataObj';
  percentile25th?: Maybe<Scalars['Float']['output']>;
  percentile75th?: Maybe<Scalars['Float']['output']>;
};

export type TestScoreQuery = {
  __typename?: 'testScoreQuery';
  status?: Maybe<ResStatus>;
  testScore?: Maybe<TestScore>;
};

export type TestScores = {
  ACT_SCORE?: InputMaybe<Aptitude_Test>;
  IELTS_SCORE?: InputMaybe<English_Test>;
  SAT_SCORE?: InputMaybe<Aptitude_Test>;
  TOEFL_SCORE?: InputMaybe<English_Test>;
};

export type ToggleQuery = {
  __typename?: 'toggleQuery';
  private?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<ResStatus>;
};

export type TutionAndFeesObj = {
  __typename?: 'tutionAndFeesObj';
  fees?: Maybe<Scalars['Float']['output']>;
};

export type TypeObject = {
  __typename?: 'typeObject';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type UpVote = {
  __typename?: 'upVote';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  upVotesCount?: Maybe<Scalars['Float']['output']>;
};

export type UpVoteList = {
  __typename?: 'upVoteList';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  totalVotersCount?: Maybe<Scalars['Float']['output']>;
  upVoters?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'user';
  _id?: Maybe<Scalars['ID']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserPostList = {
  __typename?: 'userPostList';
  Posts?: Maybe<Array<Maybe<Post>>>;
  status?: Maybe<ResStatus>;
  totalPosts?: Maybe<Scalars['Float']['output']>;
};

export type LoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['Float']['input']>;
  spaceOrgName?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoginMutation = { __typename?: 'rootMutation', login?: { __typename?: 'LoginResponseQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'LoginResponse', accessToken?: string | null, refreshToken?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, role?: number | null, newUser?: boolean | null, id?: string | null, userAddedToOrg?: boolean | null, spaceOrgName?: string | null } | null } | null };

export type RegisterMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  spaceOrgName?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['Float']['input']>;
}>;


export type RegisterMutation = { __typename?: 'rootMutation', register?: { __typename?: 'ResponseQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  verificationCode?: InputMaybe<Scalars['Int']['input']>;
}>;


export type VerifyEmailMutation = { __typename?: 'rootMutation', verifyEmail?: { __typename?: 'TokenResponseQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'TokenQuery', accessToken?: string | null, refreshToken?: string | null } | null } | null };

export type SendVerficationMailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendVerficationMailMutation = { __typename?: 'rootMutation', sendVerficationMail?: { __typename?: 'ResponseQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type AddCommentMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  commentText?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  replyTo?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddCommentMutation = { __typename?: 'rootMutation', addComment?: { __typename?: 'addComment', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'Comment', _id?: string | null, userId?: string | null, postId?: string | null, parentId?: string | null, commentText?: string | null, commentImage?: string | null, date?: any | null, repliesCount?: number | null, upVoteCount?: number | null, replyTo?: string | null, upVoted?: boolean | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null } | null } | null };

export type AddEducationMutationVariables = Exact<{
  school: Scalars['String']['input'];
  degree?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  graduationDate: Scalars['String']['input'];
}>;


export type AddEducationMutation = { __typename?: 'rootMutation', addEducation?: { __typename?: 'educationQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, education?: { __typename?: 'Education', private?: boolean | null, schools?: Array<{ __typename?: 'Schools', _id?: string | null, school?: string | null, degree?: string | null, major?: string | null, startDate?: string | null, graduationDate?: string | null } | null> | null } | null } | null };

export type AddPostMutationVariables = Exact<{
  postText: Scalars['String']['input'];
  unitId?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
  postTag?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  levelOfStudy?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  gpa?: InputMaybe<Scalars['Float']['input']>;
  testScore?: InputMaybe<TestScoreEnum>;
  testScoreMark?: InputMaybe<TestScoreMark>;
  preferredLocation?: InputMaybe<Scalars['String']['input']>;
  universitySearch?: InputMaybe<Scalars['String']['input']>;
  anonymityOption?: InputMaybe<Scalars['Boolean']['input']>;
  relationToMajor?: InputMaybe<Scalars['Boolean']['input']>;
  attendAgain?: InputMaybe<Scalars['Boolean']['input']>;
  reviewSubCategories?: InputMaybe<Scalars['String']['input']>;
  admissionAndApplicationRating?: InputMaybe<Scalars['Int']['input']>;
  financialAidAndScholarshipRating?: InputMaybe<Scalars['Int']['input']>;
  academicProgramsAndDepartmentRating?: InputMaybe<Scalars['Int']['input']>;
  studentLifeAndServiceRating?: InputMaybe<Scalars['Int']['input']>;
  careerAndAlumniResourceRating?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddPostMutation = { __typename?: 'rootMutation', addPost?: { __typename?: 'newPost', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, post?: { __typename?: 'newlyAddedPost', _id?: string | null, postText?: string | null, date?: any | null } | null } | null };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
  user?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostByIdQuery = { __typename?: 'rootQuery', getPostById?: { __typename?: 'GetPostDetailsQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, post?: { __typename?: 'PostComment', _id: string, postText?: string | null, postCommentsCount?: number | null, admissionAndApplicationRating?: number | null, financialAidAndScholarshipRating?: number | null, academicProgramsAndDepartmentRating?: number | null, studentLifeAndServiceRating?: number | null, careerAndAlumniResourceRating?: number | null, postType?: string | null, postImage?: string | null, videoURL?: string | null, date?: any | null, upVoted?: boolean | null, images?: Array<string | null> | null, upVoteCount?: number | null, tags?: Array<{ __typename?: 'SpaceCategoryQuery', _id: string, name?: string | null, parentId?: string | null, image?: string | null, description?: string | null } | null> | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null, comments?: Array<{ __typename?: 'CommentDetails', _id?: string | null, commentText?: string | null, upVoted?: boolean | null, upVoteCount?: number | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, picture?: string | null, username?: string | null } | null } | null> | null } | null } | null };

export type EditPostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  postText: Scalars['String']['input'];
}>;


export type EditPostMutation = { __typename?: 'rootMutation', editPost?: { __typename?: 'GetPostQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'rootMutation', deletePost?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'rootMutation', deleteComment?: { __typename?: 'addComment', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type EditAboutMutationVariables = Exact<{
  about: Scalars['String']['input'];
}>;


export type EditAboutMutation = { __typename?: 'rootMutation', editAbout?: { __typename?: 'AboutQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, about?: { __typename?: 'About', text?: string | null, private?: boolean | null } | null } | null };

export type EditEducationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  school: Scalars['String']['input'];
  degree?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  graduationDate: Scalars['String']['input'];
}>;


export type EditEducationMutation = { __typename?: 'rootMutation', editEducation?: { __typename?: 'educationQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, education?: { __typename?: 'Education', private?: boolean | null, schools?: Array<{ __typename?: 'Schools', _id?: string | null, school?: string | null, degree?: string | null, major?: string | null, startDate?: string | null, graduationDate?: string | null } | null> | null } | null } | null };

export type EditProfileMutationVariables = Exact<{
  picture?: InputMaybe<Scalars['String']['input']>;
  coverPicture?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  oneLinerBio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  interestedSubjects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
  userStatus?: InputMaybe<Scalars['String']['input']>;
  studyLevel?: InputMaybe<Scalars['String']['input']>;
  interestedUni?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>>;
}>;


export type EditProfileMutation = { __typename?: 'rootMutation', editProfile?: { __typename?: 'UserQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null, oneLinerBio?: string | null, location?: string | null, age?: number | null, gender?: string | null, birthday?: string | null, name?: string | null, role?: number | null, verified?: boolean | null, blocked?: boolean | null, banned?: boolean | null, active?: boolean | null, picture?: string | null, doj?: any | null } | null } | null };

export type CommentListQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CommentListQuery = { __typename?: 'rootQuery', commentList?: { __typename?: 'commentList', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'Comment', _id?: string | null, userId?: string | null, postId?: string | null, parentId?: string | null, commentText?: string | null, commentImage?: string | null, date?: any | null, repliesCount?: number | null, upVoteCount?: number | null, replyTo?: string | null, upVoted?: boolean | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null } | null> | null } | null };

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input'];
  commentText: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'rootMutation', editComment?: { __typename?: 'addComment', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type SavedListQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Float']['input']>;
}>;


export type SavedListQuery = { __typename?: 'rootQuery', savedList?: { __typename?: 'userPostList', totalPosts?: number | null, status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, Posts?: Array<{ __typename?: 'Post', _id: string, postText?: string | null, images?: Array<string | null> | null, postImage?: string | null, date?: any | null, postCommentsCount?: number | null, upVoted?: boolean | null, upVoteCount?: number | null, saved?: boolean | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null } | null> | null } | null };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'rootQuery', getUser?: { __typename?: 'GetUserQuery', connectionType?: { __typename?: 'ConnectionType', requestorId?: string | null, receiverId?: string | null, status?: string | null } | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null, age?: number | null, gender?: string | null, birthday?: string | null, name?: string | null, role?: number | null, verified?: boolean | null, location?: string | null, studyLevel?: string | null, oneLinerBio?: string | null, doj?: any | null, blocked?: boolean | null, banned?: boolean | null, active?: boolean | null, picture?: string | null, coverPicture?: string | null, _id: string, about?: { __typename?: 'About', text?: string | null, private?: boolean | null } | null, badges?: { __typename?: 'Badges', private?: boolean | null, earnedBadges?: Array<{ __typename?: 'EarnedBadges', title?: string | null, description?: string | null, date?: any | null } | null> | null } | null, education?: { __typename?: 'Education', private?: boolean | null, schools?: Array<{ __typename?: 'Schools', _id?: string | null, school?: string | null, degree?: string | null, major?: string | null, startDate?: string | null, graduationDate?: string | null } | null> | null } | null, testScore?: { __typename?: 'TestScoreOld', private?: boolean | null, scores?: { __typename?: 'Scores', SAT_SCORE?: { __typename?: 'multiTests', english?: number | null, maths?: number | null } | null, ACT_SCORE?: { __typename?: 'multiTests', english?: number | null, maths?: number | null } | null, IELTS_SCORE?: { __typename?: 'englishTest', score?: number | null } | null, TOEFL_SCORE?: { __typename?: 'englishTest', score?: number | null } | null } | null } | null } | null } | null };

export type UpVoteListQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Float']['input']>;
}>;


export type UpVoteListQuery = { __typename?: 'rootQuery', upVoteList?: { __typename?: 'upVoteList', success?: boolean | null, message?: string | null, upVoters?: Array<{ __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, picture?: string | null } | null> | null } | null };

export type ReceivedGuestbookListQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
}>;


export type ReceivedGuestbookListQuery = { __typename?: 'rootQuery', receivedGuestbookList?: { __typename?: 'GuestbookQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, guestbook?: Array<{ __typename?: 'Guestbook', _id?: string | null, date?: any | null, message?: string | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null, verified?: boolean | null, picture?: string | null } | null } | null> | null } | null };

export type SaveMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type SaveMutation = { __typename?: 'rootMutation', save?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type UnSaveMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type UnSaveMutation = { __typename?: 'rootMutation', unSave?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type SendGuestbookMessageMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SendGuestbookMessageMutation = { __typename?: 'rootMutation', sendGuestbookMessage?: { __typename?: 'sendGuestbookMessageQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type ToggleViewMutationVariables = Exact<{
  card: Scalars['String']['input'];
}>;


export type ToggleViewMutation = { __typename?: 'rootMutation', toggleView?: { __typename?: 'toggleQuery', private?: boolean | null, status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type UpVoteMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type UpVoteMutation = { __typename?: 'rootMutation', upVote?: { __typename?: 'upVote', upVotesCount?: number | null, success?: boolean | null, message?: string | null } | null };

export type DeleteEducationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEducationMutation = { __typename?: 'rootMutation', deleteEducation?: { __typename?: 'educationQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, education?: { __typename?: 'Education', private?: boolean | null, schools?: Array<{ __typename?: 'Schools', _id?: string | null, school?: string | null, degree?: string | null, major?: string | null, startDate?: string | null, graduationDate?: string | null } | null> | null } | null } | null };

export type SendConnectRequestMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
}>;


export type SendConnectRequestMutation = { __typename?: 'rootMutation', sendConnectRequest?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type RemoveConnectRequestMutationVariables = Exact<{
  connecteeId: Scalars['String']['input'];
}>;


export type RemoveConnectRequestMutation = { __typename?: 'rootMutation', removeConnectRequest?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type ConnectedListQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ConnectedListQuery = { __typename?: 'rootQuery', connectedList?: { __typename?: 'connectionListQuery', status?: { __typename?: 'ResStatus', message?: string | null, success?: boolean | null } | null, connectionList?: Array<{ __typename?: 'connectionList', date?: any | null, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null, _id: string, picture?: string | null } | null } | null> | null } | null };

export type AcceptConnectRequestMutationVariables = Exact<{
  requestorId: Scalars['String']['input'];
}>;


export type AcceptConnectRequestMutation = { __typename?: 'rootMutation', acceptConnectRequest?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null };

export type FetchFeedV2QueryVariables = Exact<{
  feedQuery?: InputMaybe<FeedQueryInput>;
}>;


export type FetchFeedV2Query = { __typename?: 'rootQuery', fetchFeedV2?: { __typename?: 'NewsFeedQuery', data?: Array<{ __typename?: 'PostNewsFeed', section?: string | null, postText?: string | null, admissionAndApplicationRating?: number | null, financialAidAndScholarshipRating?: number | null, academicProgramsAndDepartmentRating?: number | null, studentLifeAndServiceRating?: number | null, careerAndAlumniResourceRating?: number | null, upVoted?: boolean | null, upVoteCount?: number | null, postCommentsCount?: number | null, type?: string | null, saved?: boolean | null, videoURL?: string | null, date?: any | null, _id?: string | null, images?: Array<string | null> | null, unitId?: number | null, applied_level?: string | null, status?: boolean | null, attempt?: number | null, university?: string | null, conversation?: string | null, major?: string | null, event?: { __typename?: 'OrgEvent', _id?: string | null, title?: string | null, description?: string | null, isRegistered?: boolean | null, address?: string | null, eventDate?: string | null, images?: Array<string | null> | null, interestedUsers?: Array<{ __typename?: 'EventInterestedUser', userId?: string | null } | null> | null } | null, tags?: Array<{ __typename?: 'SpaceCategory', _id: string, name?: string | null, parentId?: string | null, image?: string | null, description?: string | null } | null> | null, user?: { __typename?: 'user', firstName?: string | null, lastName?: string | null, picture?: string | null, username?: string | null, _id?: string | null } | null, elevatorInfo?: { __typename?: 'InstitutionCharacterSchema', tags?: Array<string | null> | null, ownType?: string | null, name: string, pictures?: Array<string | null> | null, majors?: Array<{ __typename?: 'MajorObj', title?: string | null } | null> | null, address: { __typename?: 'Address', streetAddressOrPOBox: string, city: string, stateAbbreviation: string, zipCode?: string | null } } | null, studentCharges?: { __typename?: 'StudentChargesSchema', combinedChargeForRoomAndBoard: number, undergraduateApplicationFee: number, graduateApplicationFee: number, unitId: number, undergraduate?: { __typename?: 'Undergraduate', booksAndSupplies?: number | null, inState?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null, outOfState?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null, inDistrict?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null, onCampus?: { __typename?: 'PriceOfAttendance', roomAndBoard: number, otherExpenses: number, costOfAttendance: { __typename?: 'CostOfAttendance', inDistrict?: number | null, inState?: number | null, outOfState?: number | null } } | null, offCampusWithFamily?: { __typename?: 'PriceOfAttendance', roomAndBoard: number, otherExpenses: number, costOfAttendance: { __typename?: 'CostOfAttendance', inDistrict?: number | null, inState?: number | null, outOfState?: number | null } } | null, offCampusNotWithFamily?: { __typename?: 'PriceOfAttendance', roomAndBoard: number, otherExpenses: number, costOfAttendance: { __typename?: 'CostOfAttendance', inDistrict?: number | null, inState?: number | null, outOfState?: number | null } } | null } | null, graduate?: { __typename?: 'Graduate', inState?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null, outOfState?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null, inDistrict?: { __typename?: 'Tuition', tuition: number, requiredFees: number, perCreditHourCharge: number } | null } | null } | null, suggestedOrgs?: { __typename?: 'SuggestedSpace', name?: string | null, type?: string | null, spaces?: Array<{ __typename?: 'spaceCategory', _id: string, name?: string | null, description?: string | null, image?: string | null } | null> | null } | null, suggestedSpace?: { __typename?: 'SuggestedSpace', type?: string | null, name?: string | null, spaces?: Array<{ __typename?: 'spaceCategory', _id: string, name?: string | null, description?: string | null, image?: string | null } | null> | null } | null, userEvaluation?: { __typename?: 'UserEvaluation', unitId?: number | null, rankings?: Array<{ __typename?: 'Ranking', rank?: number | null, title?: string | null, totalPlayers?: number | null } | null> | null, report?: { __typename?: 'Report', academics?: number | null, average?: number | null, value?: number | null, diversity?: number | null, campus?: number | null, atheltics?: number | null, partyScene?: number | null, professors?: number | null, location?: number | null, dorms?: number | null, campusFood?: number | null, studentLife?: number | null, safety?: number | null } | null, reviews?: Array<{ __typename?: 'Review', rating?: number | null, type?: string | null, votes?: number | null } | null> | null } | null } | null> | null } | null };

export type GetInterviewExperienceQueryVariables = Exact<{
  unitId: Scalars['Float']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetInterviewExperienceQuery = { __typename?: 'rootQuery', getInterviewExperience?: { __typename?: 'interviewExperienceList', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, interviewExperience?: Array<{ __typename?: 'InterviewExperience', unitId?: number | null, applied_level?: string | null, status?: boolean | null, attempt?: number | null, university?: string | null, conversation?: string | null, major?: string | null } | null> | null } | null };

export type SearchSpaceCategoryQueryVariables = Exact<{
  q: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchSpaceCategoryQuery = { __typename?: 'rootQuery', searchSpaceCategory?: { __typename?: 'searchOneCategoryQuery', status?: { __typename?: 'ResStatus', message?: string | null, success?: boolean | null } | null, data?: { __typename?: 'spaceCategory', _id: string, name?: string | null, parentId?: string | null, description?: string | null, image?: string | null, role?: string | null, isJoined?: boolean | null, user?: { __typename?: 'User', username?: string | null, _id: string } | null } | null } | null };

export type GetOrgSpaceByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOrgSpaceByIdQuery = { __typename?: 'rootQuery', getOrgSpaceById?: { __typename?: 'OrgSpaceResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'SpaceOrg', name?: string | null, _id?: string | null, description?: string | null, profileImage?: string | null, coverImage?: string | null, image?: string | null, role?: string | null, isJoined?: boolean | null, admin?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, picture?: string | null, username?: string | null } | null } | null } | null };

export type GetAllPostByOrgSpaceIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllPostByOrgSpaceIdQuery = { __typename?: 'rootQuery', getAllPostByOrgSpaceId?: { __typename?: 'getPostQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'Post', _id: string, uniId?: number | null, images?: Array<string | null> | null, postText?: string | null, postImage?: string | null, date?: any | null, upVoteCount?: number | null, postCommentsCount?: number | null, upVoted?: boolean | null, saved?: boolean | null, videoURL?: string | null, type?: string | null, user?: { __typename?: 'user', _id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null, picture?: string | null } | null } | null> | null } | null };

export type GetAllEventBySpaceIdQueryVariables = Exact<{
  spaceId: Scalars['ID']['input'];
}>;


export type GetAllEventBySpaceIdQuery = { __typename?: 'rootQuery', getAllEventBySpaceId?: { __typename?: 'AllEventResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'SpaceEvent', _id?: string | null, title?: string | null, description?: string | null, address?: string | null, eventDate?: string | null, isRegistered?: boolean | null, interestedUsers?: Array<{ __typename?: 'InterestedUser', date?: any | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null } | null> | null } | null> | null } | null };

export type GetTopActiveSpacesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTopActiveSpacesQuery = { __typename?: 'rootQuery', getTopActiveSpaces?: { __typename?: 'spaceCategoryQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, spaceCategory?: Array<{ __typename?: 'spaceCategory', _id: string, name?: string | null, parentId?: string | null } | null> | null } | null };

export type CreateOrgSpaceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateOrgSpaceMutation = { __typename?: 'rootMutation', createOrgSpace?: { __typename?: 'OrgSpaceResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'SpaceOrg', name?: string | null, description?: string | null, profileImage?: string | null, _id?: string | null } | null } | null };

export type AddSpaceCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isOrgSpace?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AddSpaceCategoryMutation = { __typename?: 'rootMutation', addSpaceCategory?: { __typename?: 'spaceCategoryResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'spaceCategory', _id: string, name?: string | null } | null } | null };

export type AddSpaceEventMutationVariables = Exact<{
  spaceId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  address: Scalars['String']['input'];
  eventDate: Scalars['String']['input'];
}>;


export type AddSpaceEventMutation = { __typename?: 'rootMutation', addOrgSpaceEvent?: { __typename?: 'SpaceOrgEventResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'SpaceOrgEvent', _id?: string | null, userId?: string | null, orgId?: string | null, spaceId?: string | null, title?: string | null, description?: string | null, address?: string | null, eventDate?: string | null } | null } | null };

export type GetllEventQueryVariables = Exact<{
  spaceId: Scalars['ID']['input'];
}>;


export type GetllEventQuery = { __typename?: 'rootQuery', getAllEventBySpaceId?: { __typename?: 'AllEventResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'SpaceEvent', _id?: string | null, title?: string | null, eventDate?: string | null, description?: string | null, images?: Array<string | null> | null, isRegistered?: boolean | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null } | null, spaceOrg?: { __typename?: 'SpaceOrg', _id?: string | null, name?: string | null, description?: string | null, profileImage?: string | null, members?: Array<{ __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null } | null> | null } | null } | null> | null } | null };

export type DeleteSpaceCategoryByIdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSpaceCategoryByIdMutation = { __typename?: 'rootMutation', deleteSpaceCategoryById?: { __typename?: 'ResponseStatus', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type GetAllMemberBySpaceIdQueryVariables = Exact<{
  spaceId: Scalars['ID']['input'];
}>;


export type GetAllMemberBySpaceIdQuery = { __typename?: 'rootQuery', getAllMemberBySpaceId?: { __typename?: 'SpaceAllMembershipResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'SpaceAllMembership', members?: Array<{ __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null> | null, alumini?: Array<{ __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null> | null, students?: Array<{ __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null> | null } | null } | null };

export type EditSpaceCategoryByIdMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditSpaceCategoryByIdMutation = { __typename?: 'rootMutation', editSpaceCategoryById?: { __typename?: 'spaceCategoryResponse', status?: { __typename?: 'ResStatus', message?: string | null, success?: boolean | null } | null, data?: { __typename?: 'spaceCategory', _id: string, name?: string | null, parentId?: string | null, image?: string | null, description?: string | null, user?: { __typename?: 'User', _id: string } | null } | null } | null };

export type GetOwnSpaceQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetOwnSpaceQuery = { __typename?: 'rootQuery', getOwnSpaceCategory?: { __typename?: 'spaceCategoryQuery', status?: { __typename?: 'ResStatus', message?: string | null, success?: boolean | null } | null, spaceCategory?: Array<{ __typename?: 'spaceCategory', _id: string, name?: string | null, user?: { __typename?: 'User', username?: string | null, _id: string } | null } | null> | null } | null };

export type GenerateSpaceNewsFeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GenerateSpaceNewsFeedQuery = { __typename?: 'rootQuery', generateSpaceNewsFeedSystem?: { __typename?: 'NewsFeedQuery', status?: { __typename?: 'ResStatus', message?: string | null, success?: boolean | null } | null, data?: Array<{ __typename?: 'PostNewsFeed', _id?: string | null, postImage?: string | null, postText?: string | null, date?: any | null, upVoteCount?: number | null, postCommentsCount?: number | null, upVoted?: boolean | null, saved?: boolean | null, user?: { __typename?: 'user', _id?: string | null, username?: string | null, firstName?: string | null, lastName?: string | null, picture?: string | null } | null, tags?: Array<{ __typename?: 'SpaceCategory', _id: string, name?: string | null } | null> | null } | null> | null } | null };

export type GetUserRoadMapSummaryQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserRoadMapSummaryQuery = { __typename?: 'rootQuery', getUserRoadMapSummary?: { __typename?: 'UserRoadMapQuery', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'RoadMap', _id?: string | null, summary?: string | null, date?: any | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null } | null } | null> | null } | null };

export type GetFamousUniversityQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFamousUniversityQuery = { __typename?: 'rootQuery', getFamousUniversity?: Array<{ __typename?: 'NewSchoolUniversity', unitId?: number | null, name?: string | null, pictures?: string | null } | null> | null };

export type RegisteredUserByEventIdMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisteredUserByEventIdMutation = { __typename?: 'rootMutation', registeredUserByEventId?: { __typename?: 'SpaceOrgEventResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type DeleteEventByIdMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type DeleteEventByIdMutation = { __typename?: 'rootMutation', deleteEventById?: { __typename?: 'SpaceOrgEventResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type GetAllHistoryYearQueryVariables = Exact<{
  orgId: Scalars['ID']['input'];
}>;


export type GetAllHistoryYearQuery = { __typename?: 'rootQuery', getAllHistoryYear?: { __typename?: 'OrgHistoryYearResponse', data?: Array<number | null> | null, status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null } | null };

export type GetAllHistoryQueryVariables = Exact<{
  orgId: Scalars['ID']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllHistoryQuery = { __typename?: 'rootQuery', getAllHistory?: { __typename?: 'AllOrgHistoryResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'OrgHistory', _id?: string | null, title?: string | null, description?: string | null, date?: any | null } | null> | null } | null };

export type CreateHistoryMutationVariables = Exact<{
  orgId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  date: Scalars['String']['input'];
}>;


export type CreateHistoryMutation = { __typename?: 'rootMutation', createHistory?: { __typename?: 'OrgHistoryResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'OrgHistory', _id?: string | null, userId?: string | null, title?: string | null, description?: string | null, date?: any | null } | null } | null };

export type SearchQueryVariables = Exact<{
  q: Scalars['String']['input'];
}>;


export type SearchQuery = { __typename?: 'rootQuery', search?: { __typename?: 'SearchResponse', totalItems: number, items?: Array<{ __typename?: 'SearchResult', name?: string | null, type?: string | null, username?: string | null } | null> | null, spaces?: Array<{ __typename?: 'SpaceCategory', name?: string | null, description?: string | null } | null> | null, users?: Array<{ __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null, oneLinerBio?: string | null, picture?: string | null } | null> | null, orgs?: Array<{ __typename?: 'SpaceOrg', name?: string | null, description?: string | null } | null> | null } | null };

export type GetAllHistoryActivityQueryVariables = Exact<{
  orgHistoryId: Scalars['ID']['input'];
  startYear?: InputMaybe<Scalars['Int']['input']>;
  endYear?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllHistoryActivityQuery = { __typename?: 'rootQuery', getAllHistoryActivity?: { __typename?: 'AllHistoryActivityResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: Array<{ __typename?: 'HistoryActivity', _id?: string | null, title?: string | null, user?: { __typename?: 'user', _id?: string | null, firstName?: string | null, lastName?: string | null, username?: string | null, picture?: string | null } | null } | null> | null } | null };

export type EditHistoryMutationVariables = Exact<{
  orgHistoryId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditHistoryMutation = { __typename?: 'rootMutation', editHistory?: { __typename?: 'OrgHistoryResponse', status?: { __typename?: 'ResStatus', success?: boolean | null, message?: string | null } | null, data?: { __typename?: 'OrgHistory', _id?: string | null, userId?: string | null, orgId?: string | null, title?: string | null, description?: string | null, date?: any | null } | null } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceOrgName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceOrgName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceOrgName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"newUser"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userAddedToOrg"}},{"kind":"Field","name":{"kind":"Name","value":"spaceOrgName"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceOrgName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"spaceOrgName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceOrgName"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verificationCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"verificationCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verificationCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const SendVerficationMailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendVerficationMail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerficationMail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendVerficationMailMutation, SendVerficationMailMutationVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"replyTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentText"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"replyTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"replyTo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"commentText"}},{"kind":"Field","name":{"kind":"Name","value":"commentImage"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const AddEducationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEducation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"school"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"degree"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"major"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"graduationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEducation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"school"},"value":{"kind":"Variable","name":{"kind":"Name","value":"school"}}},{"kind":"Argument","name":{"kind":"Name","value":"degree"},"value":{"kind":"Variable","name":{"kind":"Name","value":"degree"}}},{"kind":"Argument","name":{"kind":"Name","value":"major"},"value":{"kind":"Variable","name":{"kind":"Name","value":"major"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"graduationDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"graduationDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"degree"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"graduationDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddEducationMutation, AddEducationMutationVariables>;
export const AddPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postTag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"levelOfStudy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"major"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gpa"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testScore"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TestScoreEnum"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testScoreMark"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TestScoreMark"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredLocation"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"universitySearch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"anonymityOption"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"relationToMajor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendAgain"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewSubCategories"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"admissionAndApplicationRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"financialAidAndScholarshipRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"academicProgramsAndDepartmentRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentLifeAndServiceRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"careerAndAlumniResourceRating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postText"}}},{"kind":"Argument","name":{"kind":"Name","value":"unitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"postTag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postTag"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"levelOfStudy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"levelOfStudy"}}},{"kind":"Argument","name":{"kind":"Name","value":"major"},"value":{"kind":"Variable","name":{"kind":"Name","value":"major"}}},{"kind":"Argument","name":{"kind":"Name","value":"gpa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gpa"}}},{"kind":"Argument","name":{"kind":"Name","value":"testScore"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testScore"}}},{"kind":"Argument","name":{"kind":"Name","value":"testScoreMark"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testScoreMark"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredLocation"}}},{"kind":"Argument","name":{"kind":"Name","value":"universitySearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"universitySearch"}}},{"kind":"Argument","name":{"kind":"Name","value":"anonymityOption"},"value":{"kind":"Variable","name":{"kind":"Name","value":"anonymityOption"}}},{"kind":"Argument","name":{"kind":"Name","value":"relationToMajor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"relationToMajor"}}},{"kind":"Argument","name":{"kind":"Name","value":"attendAgain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendAgain"}}},{"kind":"Argument","name":{"kind":"Name","value":"reviewSubCategories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewSubCategories"}}},{"kind":"Argument","name":{"kind":"Name","value":"admissionAndApplicationRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"admissionAndApplicationRating"}}},{"kind":"Argument","name":{"kind":"Name","value":"financialAidAndScholarshipRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"financialAidAndScholarshipRating"}}},{"kind":"Argument","name":{"kind":"Name","value":"academicProgramsAndDepartmentRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"academicProgramsAndDepartmentRating"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentLifeAndServiceRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentLifeAndServiceRating"}}},{"kind":"Argument","name":{"kind":"Name","value":"careerAndAlumniResourceRating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"careerAndAlumniResourceRating"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<AddPostMutation, AddPostMutationVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"admissionAndApplicationRating"}},{"kind":"Field","name":{"kind":"Name","value":"financialAidAndScholarshipRating"}},{"kind":"Field","name":{"kind":"Name","value":"academicProgramsAndDepartmentRating"}},{"kind":"Field","name":{"kind":"Name","value":"studentLifeAndServiceRating"}},{"kind":"Field","name":{"kind":"Name","value":"careerAndAlumniResourceRating"}},{"kind":"Field","name":{"kind":"Name","value":"postType"}},{"kind":"Field","name":{"kind":"Name","value":"postImage"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"commentText"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const EditPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"postText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<EditPostMutation, EditPostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditAboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editAbout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"about"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editAbout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"about"},"value":{"kind":"Variable","name":{"kind":"Name","value":"about"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]}}]}}]} as unknown as DocumentNode<EditAboutMutation, EditAboutMutationVariables>;
export const EditEducationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editEducation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"school"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"degree"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"major"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"graduationDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editEducation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"school"},"value":{"kind":"Variable","name":{"kind":"Name","value":"school"}}},{"kind":"Argument","name":{"kind":"Name","value":"degree"},"value":{"kind":"Variable","name":{"kind":"Name","value":"degree"}}},{"kind":"Argument","name":{"kind":"Name","value":"major"},"value":{"kind":"Variable","name":{"kind":"Name","value":"major"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"graduationDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"graduationDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"degree"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"graduationDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditEducationMutation, EditEducationMutationVariables>;
export const EditProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coverPicture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oneLinerBio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestedSubjects"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studyLevel"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interestedUni"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"picture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picture"}}},{"kind":"Argument","name":{"kind":"Name","value":"coverPicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coverPicture"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"oneLinerBio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oneLinerBio"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestedSubjects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestedSubjects"}}},{"kind":"Argument","name":{"kind":"Name","value":"userStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userStatus"}}},{"kind":"Argument","name":{"kind":"Name","value":"studyLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studyLevel"}}},{"kind":"Argument","name":{"kind":"Name","value":"interestedUni"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interestedUni"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"oneLinerBio"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"doj"}}]}}]}}]}}]} as unknown as DocumentNode<EditProfileMutation, EditProfileMutationVariables>;
export const CommentListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"commentList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"commentText"}},{"kind":"Field","name":{"kind":"Name","value":"commentImage"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"replyTo"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CommentListQuery, CommentListQueryVariables>;
export const EditCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentText"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentText"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<EditCommentMutation, EditCommentMutationVariables>;
export const SavedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"savedList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savedList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"postImage"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPosts"}}]}}]}}]} as unknown as DocumentNode<SavedListQuery, SavedListQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectionType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestorId"}},{"kind":"Field","name":{"kind":"Name","value":"receiverId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"age"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"studyLevel"}},{"kind":"Field","name":{"kind":"Name","value":"oneLinerBio"}},{"kind":"Field","name":{"kind":"Name","value":"doj"}},{"kind":"Field","name":{"kind":"Name","value":"blocked"}},{"kind":"Field","name":{"kind":"Name","value":"banned"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"coverPicture"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"about"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"earnedBadges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"degree"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"graduationDate"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"testScore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"scores"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SAT_SCORE"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"english"}},{"kind":"Field","name":{"kind":"Name","value":"maths"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ACT_SCORE"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"english"}},{"kind":"Field","name":{"kind":"Name","value":"maths"}}]}},{"kind":"Field","name":{"kind":"Name","value":"IELTS_SCORE"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"TOEFL_SCORE"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const UpVoteListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"upVoteList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upVoteList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"upVoters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]} as unknown as DocumentNode<UpVoteListQuery, UpVoteListQueryVariables>;
export const ReceivedGuestbookListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"receivedGuestbookList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"receivedGuestbookList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"guestbook"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ReceivedGuestbookListQuery, ReceivedGuestbookListQueryVariables>;
export const SaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"save"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"save"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SaveMutation, SaveMutationVariables>;
export const UnSaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unSave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unSave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UnSaveMutation, UnSaveMutationVariables>;
export const SendGuestbookMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendGuestbookMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendGuestbookMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SendGuestbookMessageMutation, SendGuestbookMessageMutationVariables>;
export const ToggleViewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleView"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"card"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleView"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"card"},"value":{"kind":"Variable","name":{"kind":"Name","value":"card"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"private"}}]}}]}}]} as unknown as DocumentNode<ToggleViewMutation, ToggleViewMutationVariables>;
export const UpVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upVotesCount"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpVoteMutation, UpVoteMutationVariables>;
export const DeleteEducationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteEducation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEducation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"degree"}},{"kind":"Field","name":{"kind":"Name","value":"major"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"graduationDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteEducationMutation, DeleteEducationMutationVariables>;
export const SendConnectRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendConnectRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendConnectRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendConnectRequestMutation, SendConnectRequestMutationVariables>;
export const RemoveConnectRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeConnectRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"connecteeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeConnectRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"connecteeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"connecteeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveConnectRequestMutation, RemoveConnectRequestMutationVariables>;
export const ConnectedListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"connectedList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectedList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"Field","name":{"kind":"Name","value":"connectionList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConnectedListQuery, ConnectedListQueryVariables>;
export const AcceptConnectRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"acceptConnectRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptConnectRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"requestorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AcceptConnectRequestMutation, AcceptConnectRequestMutationVariables>;
export const FetchFeedV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchFeedV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedQuery"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FeedQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchFeedV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"admissionAndApplicationRating"}},{"kind":"Field","name":{"kind":"Name","value":"financialAidAndScholarshipRating"}},{"kind":"Field","name":{"kind":"Name","value":"academicProgramsAndDepartmentRating"}},{"kind":"Field","name":{"kind":"Name","value":"studentLifeAndServiceRating"}},{"kind":"Field","name":{"kind":"Name","value":"careerAndAlumniResourceRating"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isRegistered"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"interestedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"elevatorInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"ownType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"majors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictures"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"streetAddressOrPOBox"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"stateAbbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"studentCharges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"combinedChargeForRoomAndBoard"}},{"kind":"Field","name":{"kind":"Name","value":"undergraduateApplicationFee"}},{"kind":"Field","name":{"kind":"Name","value":"graduateApplicationFee"}},{"kind":"Field","name":{"kind":"Name","value":"unitId"}},{"kind":"Field","name":{"kind":"Name","value":"undergraduate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outOfState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inDistrict"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onCampus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"costOfAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inDistrict"}},{"kind":"Field","name":{"kind":"Name","value":"inState"}},{"kind":"Field","name":{"kind":"Name","value":"outOfState"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomAndBoard"}},{"kind":"Field","name":{"kind":"Name","value":"otherExpenses"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offCampusWithFamily"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"costOfAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inDistrict"}},{"kind":"Field","name":{"kind":"Name","value":"inState"}},{"kind":"Field","name":{"kind":"Name","value":"outOfState"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomAndBoard"}},{"kind":"Field","name":{"kind":"Name","value":"otherExpenses"}}]}},{"kind":"Field","name":{"kind":"Name","value":"offCampusNotWithFamily"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"costOfAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inDistrict"}},{"kind":"Field","name":{"kind":"Name","value":"inState"}},{"kind":"Field","name":{"kind":"Name","value":"outOfState"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roomAndBoard"}},{"kind":"Field","name":{"kind":"Name","value":"otherExpenses"}}]}},{"kind":"Field","name":{"kind":"Name","value":"booksAndSupplies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"graduate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outOfState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inDistrict"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tuition"}},{"kind":"Field","name":{"kind":"Name","value":"requiredFees"}},{"kind":"Field","name":{"kind":"Name","value":"perCreditHourCharge"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"suggestedOrgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"suggestedSpace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userEvaluation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitId"}},{"kind":"Field","name":{"kind":"Name","value":"rankings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalPlayers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"report"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"academics"}},{"kind":"Field","name":{"kind":"Name","value":"average"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"diversity"}},{"kind":"Field","name":{"kind":"Name","value":"campus"}},{"kind":"Field","name":{"kind":"Name","value":"atheltics"}},{"kind":"Field","name":{"kind":"Name","value":"partyScene"}},{"kind":"Field","name":{"kind":"Name","value":"professors"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"dorms"}},{"kind":"Field","name":{"kind":"Name","value":"campusFood"}},{"kind":"Field","name":{"kind":"Name","value":"studentLife"}},{"kind":"Field","name":{"kind":"Name","value":"safety"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"votes"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitId"}},{"kind":"Field","name":{"kind":"Name","value":"applied_level"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"university"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"major"}}]}}]}}]}}]} as unknown as DocumentNode<FetchFeedV2Query, FetchFeedV2QueryVariables>;
export const GetInterviewExperienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInterviewExperience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getInterviewExperience"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"unitId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unitId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interviewExperience"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitId"}},{"kind":"Field","name":{"kind":"Name","value":"applied_level"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"university"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"major"}}]}}]}}]}}]} as unknown as DocumentNode<GetInterviewExperienceQuery, GetInterviewExperienceQueryVariables>;
export const SearchSpaceCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchSpaceCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchSpaceCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isJoined"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchSpaceCategoryQuery, SearchSpaceCategoryQueryVariables>;
export const GetOrgSpaceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrgSpaceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrgSpaceById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"coverImage"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"admin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isJoined"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrgSpaceByIdQuery, GetOrgSpaceByIdQueryVariables>;
export const GetAllPostByOrgSpaceIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllPostByOrgSpaceId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPostByOrgSpaceId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"uniId"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"postImage"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"videoURL"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPostByOrgSpaceIdQuery, GetAllPostByOrgSpaceIdQueryVariables>;
export const GetAllEventBySpaceIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllEventBySpaceId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllEventBySpaceId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"interestedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isRegistered"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllEventBySpaceIdQuery, GetAllEventBySpaceIdQueryVariables>;
export const GetTopActiveSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTopActiveSpaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTopActiveSpaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaceCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]}}]} as unknown as DocumentNode<GetTopActiveSpacesQuery, GetTopActiveSpacesQueryVariables>;
export const CreateOrgSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrgSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrgSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrgSpaceMutation, CreateOrgSpaceMutationVariables>;
export const AddSpaceCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addSpaceCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isOrgSpace"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSpaceCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"isOrgSpace"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isOrgSpace"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddSpaceCategoryMutation, AddSpaceCategoryMutationVariables>;
export const AddSpaceEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSpaceEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrgSpaceEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"spaceId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}}]}}]}}]}}]} as unknown as DocumentNode<AddSpaceEventMutation, AddSpaceEventMutationVariables>;
export const GetllEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetllEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllEventBySpaceId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"isRegistered"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaceOrg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetllEventQuery, GetllEventQueryVariables>;
export const DeleteSpaceCategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSpaceCategoryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSpaceCategoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteSpaceCategoryByIdMutation, DeleteSpaceCategoryByIdMutationVariables>;
export const GetAllMemberBySpaceIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMemberBySpaceId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMemberBySpaceId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alumini"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllMemberBySpaceIdQuery, GetAllMemberBySpaceIdQueryVariables>;
export const EditSpaceCategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editSpaceCategoryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editSpaceCategoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditSpaceCategoryByIdMutation, EditSpaceCategoryByIdMutationVariables>;
export const GetOwnSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOwnSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOwnSpaceCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaceCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOwnSpaceQuery, GetOwnSpaceQueryVariables>;
export const GenerateSpaceNewsFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GenerateSpaceNewsFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateSpaceNewsFeedSystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"postImage"}},{"kind":"Field","name":{"kind":"Name","value":"postText"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"upVoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"postCommentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"upVoted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"saved"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GenerateSpaceNewsFeedQuery, GenerateSpaceNewsFeedQueryVariables>;
export const GetUserRoadMapSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserRoadMapSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserRoadMapSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserRoadMapSummaryQuery, GetUserRoadMapSummaryQueryVariables>;
export const GetFamousUniversityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFamousUniversity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFamousUniversity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"}}]}}]}}]} as unknown as DocumentNode<GetFamousUniversityQuery, GetFamousUniversityQueryVariables>;
export const RegisteredUserByEventIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registeredUserByEventId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registeredUserByEventId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<RegisteredUserByEventIdMutation, RegisteredUserByEventIdMutationVariables>;
export const DeleteEventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteEventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteEventByIdMutation, DeleteEventByIdMutationVariables>;
export const GetAllHistoryYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHistoryYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHistoryYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<GetAllHistoryYearQuery, GetAllHistoryYearQueryVariables>;
export const GetAllHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHistoryQuery, GetAllHistoryQueryVariables>;
export const CreateHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<CreateHistoryMutation, CreateHistoryMutationVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"oneLinerBio"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const GetAllHistoryActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllHistoryActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgHistoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startYear"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endYear"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHistoryActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgHistoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgHistoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startYear"}}},{"kind":"Argument","name":{"kind":"Name","value":"endYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endYear"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHistoryActivityQuery, GetAllHistoryActivityQueryVariables>;
export const EditHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orgHistoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orgHistoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orgHistoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"orgId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<EditHistoryMutation, EditHistoryMutationVariables>;