"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeInfo } from "@/contexts/resume-info";
import { updateResume } from "@/actions/actions";
import { AIChatSession } from "@/lib/ai-model";

type SummaryProps = {
  enabaledNext: React.Dispatch<React.SetStateAction<boolean>>;
};

type SummaryDetails = {
  summary: string;
  experience_level: string;
};

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";

export default function Summary({ enabaledNext }: SummaryProps) {
  const { resumeInfo, setResumeInfo } = useResumeInfo();
  const [summary, setSummary] = useState<string>(resumeInfo?.summary || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState<
    SummaryDetails[] | null
  >(null);
  const params = useParams();

  const resumeId = params.resumeId as string;

  const updateResumeMutation = useMutation({
    mutationFn: async () => {
      if (!resumeInfo) throw new Error("Resume info is null");
      return await updateResume({
        ...resumeInfo,
        summary,
        id: resumeId,
        // skills: resumeInfo.skills.map((skill) => typeof skill === 'string' ? skill : skill.name),
      });
    },
    onSuccess: () => {
      toast.success("Resume updated successfully");
      enabaledNext(true);
    },
    onError: (error) => {
      console.error("Failed to update resume:", error);
      toast.error("Failed to update resume");
    },
  });

  useEffect(() => {
    setSummary(resumeInfo?.summary || "");
  }, [resumeInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    enabaledNext(false);
    setSummary(e.target.value);
    setResumeInfo((prev) =>
      prev
        ? {
            ...prev,
            summary: e.target.value,
          }
        : null,
    );
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateResumeMutation.mutate();
  };

  const generateSummaryFromAI = async () => {
    setIsGenerating(true);
    try {
      if (!resumeInfo?.jobTitle) throw new Error("Job title is missing");
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
      console.log("Sending prompt:", PROMPT);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);
      setAiGeneratedSummaryList(JSON.parse(responseText));
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg">
        <h2 className="text-lg font-bold">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex items-end justify-between">
            <label>Add Summary</label>
            <Button
              onClick={generateSummaryFromAI}
              variant="outline"
              type="button"
              size="sm"
              className="flex gap-2 border-primary text-primary"
              disabled={isGenerating}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            rows={4}
            className="mt-5"
            required
            value={summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              disabled={updateResumeMutation.isPending || isGenerating}
            >
              {isGenerating || updateResumeMutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList?.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setSummary(item.summary);
            setResumeInfo((prev) =>
              prev
                ? {
                    ...prev,
                    summary: item.summary,
                  }
                : null,
            );
            enabaledNext(false);
          }}
          className="my-4 cursor-pointer rounded-lg p-5 shadow-lg"
        >
          <h2 className="my-1 font-bold text-primary">
            Level: {item.experience_level}
          </h2>
          <p>{item.summary}</p>
        </div>
      ))}
    </>
  );
}
