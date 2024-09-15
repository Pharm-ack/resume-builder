"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo, type Skills } from "@/contexts/resume-info";
import { updateResume } from "@/actions/actions";

type SkillsProps = {
  enabaledNext: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Skills({ enabaledNext }: SkillsProps) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [skillsList, setSkillsList] = useState<Skills[]>(
    () =>
      resumeInfo?.skills?.map((skill) => ({
        id: `${Date.now()}-${skill}`,
        name: skill,
      })) || [],
  );

  const resumeId = params.resumeId as string;

  const updateResumeMutation = useMutation({
    mutationFn: async () => {
      const skillsNames = skillsList.map((skill) => skill.name);
      const result = await updateResume({
        ...(resumeInfo || {}),
        skills: skillsNames,
        id: resumeId,
      });
      if (!result.success) {
        throw new Error(result.error || "Failed to update resume");
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Resume updated successfully");
      enabaledNext(true);
    },
    onError: (error: Error) => {
      console.error("Failed to update resume:", error);
      toast.error(`Failed to update resume: ${error.message}`);
    },
  });

  const handleChange = useCallback((index: number, value: string) => {
    setSkillsList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], name: value };
      return newList;
    });
  }, []);

  const addSkill = useCallback(() => {
    setSkillsList((prev) => [...prev, { id: `${Date.now()}`, name: "" }]);
  }, []);

  const removeSkill = useCallback((index: number) => {
    setSkillsList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (resumeInfo) {
      setResumeInfo((prev) =>
        prev
          ? { ...prev, skills: skillsList.map((skill) => skill.name) }
          : null,
      );
    }
  }, [skillsList, setResumeInfo, resumeInfo]);

  const onSave = () => {
    updateResumeMutation.mutate();
  };

  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="mb-5">Add your top professional key skills</p>

      <div className="space-y-2">
        {skillsList.map((skill, index) => (
          <div key={skill.id} className="flex items-center space-x-2">
            <Input
              value={skill.name}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Enter a skill"
              className="flex-grow"
            />
            <Button size="icon" onClick={() => removeSkill(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button className="mt-4" variant="outline" onClick={addSkill}>
          <Plus className="mr-2 h-4 w-4" /> Add Skill
        </Button>
        <div className="pt-4">
          <Button onClick={onSave} disabled={updateResumeMutation.isPending}>
            {updateResumeMutation.isPending ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
