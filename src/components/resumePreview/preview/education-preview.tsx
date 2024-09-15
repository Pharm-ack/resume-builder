"use client";

import { useResumeInfo } from "@/contexts/resume-info";

export default function EducationPreview() {
  const { resumeInfo } = useResumeInfo();
  return (
    <div className="my-6">
      <h2 className="mb-2 text-xl font-bold">Education</h2>
      <hr className="mb-2 border-t-2 border-red-600" />

      {(resumeInfo?.education || []).map((education, index) => (
        <div key={index} className="my-5">
          {/* Institution Name */}
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-bold">{education?.institution}</h3>
            <span className="text-sm">
              {education?.startDate} to {education?.endDate}
            </span>
          </div>

          {/* Degree and Major */}
          <div className="flex items-baseline justify-between text-sm italic">
            <span>
              {education?.degree} in {education?.major}
            </span>
          </div>

          {/* Description */}
          {education?.description && (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {education.description.split("\n").map((item, idx) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: item.trim() }}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
