/* eslint-disable no-unused-vars */

interface IElevatorInfo {
  unitId: string;
  address: IAddress;
  calendar: string;
  name: string;
  alias: string;
  urls: IURLs;
  highestLevelOfOffering: string;
  undergraduateOfferings: string;
  graduateOffering: string;
  grantsMedicalDegree: string;
  hasHospital: string;
  missionStatement: string;
  bio: string;
  briefAddress: string;
  library: ILibrary;
  majors: IMajor[];
  ownType: string;
  pictures: string[];
  tags: string[];
}

interface IAddress {
  streetAddressOrPOBox: string;
  city: string;
  stateAbbreviation: string;
  zipCode: string;
}

interface IURLs {
  home: string;
  financialAid: string;
  admissions: string;
  onlineApplication: string;
  netPriceCalculator: string;
}

interface ILibrary {
  physicalBook: number;
  physicalMedia: number;
  digitalElectronicBook: number;
  recordedYear: number;
}

interface IMajor {
  title: string;
  pollTotalGraduates: number;
}

interface IStudentCharges {
  id: string;
  unitId: string;
  undergraduate: IUndergraduate;
  graduate: IGraduate;
  combinedChargeForRoomAndBoard: number;
  undergraduateApplicationFee: number;
  graduateApplicationFee: number;
}

interface IUndergraduate {
  inState: ITuition;
  outOfState: ITuition;
  inDistrict: ITuition;
  onCampus: IPriceOfAttendance;
  offCampusWithFamily: IPriceOfAttendance;
  offCampusNotWithFamily: IPriceOfAttendance;
  booksAndSupplies: number;
}

interface IGraduate {
  inState: ITuition;
  outOfState: ITuition;
  inDistrict: ITuition;
}

interface ITuition {
  id: string;
  tuition: number;
  requiredFees: number;
  perCreditHourCharge: number;
}

interface IPriceOfAttendance {
  id: string;
  costOfAttendance: ICostOfAttendance;
  roomAndBoard: number;
  otherExpenses: number;
}

interface ICostOfAttendance {
  inDistrict: number;
  inState: number;
  outOfState: number;
}

interface IUserEvaluation {
  unitId: number;
  rankings: IRanking;
  report: IReport;
  reviews: IReview;
}

interface IRanking {
  rank: number;
  title: string;
  totalPlayers: number;
}

interface IReport {
  academics: number;
  average: number;
  value: number;
  diversity: number;
  campus: number;
  atheltics: number;
  partyScene: number;
  professors: number;
  location: number;
  dorms: number;
  campusFood: number;
  studentLife: number;
  safety: number;
}

interface IReview {
  rating: number;
  type: string;
  votes: number;
}

interface ISimilarSchools {
  unitId: number;
  similarSchools: ISimilarSchool[];
  recommendedUniversity: string[];
}

interface ISimilarSchool {
  grade: number;
  name: string;
}

interface ITestScores {
  sat: ISATScore;
  act: IACTScore;
  year: number;
  unitId: number;
}

interface ISATScore {
  submitted: number;
  percentSubmitted: number;
  readingWriting: {
    percentile25: number;
    percentile75: number;
  };
  math: {
    percentile25: number;
    percentile75: number;
  };
}

interface IACTScore {
  submitted: number;
  percentSubmitted: number;
  composite: {
    percentile25: number;
    percentile75: number;
  };
  english: {
    percentile25: number;
    percentile75: number;
  };
  math: {
    percentile25: number;
    percentile75: number;
  };
}
