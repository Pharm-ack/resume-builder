"use client";
import React from "react";
import { useResumeInfo } from "@/contexts/resume-info";

export default function PersonalDetailsPreview() {
  const { resumeInfo } = useResumeInfo();

  return (
    <div className="">
      <h1 className="mb-4 text-4xl font-bold">
        <span className="text-black">{resumeInfo?.firstName} </span>{" "}
        <span className="text-red-600">{resumeInfo?.lastName}</span>
      </h1>
      <div className="personal-details bg-black p-2 text-sm text-white">
        <span>{resumeInfo?.address}</span>
        <span className="mx-2">|</span>
        <span>{resumeInfo?.phone}</span>
        <span className="mx-2">|</span>
        <span>{resumeInfo?.email}</span>
      </div>
    </div>
  );
}
