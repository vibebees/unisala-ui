interface Introduction {
  id: string;
  name: string;
  description: string;
  type: string;
  options: null;
  api: boolean;
  placeholder: string;
}

interface IUserStatus {
  id: string;
  name: string;
  type: string;
  options: string[];
  api: boolean;
  placeholder: string;
}

interface InterestedSubjects {
  id: string;
  name: string;
  type: string;
  options: string[];
  api: boolean;
  placeholder: string;
}

interface IStudyLevel {
  id: string;
  name: string;
  type: string;
  options: string[];
  api: boolean;
  placeholder: string;
}

interface IWelcomeData {
  introduction: Introduction;
  userStatus: IUserStatus;
  interestedSubjects: InterestedSubjects;
  studyLevel: IStudyLevel;
}

 
interface IWelcomeMetaTagApiResponse {
  success: boolean;
  data: IWelcomeData;
}
