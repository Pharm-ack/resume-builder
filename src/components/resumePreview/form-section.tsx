"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Home, Palette } from "lucide-react";
import PersonalDetails from "./forms/personal-details";
import Summary from "./forms/summary";
import Skills from "./forms/skills";
import Education from "./forms/education";
import Experience from "./forms/experience";

export default function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enabledNext, setEnabledNext] = useState(false);
  const router = useRouter();
  const params = useParams();
  const resumeId = params.resumeId as string;

  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push(`/dashboard/resume/${resumeId}/view`);
    }
  }, [activeFormIndex, resumeId, router]);

  const handleNext = () => {
    if (activeFormIndex < 6) {
      setActiveFormIndex((prev) => prev + 1);
      setEnabledNext(false);
    }
  };

  const renderForm = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetails enabaledNext={setEnabledNext} />;
      case 2:
        return <Summary enabaledNext={setEnabledNext} />;
      case 3:
        return <Skills enabaledNext={setEnabledNext} />;
      case 4:
        return <Education enabaledNext={setEnabledNext} />;
      case 5:
        return <Experience enabaledNext={setEnabledNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="icon">
              <Palette className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {activeFormIndex > 1 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setActiveFormIndex((prev) => prev - 1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <Button disabled={!enabledNext} onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      <main className="flex-grow p-4">{renderForm()}</main>
    </div>
  );
}
