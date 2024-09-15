export type Resume = {
  id: string;
  userId: string;
  title: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
};

type Experience = {
  id: number;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  currentlyWorking: boolean;
  workSummery: string;
};

type Education = {
  id: number;
  major: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Skills = {
  id: number;
  name: string;
  rating: number;
};

export type Resumes = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills[];
};
