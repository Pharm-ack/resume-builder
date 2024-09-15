import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Experience = {
  id: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  workSummary: string;
};

export type Education = {
  id: string;
  major: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Skills = {
  id: string;
  name: string;
};

export type Resume = {
  id: string;
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

type ResumeStore = {
  resume: Resume;
  updateResume: (data: Partial<Resume>) => void;
  updateExperience: (experiences: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: Skills[]) => void;
};

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: {
        id: "",
        firstName: "",
        lastName: "",
        jobTitle: "",
        address: "",
        phone: "",
        email: "",
        themeColor: "#000000",
        summary: "",
        experience: [],
        education: [],
        skills: [],
      },
      updateResume: (data) =>
        set((state) => ({ resume: { ...state.resume, ...data } })),
      updateExperience: (experiences) =>
        set((state) => ({
          resume: { ...state.resume, experience: experiences },
        })),
      updateEducation: (education) =>
        set((state) => ({ resume: { ...state.resume, education: education } })),
      updateSkills: (skills) =>
        set((state) => ({ resume: { ...state.resume, skills: skills } })),
    }),
    {
      name: "resume-storage",
    },
  ),
);

export default useResumeStore;
