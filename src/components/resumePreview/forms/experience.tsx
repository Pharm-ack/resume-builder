"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type Experience,
  Resume,
  Skills,
  useResumeInfo,
} from "@/contexts/resume-info";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RichTextEditor from "@/components/rich-text-editor";
import { toast } from "sonner";
import { updateResume } from "@/actions/actions";
import { useMutation } from "@tanstack/react-query";

type experienceProps = {
  enabaledNext: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Experience({ enabaledNext }: experienceProps) {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [experienceList, setExperienceList] = useState<Experience[]>(() => {
    if (resumeInfo?.experience) {
      return resumeInfo.experience;
    }
    return [];
  });
  const params = useParams();

  useEffect(() => {
    setResumeInfo((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        experience: experienceList,
      };
    });
  }, [experienceList, setResumeInfo]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index] = { ...newEntries[index], [name]: value };
    setExperienceList(newEntries);
  };

  const resumeId = params.resumeId as string;
  const updateResumeMutation = useMutation({
    mutationFn: async () => {
      if (!resumeInfo) throw new Error("Resume info is null");
      const result = await updateResume({
        ...resumeInfo,
        experience: experienceList,
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
    updateResumeMutation.mutate();
  };

  const RemoveExperience = () => {
    setExperienceList((prevList) => prevList.slice(0, -1));
  };

  const AddNewExperience = () => {
    setExperienceList((prevList) => [
      ...prevList,
      {
        id: "",
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const handleRichTextEditor = (index: number, value: string) => {
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], workSummary: value };
      return newList;
    });
  };

  useEffect(() => {
    setResumeInfo((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        experience: experienceList,
      } as Resume;
    });
  }, [experienceList, setResumeInfo]);

  return (
    <>
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        <h2 className="text-lg font-bold">Professional Experience</h2>
        <p>Add your job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="my-5 grid grid-cols-2 gap-3 rounded-lg border p-3">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummary}
                    onRichTextEditorChange={handleRichTextEditor}
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
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
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
    </>
  );
}
