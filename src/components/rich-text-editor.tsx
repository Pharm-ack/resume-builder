"use client";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  Separator,
  ContentEditableEvent,
} from "react-simple-wysiwyg";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useResumeInfo } from "@/contexts/resume-info";
import { AIChatSession } from "@/lib/ai-model";

type RichTextEditorProps = {
  index: number;
  defaultValue: string;
  onRichTextEditorChange: (index: number, value: string) => void;
};

const prompt =
  "position title: {positionTitle}, Depends on this position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags with <ul> and <li> tags.";
export default function RichTextEditor({
  index,
  defaultValue,
  onRichTextEditorChange,
}: RichTextEditorProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const [isGenerating, setIsGenerating] = useState(false);
  const { resumeInfo } = useResumeInfo();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: ContentEditableEvent) => {
    const newValue = event.target.value;
    setValue(newValue);
    onRichTextEditorChange(index, newValue);
  };

  const GenerateSummaryFromAI = async () => {
    setIsGenerating(true);
    try {
      if (!resumeInfo?.experience[index]?.title) {
        toast("Please Add Position Title");
        return;
      }

      const PROMPT = prompt.replace(
        "{positionTitle}",
        resumeInfo?.experience[index]?.title,
      );
      console.log("Sending prompt:", PROMPT);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);

      // Clean up unwanted parts and formatting
      const formattedResponse = responseText
        .replace(/^{\s*"positionTitle":\s*".*experience":\s*\[("|)?/, "")
        .replace(/"\]}\s*$/, "")
        .replace(/",\s*"/g, "\n\n")
        .trim();

      setValue(formattedResponse);
      // Call onRichTextEditorChange to update the parent component
      onRichTextEditorChange(index, formattedResponse);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="my-2 flex justify-between">
        <label className="text-xs">Summary</label>
        <Button
          onClick={GenerateSummaryFromAI}
          variant="outline"
          type="button"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor value={value} onChange={handleChange}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </>
  );
}
