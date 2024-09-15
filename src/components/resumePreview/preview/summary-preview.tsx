"use client";
import React from "react";
import { useResumeInfo } from "@/contexts/resume-info";

export default function SummaryPreview() {
  const { resumeInfo } = useResumeInfo();

  return (
    <div className="my-6">
      <h2 className="mb-2 text-xl font-bold">Professional Summary</h2>
      <hr className="mb-2 border-t-2 border-red-600" />
      <p className="text-sm">{resumeInfo?.summary}</p>
    </div>
  );
}
