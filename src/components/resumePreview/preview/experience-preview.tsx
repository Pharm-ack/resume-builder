"use client";
import React from "react";
import { useResumeInfo } from "@/contexts/resume-info";
import { formatDate } from "@/lib/utils";

export default function ExperiencePreview() {
  const { resumeInfo } = useResumeInfo();

  return (
    <div className="my-6">
      <h2 className="mb-2 text-xl font-bold">Professional Experience</h2>
      <hr className="mb-2 border-t-2 border-red-600" />

      {(resumeInfo?.experience || []).map((experience, index) => {
        const startDate = formatDate(experience?.startDate);
        const endDate = experience?.endDate
          ? formatDate(experience.endDate)
          : "Present";

        return (
          <div key={index} className="my-5">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-bold">{experience?.title}</h3>
              <span className="text-sm">
                {startDate} to {endDate}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-sm italic">
              <span>{experience?.companyName}</span>
              <span>
                {experience?.city}, {experience?.state}
              </span>
            </div>

            <div
              className="mt-2 pl-5 text-sm"
              dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
            />
          </div>
        );
      })}
    </div>
  );
}
