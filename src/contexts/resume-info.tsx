"use client";
import { fetchAllResumeData } from "@/actions/actions";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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
  userId: string;
  title: string;
  userEmail: string;
  userName: string;
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
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
};

type ResumeInfoContextType = {
  resumeInfo: Resume | null;
  setResumeInfo: React.Dispatch<React.SetStateAction<Resume | null>>;
  isLoading: boolean;
};

const ResumeInfoContext = createContext<ResumeInfoContextType | undefined>(
  undefined,
);

export default function ResumeInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resumeInfo, setResumeInfo] = useState<Resume | null>(() => {
    // Initialize with all required properties
    return {
      id: "",
      userId: "",
      title: "",
      userEmail: "",
      userName: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
      themeColor: "",
      summary: "",
      experience: [],
      education: [],
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const resumeId = params.resumeId as string;

  useEffect(() => {
    const loadResumeData = async () => {
      setIsLoading(true);
      try {
        const resume = await fetchAllResumeData(resumeId);
        console.log("Raw resume data:", resume);

        if (resume) {
          const parsedResume: Resume = {
            ...resume,
            experience: Array.isArray(resume.experience)
              ? resume.experience.map((exp) => {
                  try {
                    return typeof exp === "string" ? JSON.parse(exp) : exp;
                  } catch (e) {
                    console.error("Error parsing experience:", e);
                    return exp;
                  }
                })
              : [],
            education: Array.isArray(resume.education)
              ? resume.education.map((edu) => {
                  try {
                    return typeof edu === "string" ? JSON.parse(edu) : edu;
                  } catch (e) {
                    console.error("Error parsing education:", e);
                    return edu;
                  }
                })
              : [],
            skills: Array.isArray(resume.skills) ? resume.skills : [],
          };
          console.log("Parsed resume:", parsedResume);
          setResumeInfo(parsedResume);
        } else {
          console.log("No resume data received");
          setResumeInfo(null);
        }
      } catch (error) {
        console.error("Failed to load resume:", error);
        setResumeInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (resumeId) {
      loadResumeData();
    }
  }, [resumeId]);

  return (
    <ResumeInfoContext.Provider
      value={{ isLoading, resumeInfo, setResumeInfo }}
    >
      {children}
    </ResumeInfoContext.Provider>
  );
}

export const useResumeInfo = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error("useResumeInfo must be used within a ResumeInfoProvider");
  }
  return context;
};
