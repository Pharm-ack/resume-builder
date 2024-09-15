"use client";
import React from "react";
import { useResumeInfo } from "@/contexts/resume-info";

type Skill = string | { id?: string; name: string };

export default function SkillsPreview() {
  const { resumeInfo } = useResumeInfo();

  if (!resumeInfo?.skills || resumeInfo.skills.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h2 className="mb-2 text-xl font-bold">Skills</h2>
      <hr className="mb-2 border-t-2 border-red-600" />

      <div className="my-4 grid grid-cols-2 gap-3">
        {resumeInfo.skills.map((skill: Skill, index) => {
          const skillName = typeof skill === "string" ? skill : skill.name;
          const skillId = typeof skill === "string" ? index : skill.id || index;

          return (
            <ul
              key={skillId}
              className="flex list-inside list-disc items-center justify-between"
              style={{ listStyleType: "disc" }}
            >
              <li className="text-sm leading-4">{skillName}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
