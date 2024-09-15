"use client";
import { updateResume } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Education, Skills, useResumeInfo } from "@/contexts/resume-info";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type educationProps = {
  enabaledNext: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Education({ enabaledNext }: educationProps) {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [educationalList, setEducationalList] = useState<Education[]>(() => {
    if (resumeInfo && resumeInfo.education) {
      return resumeInfo.education;
    }
    return [];
  });
  const params = useParams();

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        id: "",
        institution: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const resumeId = params.resumeId as string;
  const updateResumeMutation = useMutation({
    mutationFn: async () => {
      if (!resumeInfo) throw new Error("Resume info is null");
      const result = await updateResume({
        ...resumeInfo,
        education: educationalList,
        skills: resumeInfo.skills,
        id: resumeId,
      });
      if (!result.success) {
        throw new Error(result.error || "Failed to update resume");
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Resume updated successfully");
      enabaledNext(true);
    },
    onError: (error: Error) => {
      console.error("Failed to update resume:", error);
      toast.error(`Failed to update resume: ${error.message}`);
    },
  });

  const onSave = async () => {
    if (!resumeInfo) {
      toast.error("Resume info is not available");
      return;
    }
    updateResumeMutation.mutate();
  };

  useEffect(() => {
    setResumeInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: educationalList,
      };
    });
  }, [educationalList, setResumeInfo]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    enabaledNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index] = { ...newEntries[index], [name]: value };
    setEducationalList(newEntries);
  };

  return (
    <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
      <h2 className="text-lg font-bold">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
              <div className="col-span-2">
                <label>Institution</label>
                <Input
                  name="institution"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.institution}
                  value={item?.institution}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.degree}
                  value={item?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.major}
                  value={item?.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                  value={item?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  value={item?.endDate}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.description}
                  value={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            {" "}
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            {" "}
            - Remove
          </Button>
        </div>
        <Button
          disabled={updateResumeMutation.isPending}
          onClick={() => onSave()}
        >
          {updateResumeMutation.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}
