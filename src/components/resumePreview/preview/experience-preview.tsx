"use client";
import React from "react";
import { useResumeInfo } from "@/contexts/resume-info";

export default function ExperiencePreview() {
  const { resumeInfo } = useResumeInfo();

  return (
    <div className="my-6">
      <h2 className="mb-2 text-xl font-bold">Professional Experience</h2>
      <hr className="mb-2 border-t-2 border-red-600" />

      {(resumeInfo?.experience || []).map((experience, index) => (
        <div key={index} className="my-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-bold">{experience?.title}</h3>
            <span className="text-sm">
              {experience?.startDate} to {experience.endDate}
            </span>
          </div>
          <div className="flex items-baseline justify-between text-sm italic">
            <span>{experience?.companyName}</span>
            <span>
              {experience?.city}, {experience?.state}
            </span>
          </div>

          <ul className="mt-2 list-disc pl-5 text-sm">
            {experience?.workSummary
              .split("\n")
              .map((item, idx) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: item.trim() }}
                />
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
