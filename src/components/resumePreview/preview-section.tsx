"use client";
import PersonalDetailsPreview from "./preview/personal-details-preview";
import SummaryPreview from "./preview/summary-preview";
import ExperiencePreview from "./preview/experience-preview";
import EducationPreview from "./preview/education-preview";
import SkillsPreview from "./preview/skills-preview";
import { useResumeInfo } from "@/contexts/resume-info";
import LoadingSpinner from "../loading-spinner";

export default function PreviewSection() {
  const { isLoading } = useResumeInfo();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="h-full p-8 shadow-lg">
      {/* Personal Details */}

      <PersonalDetailsPreview />

      {/* Professional Summary */}

      <SummaryPreview />

      {/* Skills */}

      <SkillsPreview />

      {/* Educational Details */}

      <EducationPreview />

      {/* Professional Experience */}

      <ExperiencePreview />

      {/* Additional Information */}
    </div>
  );
}
